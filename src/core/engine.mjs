import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { formatQuestions } from './wechat.mjs'
import { safeTextCut } from './format.mjs'
import { cronMatches, minuteKey } from './scheduler.mjs'
import { PROMPT_FILES, ensurePromptFiles, renderPrompt, readPromptFile, writePromptFile, resetPromptFile, editablePromptDir } from './prompt.mjs'
import {
  MemoryStreamFilter,
  applyMemoryOperations,
  ensureMemoryFile,
  memoryFile as memoryFilePath,
  parseMemoryResponse,
  readMemoryFile,
  resetMemoryFile,
  writeMemoryFile,
} from './memory.mjs'
import { localDateKey } from './store.mjs'
import { classifyModelFailure } from './model-failure.mjs'

const QWEN_PROVIDER = 'vllm'
const QWEN_MODEL = 'qwen38-flash-fp8'
const FLASH_PROVIDER = 'deepseek-official'
const FLASH_MODEL = 'deepseek-v4-flash'
const SESSION_VERSION = 3
const CONTROL_START = '<dsh-message-control>'
const CONTROL_END = '</dsh-message-control>'
const CONTROL_PAYLOAD = JSON.stringify({ version: 1, action: 'retry_with_deep_reasoning' })
const DEEP_RETRY_PROMPT = '[内部路由控制：复杂度判断已完成。请直接执行上一条用户任务，不要再次进行复杂度判断，不要输出 dsh-message-control 控制块。]'
const ROUTER_PROMPT = `

[内部复杂度路由规则]
先判断上一条用户任务是否需要深度思考：
- 如果不需要，直接正常回答或执行任务。
- 如果需要，且当前尚未调用工具、发送外部请求或产生任何副作用，只输出下面完整控制块，不要输出解释、答案或 Markdown 围栏：
${CONTROL_START}
${CONTROL_PAYLOAD}
${CONTROL_END}
深度执行会由系统切换到对应的深度推理档位后重新进行。`

export function parseDeepReasoningControl(value) {
  const text = String(value ?? '').trim()
  if (!text.startsWith(CONTROL_START) || !text.endsWith(CONTROL_END)) return false
  const payload = text.slice(CONTROL_START.length, -CONTROL_END.length).trim()
  if (payload.length > 256) return false
  try {
    const parsed = JSON.parse(payload)
    const keys = Object.keys(parsed ?? {}).sort()
    return keys.length === 2
      && keys[0] === 'action' && keys[1] === 'version'
      && parsed.version === 1 && parsed.action === 'retry_with_deep_reasoning'
  } catch {
    return false
  }
}

function controlVisibleSnapshot(value) {
  const text = String(value ?? '')
  const trimmed = text.trimStart()
  if (trimmed.startsWith(CONTROL_START)) {
    if (parseDeepReasoningControl(trimmed)) return ''
    const end = trimmed.indexOf(CONTROL_END)
    if (end < 0) return ''
  }
  const index = text.indexOf(CONTROL_START)
  return index >= 0 ? text.slice(0, index) : text
}

function hashText(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex')
}

function stringList(value) {
  if (Array.isArray(value)) return value.map(String).map(item => item.trim()).filter(Boolean)
  return String(value || '').split(/[\s,;\n]+/).map(item => item.trim()).filter(Boolean)
}

function bool(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback
  if (typeof value === 'string') return !['0', 'false', 'off', 'no'].includes(value.toLowerCase())
  return Boolean(value)
}

function sessionIdFrom(value) {
  return value?.sessionId || value?.session?.sessionId || value?.session?.id || value?.id
}

function within(root, candidate) {
  const relative = path.relative(root, candidate)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

/**
 * Extract the consumable text from one inbound iLink message.
 * Mirrors the official openclaw-weixin semantics: the first consumable item
 * wins — a text item (type 1) with quoted context, then voice transcription
 * (type 3, voice_item.text). Item types are compared numerically so string
 * serialized enums are tolerated.
 */
export function extractMessageText(msg) {
  for (const item of msg?.item_list || []) {
    const type = Number(item?.type)
    if (type === 1 && item?.text_item?.text) {
      const text = String(item.text_item.text)
      const ref = item.ref_msg
      if (!ref) return text
      const refItem = ref.message_item
      const refIsText = refItem && Number(refItem.type) === 1 && refItem.text_item?.text
      const parts = []
      if (ref.title) parts.push(String(ref.title))
      if (refIsText) parts.push(String(refItem.text_item.text))
      if (!parts.length) return text
      return `[引用: ${parts.join(' | ')}]\n${text}`
    }
    if (type === 3 && item?.voice_item?.text) return String(item.voice_item.text)
  }
  return ''
}

export function normalizeConfig(config = {}) {
  return {
    enabled: bool(config.enabled, true),
    streaming: bool(config.streaming, true),
    typing: bool(config.typing, true),
    mediaEnabled: bool(config.mediaEnabled, true),
    renewalEnabled: bool(config.renewalEnabled, true),
    accessPolicy: ['pairing', 'allowlist', 'disabled'].includes(config.accessPolicy) ? config.accessPolicy : 'pairing',
    allowlist: stringList(config.allowlist),
    slowAckMs: Number(config.slowAckMs ?? 4000),
    turnTimeoutMs: Number(config.turnTimeoutMs ?? 15 * 60 * 1000),
    // streamFlushChars = 单气泡长度上限；streamFlushMs = 空闲超时（无新内容自动发）
    streamFlushChars: Math.max(200, Number(config.streamFlushChars ?? 800)),
    streamFlushMs: Math.max(500, Number(config.streamFlushMs ?? 30000)),
    maintenanceIntervalMs: Math.max(10_000, Number(config.maintenanceIntervalMs ?? 60_000)),
    complexAckText: String(config.complexAckText || '好的，我先思考一下，稍后给你结果。'),
    // 模型路由固定为 Qwen 主通道，Flash 只作为服务故障兜底。
    fastModel: qwenModel('off'),
    complexModel: qwenModel('xhigh'),
    fallbackFastModel: flashModel('off'),
    fallbackComplexModel: flashModel('max'),
    outboxDir: path.resolve(config.outboxDir || path.join(config.sessionCwd || process.cwd(), 'outbox')),
    jobs: Array.isArray(config.jobs) ? config.jobs : [],
  }
}

function flashModel(reasoningEffort) {
  return {
    provider: FLASH_PROVIDER,
    model: FLASH_MODEL,
    reasoningEffort,
  }
}

function qwenModel(reasoningEffort) {
  return {
    provider: QWEN_PROVIDER,
    model: QWEN_MODEL,
    reasoningEffort,
  }
}

export function modelConfig(_env = process.env) {
  const primaryFast = configuredModel(_env,
    'DSH_MESSAGE_FAST_MODEL_PROVIDER', 'DSH_MESSAGE_FAST_MODEL', 'DSH_MESSAGE_FAST_REASONING',
    qwenModel('off'))
  const primaryDeep = configuredModel(_env,
    'DSH_MESSAGE_COMPLEX_MODEL_PROVIDER', 'DSH_MESSAGE_COMPLEX_MODEL', 'DSH_MESSAGE_COMPLEX_REASONING',
    qwenModel('xhigh'))
  const fallbackFast = configuredModel(_env,
    'DSH_MESSAGE_FALLBACK_MODEL_PROVIDER', 'DSH_MESSAGE_FALLBACK_MODEL', 'DSH_MESSAGE_FALLBACK_FAST_REASONING',
    flashModel('off'))
  const fallbackDeep = configuredModel(_env,
    'DSH_MESSAGE_FALLBACK_MODEL_PROVIDER', 'DSH_MESSAGE_FALLBACK_MODEL', 'DSH_MESSAGE_FALLBACK_COMPLEX_REASONING',
    flashModel('max'))
  if (String(_env.DSH_MESSAGE_PERMISSION_PRESET || '').trim()
    && String(_env.DSH_MESSAGE_PERMISSION_PRESET).trim() !== 'danger-full-access') {
    throw new Error('DSH_MESSAGE_PERMISSION_PRESET 必须为 danger-full-access')
  }
  return {
    fastModel: primaryFast,
    complexModel: primaryDeep,
    fallbackFastModel: fallbackFast,
    fallbackComplexModel: fallbackDeep,
    complexAckText: _env.WX_BOT_COMPLEX_ACK_TEXT || '好的，我先思考一下，稍后给你结果。',
  }
}

function configuredModel(env, providerKey, modelKey, reasoningKey, fallback) {
  const clean = value => value === undefined || value === null || String(value).trim() === ''
    ? '' : String(value).trim()
  const provider = clean(env?.[providerKey])
  const modelName = clean(env?.[modelKey])
  const reasoningEffort = clean(env?.[reasoningKey])
  if (!provider && !modelName && !reasoningEffort) return fallback
  const candidate = {
    provider: provider || fallback.provider,
    model: modelName || fallback.model,
    reasoningEffort: reasoningEffort || fallback.reasoningEffort,
  }
  if (candidate.provider !== fallback.provider
    || candidate.model !== fallback.model
    || candidate.reasoningEffort !== fallback.reasoningEffort) {
    throw new Error(`${providerKey} 等模型配置只能使用 ${fallback.provider}/${fallback.model}/${fallback.reasoningEffort}`)
  }
  return candidate
}

export function renewalRecipients(users, { accessPolicy = 'pairing', allowlist = [] } = {}) {
  if (accessPolicy === 'disabled') return []
  const allowed = new Set(allowlist || [])
  return Object.entries(users || {})
    .filter(([userId, record]) => Boolean(record?.lastContextToken)
      && (accessPolicy !== 'allowlist' || allowed.has(userId)))
    .map(([userId]) => userId)
}

/**
 * 流式回复 → 微信气泡的中继。
 * 主规则：LLM 输出双回车（空行）即视为一个气泡结束，立即发送（双回车不进文案）。
 * 兜底 1（flushChars）：单个气泡达到长度上限时，在最近的换行/标点处强制切分。
 * 兜底 2（flushMs）：收到内容后超过 flushMs 没有新内容，强制发出当前气泡，避免“没反应”。
 */
export class StreamRelay {
  constructor({ wechat, to, token, enabled, flushChars, flushMs, logger = null }) {
    this.wechat = wechat
    this.to = to
    this.token = token
    this.enabled = enabled
    this.flushChars = flushChars
    this.flushMs = flushMs
    this.logger = logger
    this.buffer = ''
    this.all = ''
    this.sent = false
    this.timer = null
    this.chain = Promise.resolve()
  }

  push(delta) {
    if (!this.enabled || !delta) return
    this.buffer += delta
    this.all += delta
    this.#splitOnBubbleBreak()
    if (!this.buffer) return
    // 长度上限只统计“当前这个气泡”从它开始到现在积累的字符数——每次切出一个
    // 气泡后 buffer 都会被重置为下一个气泡的开头，不会从整条回复的头部累计。
    if (this.buffer.length >= this.flushChars) this.flush(false)
    else this.#arm()
  }

  /**
   * 主规则：模型输出单独占一行的 `---`（前后各一个换行）即切出一个气泡；同时兼容旧的三个连续换行。
   * 单/双换行只是段落排版，不会触发切分。分隔符本身不会出现在微信文案里。
   * 反引号包裹里的 `---`（例如代码示例）只是普通文本，不会被当作切分信号。
   */
  #splitOnBubbleBreak() {
    const markers = ['\n---\n', '\n\n\n']
    while (true) {
      let index = -1
      let len = 0
      for (const marker of markers) {
        const at = marker === '\n---\n'
          ? this.#findBareMarker(this.buffer, '\n---\n')
          : this.buffer.indexOf(marker)
        if (at >= 0 && (index < 0 || at < index)) { index = at; len = marker.length }
      }
      if (index < 0) break
      const part = this.buffer.slice(0, index)
      this.buffer = this.buffer.slice(index + len)
      this.#sendPart(part)
    }
  }

  /** 找第一个「不在成对反引号内」的 marker；找不到返回 -1。 */
  #findBareMarker(text, marker) {
    let i = 0
    while ((i = text.indexOf(marker, i)) >= 0) {
      const before = text.slice(0, i)
      const backticks = (before.match(/`/g) || []).length
      if (backticks % 2 === 0) return i
      i += marker.length
    }
    return -1
  }

  flush(force) {
    clearTimeout(this.timer)
    this.timer = null
    if (!this.buffer) return
    if (!force && this.buffer.length < this.flushChars) return this.#arm()
    const count = force ? this.buffer.length : safeTextCut(this.buffer, this.flushChars)
    const part = this.buffer.slice(0, count)
    this.buffer = this.buffer.slice(count)
    this.#sendPart(part)
    if (this.buffer) this.#arm()
  }

  /** 发送一个气泡；异常的超长段（超过上限）再按上限切分。 */
  #sendPart(part) {
    const trimmed = part.trim()
    if (!trimmed) return
    if (trimmed.length <= this.flushChars) {
      this.#send(trimmed)
      return
    }
    let remaining = trimmed
    while (remaining) {
      const count = safeTextCut(remaining, this.flushChars)
      const piece = remaining.slice(0, count)
      remaining = remaining.slice(count)
      if (piece.trim()) this.#send(piece.trim())
    }
  }

  #send(part) {
    this.sent = true
    // 串行保持顺序；单条发送失败绝不外抛成 unhandled rejection（否则 Node 会直接
    // 让 DSH 进程退出），只记录并继续发送后续气泡。
    this.chain = this.chain
      .then(() => this.wechat.sendText(this.to, this.token, part))
      .catch(error => { this.logger?.warn?.('[relay] 消息发送失败:', error?.message ?? error) })
  }

  #arm() {
    if (!this.timer && this.buffer) this.timer = setTimeout(() => this.flush(true), this.flushMs)
  }

  async finish(finalText) {
    clearTimeout(this.timer)
    this.timer = null
    if (this.enabled) this.flush(true)
    try {
      await this.chain
    } catch (error) {
      this.logger?.warn?.('[relay] 收尾发送失败:', error?.message ?? error)
    }
    if (!this.sent) {
      try {
        await this.wechat.sendText(this.to, this.token, finalText || '（DSH 没有返回文本内容）')
      } catch (error) {
        this.logger?.warn?.('[relay] 兜底消息发送失败:', error?.message ?? error)
      }
    }
  }
}

export class Engine {
  constructor({ wechat, store, transport, config = {}, promptDir = null, defaultPromptDir = null, memoryFile = null, logger = null, now = () => new Date() }) {
    this.wechat = wechat
    this.store = store
    this.transport = transport
    this.logger = logger || {
      log: (...args) => console.log(...args),
      warn: (...args) => console.warn(...args),
      error: (...args) => console.error(...args),
    }
    this.baseConfig = { ...config }
    this.config = normalizeConfig({ ...config, ...store.loadSettings() })
    this.now = now
    // 可定制 prompt：可编辑副本位于频道数据目录，默认文件位于项目 src/prompt/
    this.promptDir = promptDir || editablePromptDir(store.dir)
    this.defaultPromptDir = defaultPromptDir || path.join(process.cwd(), 'src', 'prompt')
    ensurePromptFiles(this.defaultPromptDir, this.promptDir)
    this.memoryFile = memoryFile || memoryFilePath(store.dir)
    ensureMemoryFile(this.defaultPromptDir, this.memoryFile)
    this.userBySession = new Map()
    this.activeTurns = new Map()
    this.sessionLocks = new Map()
    this.started = false
    this.maintenanceTimer = null
    this.jobRuns = new Map()
    this.fallbackUntil = 0
    this.fallbackProbeEligible = false
    this.fallbackProbeInFlight = false
  }

  start() {
    if (this.started) return
    this.store.acquireLock()
    this.started = true
    this.transport.onQuestion = (rpcId, sessionId, questions) => this.#forwardQuestion(rpcId, sessionId, questions)
    this.transport.onSlow = sessionId => this.#slowAck(sessionId)
    this.transport.onStall = value => this.logger.warn('[engine] DSH 通道告警:', value)
    this.transport.start()
    this.maintenanceTimer = setInterval(() => void this.#maintenance(), this.config.maintenanceIntervalMs)
    this.maintenanceTimer.unref?.()
    void this.#startWechat()
  }

  async #startWechat() {
    try {
      await this.wechat.ensureLogin()
      this.logger.log('[engine] 微信通道已启动，正在接收消息')
      await this.wechat.startPolling(message => this.handleWechatMessage(message))
    } catch (error) {
      this.store.appendError('wechat.start', error)
      this.logger.error('[engine] 微信通道启动失败:', error.message)
    }
  }

  stop() {
    if (!this.started) return
    this.started = false
    clearInterval(this.maintenanceTimer)
    this.maintenanceTimer = null
    this.wechat.stop()
    this.transport.stop()
    this.sessionLocks.clear()
    this.store.releaseLock()
  }

  getSettings() { return { ...this.config } }

  updateSettings(patch) {
    const allowed = [
      'enabled', 'streaming', 'typing', 'mediaEnabled', 'renewalEnabled', 'accessPolicy',
      'allowlist', 'slowAckMs', 'turnTimeoutMs', 'streamFlushChars', 'streamFlushMs',
      'complexAckText', 'outboxDir', 'jobs',
    ]
    const clean = Object.fromEntries(Object.entries(patch || {}).filter(([key]) => allowed.includes(key)))
    const stored = this.store.updateSettings(clean)
    this.config = normalizeConfig({ ...this.baseConfig, ...stored })
    return this.getSettings()
  }

  status() {
    return {
      started: this.started,
      wechat: this.wechat.status(),
      settings: this.getSettings(),
      users: Object.keys(this.store.loadUsers()).length,
      recentErrors: this.store.readErrors(10),
    }
  }

  async handleWechatMessage(msg) {
    if (msg?.message_type !== 1 || msg?.group_id || !msg?.from_user_id) return
    const userKey = String(msg.from_user_id)
    const contextToken = msg.context_token || ''
    await this.wechat.rememberContext(userKey, contextToken)
    if (!this.#allowed(userKey)) {
      if (this.config.accessPolicy !== 'disabled') {
        await this.wechat.sendText(userKey, contextToken, '该微信账号尚未获得 dsh-message 访问权限。')
      }
      return
    }

    const itemTypes = (msg.item_list || []).map(item => item?.type ?? '?').join(',') || 'none'
    let text = extractMessageText(msg).trim()
    this.logger.log(`[engine] 收到 ${userKey} 消息（item: ${itemTypes}${msg.message_state != null ? `，state: ${msg.message_state}` : ''}）${text ? `: ${text.slice(0, 80)}` : '（无文本）'}`)
    let media = []
    if (this.config.mediaEnabled) media = await this.wechat.downloadMedia(msg, userKey)
    if (media.length) {
      const attachmentText = media.map(item => `- ${item.kind}: ${item.savedPath} (${item.size} bytes)`).join('\n')
      text = `${text}${text ? '\n\n' : ''}用户从微信发来了以下附件，请根据需要读取和处理：\n${attachmentText}`
    }
    if (!text) {
      this.logger.warn(`[engine] ${userKey} 的消息无法提取文本（item 类型: ${itemTypes}，message_state: ${msg.message_state ?? '?'}）`)
      await this.wechat.sendText(userKey, contextToken, this.config.mediaEnabled
        ? '暂时无法识别这条消息。'
        : '当前已关闭媒体接收，请发送文字。')
      return
    }

    try {
      const record = await this.#ensureUser(userKey, contextToken)
      this.logger.log(`[engine] ${userKey} -> 会话 ${record.sessionId}`)
      if (text.startsWith('/')) {
        await this.#command(userKey, contextToken, record, text)
        return
      }
      await this.#runTurn(userKey, contextToken, record, text)
    } catch (error) {
      this.store.appendError('message', error, { userKey })
      this.logger.error('[engine] 消息处理失败:', error.message)
      await this.wechat.setTyping(userKey, contextToken, false)
      await this.wechat.sendText(userKey, contextToken, `处理失败：${error.message}`).catch(() => {})
    }
  }

  async #ensureUser(userKey, contextToken) {
    const previous = this.sessionLocks.get(userKey) || Promise.resolve()
    const current = previous.catch(() => {}).then(() => this.#ensureUserOnce(userKey, contextToken))
    this.sessionLocks.set(userKey, current)
    try {
      return await current
    } finally {
      if (this.sessionLocks.get(userKey) === current) this.sessionLocks.delete(userKey)
    }
  }

  async #ensureUserOnce(userKey, contextToken) {
    const saved = this.store.getUser(userKey)
    const now = this.now()
    const dateKey = localDateKey(now)
    const promptText = renderPrompt(this.promptDir, { date: now, memoryFile: this.memoryFile })
    // 自动记忆是动态数据，不应让正在进行的 DSH 会话因文件变化而轮换。
    const promptHash = hashText(renderPrompt(this.promptDir, { date: now, memoryFile: this.memoryFile, includeMemory: false }))
    const rotate = !saved?.sessionId
      || saved.sessionVersion !== SESSION_VERSION
      || saved.sessionDate !== dateKey
      || !saved.historyKey
      || saved.promptHash !== promptHash
    const created = await this.transport.ensureSession(userKey, rotate
      ? { fresh: true }
      : { sessionId: saved.sessionId })
    const sessionId = sessionIdFrom(created) || saved?.sessionId
    if (!sessionId) throw new Error('DSH 未返回会话 ID')
    const historyKey = rotate ? `${dateKey}-${crypto.randomUUID()}` : saved.historyKey
    const record = this.store.touchUser(userKey, sessionId, contextToken, {
      sessionVersion: SESSION_VERSION,
      sessionDate: dateKey,
      historyKey,
      promptHash,
      promptInjected: rotate ? false : saved.promptInjected === true,
    })
    // Keep the full prompt snapshot for this turn in memory only. Static files
    // are hashed above; dynamic memory takes effect when a new session starts.
    record.promptText = rotate || record.promptInjected !== true ? promptText : ''
    this.userBySession.set(sessionId, { from: userKey, token: contextToken })
    return record
  }

  async #runTurn(userKey, contextToken, record, text) {
    const sessionId = record.sessionId
    const pending = this.transport.pendingQuestion(sessionId)
    if (pending) {
      this.store.appendHistory(userKey, 'user', text, { historyKey: record.historyKey })
      await this.transport.answerQuestion(pending.rpcId, sessionId, text)
      await this.wechat.sendText(userKey, contextToken, '已收到你的回答，继续处理中。')
      return
    }

    // 打断：新消息取消上一轮仍在进行的 turn，并用版本号让旧轮静默退出，不再发送回复。
    const prev = this.activeTurns.get(userKey)
    if (prev) await this.transport.cancel(prev.sessionId).catch(() => {})
    const gen = (prev?.gen ?? 0) + 1
    this.activeTurns.set(userKey, { sessionId, gen })

    this.store.appendHistory(userKey, 'user', text, { historyKey: record.historyKey })
    const willInjectPrompt = Boolean(record.promptText)
    if (willInjectPrompt) {
      // Reserve the one-shot prompt before any awaited operation. This keeps
      // two nearly simultaneous inbound messages from both injecting it.
      this.store.touchUser(userKey, sessionId, contextToken, {
        sessionVersion: SESSION_VERSION,
        sessionDate: record.sessionDate,
        historyKey: record.historyKey,
        promptHash: record.promptHash,
        promptInjected: true,
      })
    }
    let route = this.isFallbackActive() ? 'fallback' : 'primary'
    let probeOwner = false
    if (route === 'primary' && this.fallbackProbeEligible) {
      if (this.fallbackProbeInFlight) route = 'fallback'
      else {
        this.fallbackProbeInFlight = true
        this.fallbackProbeEligible = false
        probeOwner = true
      }
    }
    const selectedModel = deep => route === 'fallback'
      ? (deep ? this.config.fallbackComplexModel : this.config.fallbackFastModel)
      : (deep ? this.config.complexModel : this.config.fastModel)
    try {
      const fullAccess = await this.transport.ensureFullAccess?.(sessionId)
      if (fullAccess === false && typeof this.transport.ensureFullAccess === 'function') {
        throw new Error('DSH 未能启用 Full Access 权限')
      }
      try {
        await this.#selectModel(sessionId, selectedModel(false))
      } catch (error) {
        if (route !== 'primary' || !classifyModelFailure(error).failover) {
          if (probeOwner) this.#releaseFallbackProbe()
          throw error
        }
        this.#activateFallback()
        route = 'fallback'
        await this.#selectModel(sessionId, selectedModel(false))
      }
    } catch (error) {
      if (probeOwner) this.#releaseFallbackProbe()
      if (this.activeTurns.get(userKey)?.gen === gen) this.activeTurns.delete(userKey)
      if (willInjectPrompt && this.store.getUser(userKey)?.sessionId === sessionId) {
        this.store.touchUser(userKey, sessionId, contextToken, {
          sessionVersion: SESSION_VERSION,
          sessionDate: record.sessionDate,
          historyKey: record.historyKey,
          promptHash: record.promptHash,
          promptInjected: false,
        })
      }
      throw error
    }
    if (this.config.typing) await this.wechat.setTyping(userKey, contextToken, true)
    const relay = new StreamRelay({
      wechat: this.wechat,
      to: userKey,
      token: contextToken,
      enabled: this.config.streaming,
      flushChars: this.config.streamFlushChars,
      flushMs: this.config.streamFlushMs,
      logger: this.logger,
    })
    const memoryStream = new MemoryStreamFilter()
    let askAccepted = false
    let hadOutput = false
    let hadSideEffect = false
    let firstRaw = ''
    try {
      const firstPrompt = this.#buildPromptMessage(text, record.promptText, true)
      const askFirst = () => this.transport.ask(sessionId, firstPrompt, {
        timeoutMs: this.config.turnTimeoutMs,
        slowMs: this.config.slowAckMs,
        // Hold the fast pass until its final text is known. This prevents an
        // internal routing block from leaking into any channel's visible reply.
        onDelta: delta => { if (delta) firstRaw += delta },
        onEvent: kind => {
          if (String(kind).startsWith('tool')) hadSideEffect = true
        },
      })
      let reply = ''
      try {
        reply = await askFirst()
      } catch (error) {
        if (route !== 'primary' || firstRaw.trim() || hadSideEffect
          || !classifyModelFailure(error, { hadSideEffect }).failover) throw error
        this.#activateFallback()
        route = 'fallback'
        await this.#selectModel(sessionId, selectedModel(false))
        firstRaw = ''
        reply = await askFirst()
      }
      askAccepted = true
      if (this.activeTurns.get(userKey)?.gen !== gen) return
      const firstText = String(reply || firstRaw || '')
      const controlRequested = parseDeepReasoningControl(firstText)
      if (controlRequested && hadSideEffect) {
        const error = new Error('首轮已经产生执行痕迹，已停止自动深度重试，请重新发送任务')
        error.code = 'deep-retry-side-effect'
        throw error
      }
      const needsDeep = controlRequested
      hadOutput = Boolean(firstText.trim() && !needsDeep)
      if (needsDeep) {
        if (!this.config.streaming) await this.wechat.sendText(userKey, contextToken, this.config.complexAckText)
        const deepPrompt = `${DEEP_RETRY_PROMPT}\n\n${text}`
        const askDeep = () => this.transport.ask(sessionId, deepPrompt, {
          timeoutMs: this.config.turnTimeoutMs,
          slowMs: 0,
          onDelta: delta => {
            if (delta) hadOutput = true
            relay.push(memoryStream.push(delta))
          },
          onEvent: kind => {
            if (String(kind).startsWith('tool')) hadSideEffect = true
          },
        })
        try {
          await this.#selectModel(sessionId, selectedModel(true))
        } catch (error) {
          if (route !== 'primary' || !classifyModelFailure(error).failover) throw error
          this.#activateFallback()
          route = 'fallback'
          await this.#selectModel(sessionId, selectedModel(true))
        }
        try {
          reply = await askDeep()
        } catch (error) {
          if (route !== 'primary' || hadOutput || hadSideEffect
            || !classifyModelFailure(error, { hadSideEffect }).failover) throw error
          this.#activateFallback()
          route = 'fallback'
          await this.#selectModel(sessionId, selectedModel(true))
          reply = await askDeep()
        }
      } else {
        // A malformed or mixed control block is ordinary off-mode text; it is
        // never interpreted as a routing command.
        reply = firstText
      }
      relay.push(memoryStream.finish())
      const parsed = parseMemoryResponse(controlVisibleSnapshot(needsDeep ? reply : firstText))
      let memoryResult = null
      try {
        memoryResult = applyMemoryOperations(this.memoryFile, parsed.operations, { date: this.now() })
      } catch (error) {
        this.store.appendError('memory.apply', error, { sessionId })
        this.logger.warn('[engine] 记忆写入失败:', error.message)
      }
      this.store.touchUser(userKey, sessionId, contextToken, {
        sessionVersion: SESSION_VERSION,
        sessionDate: record.sessionDate,
        historyKey: record.historyKey,
        promptHash: record.promptHash,
        promptInjected: true,
      })
      const visibleReply = parsed.text || (memoryResult && (memoryResult.added || memoryResult.replaced || memoryResult.deleted)
        ? '好的，已更新记忆。'
        : '')
      this.store.appendHistory(userKey, 'assistant', visibleReply, { historyKey: record.historyKey })
      await relay.finish(visibleReply)
    } catch (error) {
      // 被打断（版本号已变化）时静默；否则抛给上层按真实错误处理。
      if (this.activeTurns.get(userKey)?.gen === gen) {
        if (willInjectPrompt && !askAccepted && this.store.getUser(userKey)?.sessionId === sessionId) {
          this.store.touchUser(userKey, sessionId, contextToken, {
            sessionVersion: SESSION_VERSION,
            sessionDate: record.sessionDate,
            historyKey: record.historyKey,
            promptHash: record.promptHash,
            promptInjected: false,
          })
        }
        throw error
      }
    } finally {
      if (probeOwner) this.#releaseFallbackProbe()
      if (this.activeTurns.get(userKey)?.gen === gen) this.activeTurns.delete(userKey)
      if (this.config.typing) await this.wechat.setTyping(userKey, contextToken, false)
    }
  }

  /** 把新 session 首轮使用的 prompt 拼到用户消息前，后续轮次不重复发送。 */
  #buildPromptMessage(text, prompt = '', includeRouter = false) {
    const message = prompt ? [
      '[系统设定（来自 dsh-message 定制，非用户输入，请始终遵守）]',
      prompt,
      '[设定结束]',
      '',
      `用户消息：\n${text}`,
    ].join('\n') : text
    return includeRouter ? `${message}${ROUTER_PROMPT}` : message
  }

  /** 设置页控制 API：prompt 文件列表（含内容与是否默认）。 */
  listPrompts() {
    return {
      dir: this.promptDir,
      memoryFile: this.memoryFile,
      files: PROMPT_FILES.map(name => ({
        name,
        content: name === 'memory.md' ? (readMemoryFile(this.memoryFile) ?? '') : (readPromptFile(this.promptDir, name) ?? ''),
        isDefault: (name === 'memory.md' ? (readMemoryFile(this.memoryFile) ?? '') : (readPromptFile(this.promptDir, name) ?? ''))
          === (readPromptFile(this.defaultPromptDir, name) ?? ''),
      })),
    }
  }

  savePrompt(name, content) {
    if (name === 'memory.md') writeMemoryFile(this.memoryFile, content)
    else writePromptFile(this.promptDir, name, content)
    return { name, saved: true }
  }

  resetPrompt(name) {
    if (name === 'memory.md') resetMemoryFile(this.defaultPromptDir, this.memoryFile)
    else resetPromptFile(this.defaultPromptDir, this.promptDir, name)
    return { name, reset: true }
  }

  async #command(userKey, token, record, input) {
    const sessionId = record.sessionId
    const [command, ...args] = input.trim().split(/\s+/)
    if (command === '/help' || command === '/?') {
      await this.wechat.sendText(userKey, token, [
        '🤖 dsh-message 命令',
        '/new - 开始新会话', '/stop - 停止当前任务', '/status - 查看连接状态',
        '/send <outbox内相对路径> - 发送文件', '/renew - 发送续签二维码',
        '/users - 列出已知用户', '/allow add|remove <ID> - 管理白名单', '/cron - 列出定时任务',
      ].join('\n'))
      return
    }
    if (command === '/new') {
      const active = this.activeTurns.get(userKey)
      if (active) {
        await this.transport.cancel(active.sessionId).catch(() => {})
        if (this.activeTurns.get(userKey) === active) this.activeTurns.delete(userKey)
      }
      const created = await this.transport.ensureSession(userKey, { fresh: true })
      const freshId = sessionIdFrom(created)
      if (!freshId) throw new Error('DSH 创建新会话失败')
      const now = this.now()
      const dateKey = localDateKey(now)
      this.store.touchUser(userKey, freshId, token, {
        sessionVersion: SESSION_VERSION,
        sessionDate: dateKey,
        historyKey: `${dateKey}-${crypto.randomUUID()}`,
        promptHash: hashText(renderPrompt(this.promptDir, { date: now, memoryFile: this.memoryFile, includeMemory: false })),
        promptInjected: false,
      })
      this.userBySession.set(freshId, { from: userKey, token })
      await this.wechat.sendText(userKey, token, `已开始新会话：${freshId}`)
      return
    }
    if (command === '/stop') {
      await this.transport.cancel(sessionId)
      await this.wechat.sendText(userKey, token, '已请求停止当前任务。')
      return
    }
    if (command === '/status') {
      const state = this.wechat.status()
      await this.wechat.sendText(userKey, token, `微信：${state.connected ? '已连接' : '未连接'}\n流式输出：${this.config.streaming ? '开' : '关'}\n会话：${sessionId}\n最近轮询：${state.lastSuccessAt ? new Date(state.lastSuccessAt).toLocaleString() : '无'}`)
      return
    }
    if (command === '/renew') {
      await this.wechat.beginRenewal(userKey, { notify: true, open: false })
      return
    }
    if (command === '/send') {
      const requested = args.join(' ')
      if (!requested) throw new Error('用法：/send <outbox 内的相对路径>')
      const candidate = path.resolve(this.config.outboxDir, requested)
      if (!within(this.config.outboxDir, candidate)) throw new Error('只能发送 outbox 目录内的文件')
      if (!fs.statSync(candidate).isFile()) throw new Error('目标不是文件')
      await this.wechat.sendFile(userKey, token, candidate)
      return
    }
    if (command === '/users') {
      await this.wechat.sendText(userKey, token, Object.entries(this.store.loadUsers())
        .map(([id, value]) => `${id}  ${value.lastActiveAt || ''}`).join('\n') || '暂无用户')
      return
    }
    if (command === '/cron') {
      const lines = this.config.jobs.map(job => `${job.enabled === false ? '⏸' : '▶'} ${job.id || '-'}  ${job.cron || '-'}  ${job.userId || '-'}`)
      await this.wechat.sendText(userKey, token, lines.join('\n') || '暂无定时任务')
      return
    }
    if (command === '/allow') {
      const [operation, target] = args
      if (!['add', 'remove'].includes(operation) || !target) throw new Error('用法：/allow add|remove <用户ID>')
      const allowlist = new Set(this.config.allowlist)
      if (operation === 'add') allowlist.add(target)
      else allowlist.delete(target)
      this.updateSettings({ allowlist: [...allowlist] })
      await this.wechat.sendText(userKey, token, `白名单已更新，共 ${allowlist.size} 个用户。`)
      return
    }
    await this.wechat.sendText(userKey, token, '未知命令，发送 /help 查看用法。')
  }

  #allowed(userKey) {
    if (!this.config.enabled || this.config.accessPolicy === 'disabled') return false
    return this.config.accessPolicy !== 'allowlist' || this.config.allowlist.includes(userKey)
  }

  async #selectModel(sessionId, spec) {
    if (!spec) return
    try {
      const selected = await this.transport.selectModel(sessionId, spec)
      if (!selected
        || selected.provider !== spec.provider
        || selected.model !== spec.model
        || selected.reasoningEffort !== spec.reasoningEffort) {
        throw new Error(`DSH 未确认固定模型 ${spec.provider}/${spec.model}/${spec.reasoningEffort}`)
      }
    } catch (error) {
      this.logger.warn(`[engine] 模型切换失败，本轮已停止：${error.message}`)
      if (error && typeof error === 'object') error.modelRouteFailure = true
      throw error
    }
  }

  isFallbackActive() {
    const now = this.now().getTime()
    if (this.fallbackUntil > 0 && now >= this.fallbackUntil) {
      this.fallbackUntil = 0
      this.fallbackProbeEligible = true
    }
    return this.fallbackUntil > now
  }

  #activateFallback() {
    this.fallbackUntil = this.now().getTime() + 60_000
    this.fallbackProbeEligible = false
    this.fallbackProbeInFlight = false
  }

  #releaseFallbackProbe() {
    this.fallbackProbeInFlight = false
  }

  #userOf(sessionId) {
    const direct = this.userBySession.get(sessionId)
    if (direct) return direct
    for (const [from, record] of Object.entries(this.store.loadUsers())) {
      if (record.sessionId === sessionId && record.lastContextToken) return { from, token: record.lastContextToken }
    }
    return null
  }

  #forwardQuestion(rpcId, sessionId, questions) {
    const user = this.#userOf(sessionId)
    if (!user) return this.logger.warn(`[engine] 会话 ${sessionId} 的提问无法定位微信用户`)
    void this.wechat.sendText(user.from, user.token, formatQuestions(questions)).catch(error => {
      this.store.appendError('question.forward', error, { sessionId })
    })
  }

  #slowAck(sessionId) {
    const user = this.#userOf(sessionId)
    if (user) void this.wechat.sendText(user.from, user.token, '⏳ 收到，正在处理，完成后回复你。').catch(() => {})
  }

  async #maintenance() {
    if (!this.started) return
    try {
      const users = this.store.loadUsers()
      const recipients = renewalRecipients(users, this.config)
      if (this.config.renewalEnabled) await this.wechat.checkRenewal(recipients)
      const now = new Date()
      const key = minuteKey(now)
      for (const job of this.config.jobs) {
        if (job?.enabled === false || !job?.userId || !job?.prompt || !cronMatches(job.cron, now)) continue
        const jobKey = `${job.id || job.prompt}:${key}`
        if (this.jobRuns.has(jobKey)) continue
        this.jobRuns.set(jobKey, Date.now())
        const user = this.store.getUser(job.userId)
        if (!user?.lastContextToken) continue
        const record = await this.#ensureUser(job.userId, user.lastContextToken)
        void this.#runTurn(job.userId, user.lastContextToken, record, job.prompt).catch(error => {
          this.store.appendError('cron', error, { jobId: job.id })
        })
      }
      for (const [jobKey, at] of this.jobRuns) if (Date.now() - at > 3_600_000) this.jobRuns.delete(jobKey)
    } catch (error) {
      this.store.appendError('maintenance', error)
    }
  }
}
