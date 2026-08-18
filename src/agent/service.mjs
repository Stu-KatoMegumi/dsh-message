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

const ACTION_RE = /(写|改|创建|生成|删除|移动|复制|运行|执行|启动|停止|安装|下载|上传|搜索|查询|查找|分析|总结|整理|重构|调试|测试|构建|打包|部署|提交|推送|合并|克隆|备份|翻译|转换|解压|代码|脚本|命令|文件|项目|docker|git|npm|pnpm|node|python|pip|ssh|sql|api)/i
const SESSION_VERSION = 1
const MODEL_PROVIDER = 'deepseek-official'
const MODEL_NAME = 'deepseek-v4-flash'

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

function model(reasoningEffort) {
  return { provider: MODEL_PROVIDER, model: MODEL_NAME, reasoningEffort }
}

function scopedKey({ channel, botId, key }) {
  return `${channel}:${botId}:${key}`
}

/** Shared Prompt, memory and local-history policy used by every message channel. */
export class AgentService {
  constructor({ dataDir, defaultPromptDir = findDefaultPromptDir(), now = () => new Date() }) {
    if (!dataDir) throw new TypeError('AgentService dataDir is required')
    this.dataDir = path.resolve(dataDir)
    this.defaultPromptDir = path.resolve(defaultPromptDir)
    this.promptDir = editablePromptDir(this.dataDir)
    this.memoryFile = memoryFile(this.dataDir)
    this.sessionsFile = path.join(this.dataDir, 'sessions.json')
    this.historyDir = path.join(this.dataDir, 'history')
    this.settingsFile = path.join(this.dataDir, 'settings.json')
    this.now = now
    ensurePromptFiles(this.defaultPromptDir, this.promptDir)
    ensureMemoryFile(this.defaultPromptDir, this.memoryFile)
  }

  settings() {
    return {
      enabled: true,
      dailySessions: true,
      memoryEnabled: true,
      ...readJson(this.settingsFile, {}),
      fastModel: model('off'),
      complexModel: model('max'),
    }
  }

  updateSettings(patch = {}) {
    const current = this.settings()
    const next = {
      enabled: patch.enabled === undefined ? current.enabled : Boolean(patch.enabled),
      dailySessions: patch.dailySessions === undefined
        ? current.dailySessions : Boolean(patch.dailySessions),
      memoryEnabled: patch.memoryEnabled === undefined
        ? current.memoryEnabled : Boolean(patch.memoryEnabled),
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
    const complex = String(text).length > 40 || ACTION_RE.test(String(text))
    if (typeof harness?.rpc === 'function') {
      await harness.rpc('session.selectModel', {
        sessionId,
        ...(complex ? settings.complexModel : settings.fastModel),
      })
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

    const onUpdate = typeof askOptions?.onUpdate === 'function' ? askOptions.onUpdate : null
    let lastVisible = ''
    const wrappedOptions = onUpdate ? {
      ...askOptions,
      onUpdate: async (update) => {
        if (update?.type !== 'text') return onUpdate(update)
        const filter = new MemoryStreamFilter()
        const visible = filter.push(String(update.text ?? '')).trim()
        if (!visible || visible === lastVisible) return undefined
        lastVisible = visible
        return onUpdate({ ...update, text: visible })
      },
    } : askOptions
    return {
      text: injectPrompt
        ? ['[系统设定（来自 dsh-message，非用户输入，请始终遵守）]', promptText, '[设定结束]', '', `用户消息：\n${text}`].join('\n')
        : text,
      askOptions: wrappedOptions,
      metadata: { key, sessionId },
    }
  }

  afterTurn(_scope, { answer, metadata }) {
    if (!metadata) return answer
    const parsed = parseMemoryResponse(answer)
    const result = this.settings().memoryEnabled
      ? applyMemoryOperations(this.memoryFile, parsed.operations, { date: this.now() })
      : null
    const visible = parsed.text || (result && (result.added || result.replaced || result.deleted)
      ? '好的，已更新记忆。' : '')
    this.#appendHistory(metadata.key, 'assistant', visible, metadata.sessionId)
    return visible
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
