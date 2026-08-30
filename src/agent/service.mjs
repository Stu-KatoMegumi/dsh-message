import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  PROMPT_FILES,
  editablePromptDir,
  ensurePromptFiles,
  readPromptFile,
  renderPrompt,
  resetPromptFile,
  writePromptFile,
} from '../core/prompt.mjs'
import {
  MemoryStreamFilter,
  applyMemoryOperations,
  ensureMemoryFile,
  memoryFile,
  parseMemoryResponse,
  readMemoryFile,
  resetMemoryFile,
  writeMemoryFile,
} from '../core/memory.mjs'
import { localDateKey, safeKey } from '../core/store.mjs'
import { classifyModelFailure, failureRecord } from '../core/model-failure.mjs'

const SESSION_VERSION = 1
const PRIMARY_PROVIDER = 'vllm'
const PRIMARY_MODEL = 'Qwen-3.8-Flash-Next'
const FALLBACK_PROVIDER = 'deepseek-official'
const FALLBACK_MODEL = 'deepseek-v4-flash'
const FULL_ACCESS_PRESET = 'danger-full-access'
const CONTROL_START = '<dsh-message-control>'
const CONTROL_END = '</dsh-message-control>'
const CONTROL_PAYLOAD = JSON.stringify({ version: 1, action: 'retry_with_deep_reasoning' })
const CONTROL_PREFIX = `${CONTROL_START}\n`
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

function model(provider, modelName, reasoningEffort) {
  return Object.freeze({ provider, model: modelName, reasoningEffort })
}

export const PRIMARY_FAST_MODEL = model(PRIMARY_PROVIDER, PRIMARY_MODEL, 'off')
export const PRIMARY_DEEP_MODEL = model(PRIMARY_PROVIDER, PRIMARY_MODEL, 'xhigh')
export const FALLBACK_FAST_MODEL = model(FALLBACK_PROVIDER, FALLBACK_MODEL, 'off')
export const FALLBACK_DEEP_MODEL = model(FALLBACK_PROVIDER, FALLBACK_MODEL, 'max')
export const MODEL_OPTIONS = Object.freeze([
  PRIMARY_FAST_MODEL,
  PRIMARY_DEEP_MODEL,
  FALLBACK_FAST_MODEL,
  FALLBACK_DEEP_MODEL,
])

function sameModel(left, right) {
  return Boolean(left && right)
    && left.provider === right.provider
    && left.model === right.model
    && left.reasoningEffort === right.reasoningEffort
}

function envValue(env, key) {
  const value = env?.[key]
  return value === undefined || value === null || String(value).trim() === '' ? null : String(value).trim()
}

function configuredModel(env, providerKey, modelKey, reasoningKey, fallback) {
  const provider = envValue(env, providerKey)
  const modelName = envValue(env, modelKey)
  const reasoningEffort = envValue(env, reasoningKey)
  if (!provider && !modelName && !reasoningEffort) return fallback
  const candidate = model(provider ?? fallback.provider, modelName ?? fallback.model, reasoningEffort ?? fallback.reasoningEffort)
  if (!sameModel(candidate, fallback)) {
    throw new Error(`${providerKey} 等模型配置只能使用 ${fallback.provider}/${fallback.model}/${fallback.reasoningEffort}`)
  }
  return candidate
}

function routeModels(env) {
  return {
    fastModel: configuredModel(env, 'DSH_MESSAGE_FAST_MODEL_PROVIDER', 'DSH_MESSAGE_FAST_MODEL', 'DSH_MESSAGE_FAST_REASONING', PRIMARY_FAST_MODEL),
    complexModel: configuredModel(env, 'DSH_MESSAGE_COMPLEX_MODEL_PROVIDER', 'DSH_MESSAGE_COMPLEX_MODEL', 'DSH_MESSAGE_COMPLEX_REASONING', PRIMARY_DEEP_MODEL),
    fallbackFastModel: configuredModel(env, 'DSH_MESSAGE_FALLBACK_MODEL_PROVIDER', 'DSH_MESSAGE_FALLBACK_MODEL', 'DSH_MESSAGE_FALLBACK_FAST_REASONING', FALLBACK_FAST_MODEL),
    fallbackComplexModel: configuredModel(env, 'DSH_MESSAGE_FALLBACK_MODEL_PROVIDER', 'DSH_MESSAGE_FALLBACK_MODEL', 'DSH_MESSAGE_FALLBACK_COMPLEX_REASONING', FALLBACK_DEEP_MODEL),
  }
}

function modelFailure(message, cause) {
  const error = new Error(message)
  error.code = 'model-routing-failed'
  error.modelRouteFailure = true
  const upstreamCode = String(cause?.code ?? cause?.details?.code ?? '').trim()
  if (upstreamCode) error.upstreamCode = upstreamCode
  error.cause = cause
  return error
}

function permissionValue(history) {
  const projected = history?.projections?.values?.permissions?.currentValue
  if (typeof projected === 'string') return projected
  const events = Array.isArray(history?.events) ? history.events.map(entry => entry?.event ?? entry) : []
  let preset
  let sandbox
  let approval
  for (const event of events) {
    if (event?.type === 'permission/preset') preset = event.data?.preset
    if (event?.type === 'sandbox/mode') sandbox = event.data?.mode
    if (event?.type === 'approval/policy') approval = event.data?.policy
  }
  if (preset === FULL_ACCESS_PRESET && sandbox === FULL_ACCESS_PRESET && approval === 'never') return FULL_ACCESS_PRESET
  return null
}

/** Parse the only model-visible control protocol accepted by the router. */
export function parseDeepReasoningControl(value) {
  const text = String(value ?? '').trim()
  if (!text.startsWith(CONTROL_START) || !text.endsWith(CONTROL_END)) return false
  const payload = text.slice(CONTROL_START.length, -CONTROL_END.length).trim()
  if (payload.length > 256) return false
  try {
    const parsed = JSON.parse(payload)
    const keys = Object.keys(parsed ?? {}).sort()
    return keys.length === 2
      && keys[0] === 'action'
      && keys[1] === 'version'
      && parsed.version === 1
      && parsed.action === 'retry_with_deep_reasoning'
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
    if (end < 0 && CONTROL_PREFIX.startsWith(trimmed)) return ''
    if (end < 0 && trimmed.startsWith(CONTROL_PREFIX)) return ''
  }
  const index = text.indexOf(CONTROL_START)
  return index >= 0 ? text.slice(0, index) : text
}

function atomicJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const temporary = `${file}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 })
  fs.renameSync(temporary, file)
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')) } catch { return fallback }
}

function hash(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex')
}

function findDefaultPromptDir() {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url))
  return [
    path.resolve(moduleDir, '..', 'prompt'),
    path.resolve(moduleDir, '..', 'src', 'prompt'),
    path.resolve(process.cwd(), 'src', 'prompt'),
  ].find((candidate) => fs.existsSync(path.join(candidate, 'system-prompt.md')))
    ?? path.resolve(process.cwd(), 'src', 'prompt')
}

function normalizeModelChoice(value, fallback = null) {
  let modelName = value?.model
  let reasoningEffort = value?.reasoningEffort
  let provider = value?.provider
  if (typeof value === 'string') {
    const parts = value.split('/')
    if (parts.length === 3) {
      [provider, modelName, reasoningEffort] = parts
    } else {
      const slash = value.lastIndexOf('/')
      modelName = value.slice(0, slash)
      reasoningEffort = value.slice(slash + 1)
    }
  }
  const option = MODEL_OPTIONS.find((candidate) =>
    candidate.model === modelName
      && candidate.reasoningEffort === reasoningEffort
      && (provider === undefined || candidate.provider === provider))
  return option ? { ...option } : fallback ? { ...fallback } : null
}

function requireModelChoice(value, label) {
  const choice = normalizeModelChoice(value)
  if (!choice) throw new Error(`不支持的${label}模型`)
  return choice
}

function scopedKey({ channel, botId, key }) {
  return `${channel}:${botId}:${key}`
}

/** Shared Prompt, memory and local-history policy used by every message channel. */
export class AgentService {
  constructor({ dataDir, defaultPromptDir = findDefaultPromptDir(), now = () => new Date(), env = process.env }) {
    if (!dataDir) throw new TypeError('AgentService dataDir is required')
    this.dataDir = path.resolve(dataDir)
    this.defaultPromptDir = path.resolve(defaultPromptDir)
    this.promptDir = editablePromptDir(this.dataDir)
    this.memoryFile = memoryFile(this.dataDir)
    this.sessionsFile = path.join(this.dataDir, 'sessions.json')
    this.historyDir = path.join(this.dataDir, 'history')
    this.settingsFile = path.join(this.dataDir, 'settings.json')
    this.now = now
    const configuredPermission = envValue(env, 'DSH_MESSAGE_PERMISSION_PRESET')
    if (configuredPermission && configuredPermission !== FULL_ACCESS_PRESET) {
      throw new Error(`DSH_MESSAGE_PERMISSION_PRESET 必须为 ${FULL_ACCESS_PRESET}`)
    }
    this.models = routeModels(env)
    this.permissionLocks = new Map()
    this.fallbackUntil = 0
    this.probeEligible = false
    this.probeInFlight = false
    this.lastFailure = null
    ensurePromptFiles(this.defaultPromptDir, this.promptDir)
    ensureMemoryFile(this.defaultPromptDir, this.memoryFile)
  }

  settings() {
    const stored = readJson(this.settingsFile, {})
    return {
      enabled: true,
      dailySessions: true,
      memoryEnabled: true,
      ...stored,
      fastModel: { ...this.models.fastModel },
      complexModel: { ...this.models.complexModel },
      fallbackFastModel: { ...this.models.fallbackFastModel },
      fallbackComplexModel: { ...this.models.fallbackComplexModel },
    }
  }

  updateSettings(patch = {}) {
    const current = this.settings()
    for (const [name, expected] of [
      ['fastModel', this.models.fastModel],
      ['complexModel', this.models.complexModel],
      ['fallbackFastModel', this.models.fallbackFastModel],
      ['fallbackComplexModel', this.models.fallbackComplexModel],
    ]) {
      if (patch[name] !== undefined && !sameModel(normalizeModelChoice(patch[name]), expected)) {
        throw new Error(`${name} 由 dsh-message 固定，不能切换到其他模型`)
      }
    }
    const next = {
      enabled: patch.enabled === undefined ? current.enabled : Boolean(patch.enabled),
      dailySessions: patch.dailySessions === undefined
        ? current.dailySessions : Boolean(patch.dailySessions),
      memoryEnabled: patch.memoryEnabled === undefined
        ? current.memoryEnabled : Boolean(patch.memoryEnabled),
      fastModel: { ...this.models.fastModel },
      complexModel: { ...this.models.complexModel },
      fallbackFastModel: { ...this.models.fallbackFastModel },
      fallbackComplexModel: { ...this.models.fallbackComplexModel },
      updatedAt: new Date().toISOString(),
    }
    atomicJson(this.settingsFile, next)
    return this.settings()
  }

  status() {
    const sessions = readJson(this.sessionsFile, {})
    return {
      name: 'dsh-message',
      dataDir: this.dataDir,
      promptDir: this.promptDir,
      memoryFile: this.memoryFile,
      sessionCount: Object.keys(sessions).length,
      settings: this.settings(),
      modelOptions: MODEL_OPTIONS,
      modelRouting: {
        active: this.isFallbackActive() ? 'fallback' : 'primary',
        fallbackUntil: this.fallbackUntil || null,
        primary: { fast: this.models.fastModel, deep: this.models.complexModel },
        fallback: { fast: this.models.fallbackFastModel, deep: this.models.fallbackComplexModel },
        lastFailure: this.lastFailure,
      },
      prompts: this.listPrompts(),
    }
  }

  listPrompts() {
    return PROMPT_FILES.map((name) => {
      const content = name === 'memory.md'
        ? (readMemoryFile(this.memoryFile) ?? '')
        : (readPromptFile(this.promptDir, name) ?? '')
      const defaultContent = readPromptFile(this.defaultPromptDir, name) ?? ''
      return { name, content, isDefault: content === defaultContent }
    })
  }

  savePrompt(name, content) {
    if (name === 'memory.md') writeMemoryFile(this.memoryFile, content)
    else writePromptFile(this.promptDir, name, content)
    return this.status()
  }

  resetPrompt(name) {
    if (name === 'memory.md') resetMemoryFile(this.defaultPromptDir, this.memoryFile)
    else resetPromptFile(this.defaultPromptDir, this.promptDir, name)
    return this.status()
  }

  shouldRotate(scope, sessionId) {
    if (!this.settings().enabled) return false
    const now = this.now()
    const record = readJson(this.sessionsFile, {})[scopedKey(scope)]
    const promptHash = hash(renderPrompt(this.promptDir, {
      date: now,
      memoryFile: this.memoryFile,
      includeMemory: false,
    }))
    return !record
      || record.version !== SESSION_VERSION
      || record.sessionId !== sessionId
      || record.promptHash !== promptHash
      || (this.settings().dailySessions && record.date !== localDateKey(now))
  }

  async beforeTurn(scope, { sessionId, text, askOptions = {}, harness }) {
    await this.#ensureFullAccess(harness, sessionId)
    const settings = this.settings()
    if (!settings.enabled) return { text, askOptions, metadata: null }
    const now = this.now()
    const key = scopedKey(scope)
    const sessions = readJson(this.sessionsFile, {})
    const promptText = renderPrompt(this.promptDir, {
      date: now,
      memoryFile: this.memoryFile,
      includeMemory: settings.memoryEnabled,
    })
    const promptHash = hash(renderPrompt(this.promptDir, {
      date: now,
      memoryFile: this.memoryFile,
      includeMemory: false,
    }))
    const existing = sessions[key]
    const injectPrompt = !existing || existing.sessionId !== sessionId || existing.promptHash !== promptHash
    let route = this.isFallbackActive() ? 'fallback' : 'primary'
    let probeOwner = false
    if (route === 'primary' && this.probeEligible) {
      if (this.probeInFlight) route = 'fallback'
      else {
        this.probeInFlight = true
        this.probeEligible = false
        probeOwner = true
      }
    }
    const metadata = {
      key,
      sessionId,
      originalText: String(text),
      firstText: '',
      askOptions,
      route,
      deepUsed: false,
      retryStarted: false,
      recoveryAttempted: false,
      hadSideEffect: false,
      probeOwner,
    }
    try {
      await this.#selectModel(harness, sessionId, route === 'fallback'
        ? this.models.fallbackFastModel : this.models.fastModel)
    } catch (error) {
      const classification = classifyModelFailure(error)
      if (route !== 'primary' || !classification.failover) {
        this.#recordFailure(error, { reason: classification.reason, route, sessionId })
        throw error
      }
      this.#recordFailure(error, { reason: classification.reason, route, sessionId, switched: true })
      this.#activateFallback()
      route = 'fallback'
      metadata.route = route
      await this.#selectModel(harness, sessionId, this.models.fallbackFastModel)
    }
    sessions[key] = {
      version: SESSION_VERSION,
      sessionId,
      date: localDateKey(now),
      promptHash,
      updatedAt: now.toISOString(),
    }
    atomicJson(this.sessionsFile, sessions)
    this.#appendHistory(key, 'user', text, sessionId)

    const baseText = injectPrompt
      ? ['[系统设定（来自 dsh-message，非用户输入，请始终遵守）]', promptText, '[设定结束]', '', `用户消息：\n${text}`].join('\n')
      : String(text)
    metadata.firstText = `${baseText}${ROUTER_PROMPT}`
    return {
      text: metadata.firstText,
      askOptions: this.#wrapAskOptions(askOptions, metadata, true),
      metadata,
    }
  }

  async afterFirstTurn(_scope, { answer, metadata, harness }) {
    if (!metadata || metadata.retryStarted || !parseDeepReasoningControl(answer)) return null
    if (metadata.hadSideEffect) {
      const error = new Error('首轮已经产生执行痕迹，已停止自动深度重试，请重新发送任务')
      error.code = 'deep-retry-side-effect'
      throw error
    }
    metadata.retryStarted = true
    metadata.deepUsed = true
    let route = metadata.route
    try {
      await this.#selectModel(harness, metadata.sessionId, route === 'fallback'
        ? this.models.fallbackComplexModel : this.models.complexModel)
    } catch (error) {
      const classification = classifyModelFailure(error)
      if (route !== 'primary' || !classification.failover) {
        this.#recordFailure(error, { reason: classification.reason, route, sessionId: metadata.sessionId })
        throw error
      }
      this.#recordFailure(error, { reason: classification.reason, route, sessionId: metadata.sessionId, switched: true })
      this.#activateFallback()
      route = 'fallback'
      metadata.route = route
      await this.#selectModel(harness, metadata.sessionId, this.models.fallbackComplexModel)
    }
    return {
      text: DEEP_RETRY_PROMPT,
      askOptions: this.#wrapAskOptions(metadata.askOptions, metadata, false),
    }
  }

  async onTurnError(_scope, { error, metadata, harness }) {
    if (!metadata) return null
    if (metadata.recoveryAttempted || metadata.route !== 'primary') {
      // The failover channel also failed (or this turn never owned the primary
      // route). Never switch twice for one user message.
      this.#recordFailure(error, {
        reason: metadata.route === 'fallback' ? 'fallback-turn-failed' : 'not-primary-route',
        route: metadata.route,
        sessionId: metadata.sessionId,
      })
      this.#releaseProbe(metadata)
      return null
    }
    const classification = classifyModelFailure(error, { hadSideEffect: metadata.hadSideEffect })
    if (!classification.failover) {
      this.#recordFailure(error, { reason: classification.reason, route: 'primary', sessionId: metadata.sessionId })
      this.#releaseProbe(metadata)
      return null
    }
    metadata.recoveryAttempted = true
    this.#recordFailure(error, {
      reason: classification.reason,
      route: 'primary',
      sessionId: metadata.sessionId,
      switched: true,
    })
    this.#activateFallback()
    await this.#selectModel(harness, metadata.sessionId, metadata.deepUsed
      ? this.models.fallbackComplexModel : this.models.fallbackFastModel)
    metadata.route = 'fallback'
    return {
      text: metadata.deepUsed ? DEEP_RETRY_PROMPT : metadata.firstText,
      askOptions: this.#wrapAskOptions(metadata.askOptions, metadata, !metadata.deepUsed),
    }
  }

  afterTurn(_scope, { answer, metadata }) {
    if (!metadata) return answer
    this.#releaseProbe(metadata)
    if (parseDeepReasoningControl(answer)) {
      const error = new Error('深度执行未返回最终答案，请重新发送任务')
      error.code = 'deep-retry-loop'
      throw error
    }
    const parsed = parseMemoryResponse(controlVisibleSnapshot(answer))
    const result = this.settings().memoryEnabled
      ? applyMemoryOperations(this.memoryFile, parsed.operations, { date: this.now() })
      : null
    const visible = parsed.text || (result && (result.added || result.replaced || result.deleted)
      ? '好的，已更新记忆。' : '')
    this.#appendHistory(metadata.key, 'assistant', visible, metadata.sessionId)
    return visible
  }

  isFallbackActive() {
    const now = this.now().getTime()
    if (this.fallbackUntil > 0 && now >= this.fallbackUntil) {
      this.fallbackUntil = 0
      this.probeEligible = true
    }
    return this.fallbackUntil > now
  }

  #activateFallback() {
    this.fallbackUntil = this.now().getTime() + 60_000
    this.probeEligible = false
    this.probeInFlight = false
  }

  #releaseProbe(metadata) {
    if (!metadata?.probeOwner) return
    metadata.probeOwner = false
    this.probeInFlight = false
  }

  /** Keep a secret-free trace of why routing switched or a turn gave up. */
  #recordFailure(error, { reason, route, sessionId = null, switched = false }) {
    this.lastFailure = failureRecord(error, {
      reason,
      route,
      sessionId,
      switched,
      at: this.now(),
    })
  }

  async #selectModel(harness, sessionId, spec) {
    if (typeof harness?.rpc !== 'function') throw modelFailure('DSH 不支持模型选择 RPC')
    try {
      const result = await harness.rpc('session.selectModel', { sessionId, ...spec })
      const selected = result?.selected ?? result
      if (!sameModel(selected, spec)) {
        throw modelFailure(`DSH 未确认模型 ${spec.provider}/${spec.model}/${spec.reasoningEffort}`)
      }
      return selected
    } catch (error) {
      if (error?.modelRouteFailure === true) throw error
      throw modelFailure(`模型 ${spec.provider}/${spec.model} 不可用`, error)
    }
  }

  async #ensureFullAccess(harness, sessionId) {
    if (typeof harness?.rpc !== 'function') throw new Error('DSH 不支持权限校验 RPC')
    const previous = this.permissionLocks.get(sessionId) ?? Promise.resolve()
    const current = previous.catch(() => undefined).then(async () => {
      const read = () => harness.rpc('session.history', { sessionId, maxMessages: 1 })
      let history = await read()
      if (permissionValue(history) === FULL_ACCESS_PRESET) return
      const response = await harness.rpc('session.prompt', {
        sessionId,
        mode: 'queue',
        content: [{ type: 'text', text: `/permission ${FULL_ACCESS_PRESET}` }],
      })
      if (response?.accepted !== true || (response.command !== undefined && response.command?.kind !== 'success')) {
        throw new Error('DSH Full Access 权限切换失败')
      }
      history = await read()
      if (permissionValue(history) !== FULL_ACCESS_PRESET) {
        throw new Error('DSH 未确认当前 Session 已启用 Full Access')
      }
    })
    this.permissionLocks.set(sessionId, current)
    try {
      await current
    } finally {
      if (this.permissionLocks.get(sessionId) === current) this.permissionLocks.delete(sessionId)
    }
  }

  #wrapAskOptions(options, metadata, routerMode) {
    const original = typeof options?.onUpdate === 'function' ? options.onUpdate : null
    let lastVisible = ''
    return {
      ...options,
      onUpdate: async (update) => {
        if (update?.type === 'tool') metadata.hadSideEffect = true
        if (update?.type !== 'text') {
          if (original) return original(update)
          return undefined
        }
        const snapshot = String(update.text ?? '')
        const routed = routerMode ? controlVisibleSnapshot(snapshot) : snapshot
        if (routed.trim()) metadata.hadSideEffect = true
        const visible = new MemoryStreamFilter().push(routed).trim()
        if (!visible || visible === lastVisible) return undefined
        lastVisible = visible
        return original ? original({ ...update, text: visible }) : undefined
      },
    }
  }

  #appendHistory(key, role, text, sessionId) {
    const file = path.join(this.historyDir, `${safeKey(key)}.jsonl`)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.appendFileSync(file, `${JSON.stringify({
      t: Date.now(), role, text: String(text), sessionId,
    })}\n`, { encoding: 'utf8', mode: 0o600 })
  }
}

const services = new Map()

export function getAgentService(options) {
  const key = path.resolve(options.dataDir)
  let service = services.get(key)
  if (!service) {
    service = new AgentService(options)
    services.set(key, service)
  }
  return service
}
