import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

function readJson(file, fallback = {}) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')) } catch { return fallback }
}

function atomicWrite(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const temporary = `${file}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`
  fs.writeFileSync(temporary, text, { encoding: 'utf8', mode: 0o600 })
  fs.renameSync(temporary, file)
}

function processExists(pid) {
  if (!Number.isSafeInteger(pid) || pid <= 0) return false
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return error?.code === 'EPERM'
  }
}

export function safeKey(userKey) {
  const source = String(userKey)
  const readable = source.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 48) || 'user'
  return `${readable}-${crypto.createHash('sha256').update(source).digest('hex').slice(0, 10)}`
}

function safeHistoryKey(historyKey) {
  const source = String(historyKey)
  const readable = source.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80) || 'session'
  return `${readable}-${crypto.createHash('sha256').update(source).digest('hex').slice(0, 8)}`
}

/** Return the calendar date used by session and history rotation. */
export function localDateKey(date = new Date()) {
  const value = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(value.getTime())) throw new TypeError('Invalid date')
  return [
    value.getFullYear(),
    String(value.getMonth() + 1).padStart(2, '0'),
    String(value.getDate()).padStart(2, '0'),
  ].join('-')
}

/** Durable state shared by plugin and standalone modes. */
export class Store {
  constructor(dir) {
    this.dir = path.resolve(dir)
    this.botFile = path.join(this.dir, 'bot.json')
    this.usersFile = path.join(this.dir, 'users.json')
    this.settingsFile = path.join(this.dir, 'settings.json')
    this.historyDir = path.join(this.dir, 'history')
    this.errorFile = path.join(this.dir, 'errors.jsonl')
    this.lockFile = path.join(this.dir, 'dsh-message.lock')
    this.hasLock = false
  }

  loadBot() { return readJson(this.botFile) }
  saveBot(state) { atomicWrite(this.botFile, JSON.stringify(state, null, 2) + '\n') }
  loadUsers() { return readJson(this.usersFile) }
  loadSettings() { return readJson(this.settingsFile) }

  saveSettings(settings) {
    atomicWrite(this.settingsFile, JSON.stringify(settings, null, 2) + '\n')
    return settings
  }

  updateSettings(patch) {
    return this.saveSettings({ ...this.loadSettings(), ...patch, updatedAt: new Date().toISOString() })
  }

  getUser(userKey) {
    return this.loadUsers()[String(userKey)] || null
  }

  touchUser(userKey, sessionId, contextToken, extra = {}) {
    const key = String(userKey)
    const users = this.loadUsers()
    users[key] = {
      ...users[key],
      ...extra,
      sessionId,
      createdAt: users[key]?.createdAt ?? new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      ...(contextToken ? { lastContextToken: contextToken } : {}),
    }
    atomicWrite(this.usersFile, JSON.stringify(users, null, 2) + '\n')
    if (extra.historyKey) this.ensureHistory(key, extra.historyKey)
    return users[key]
  }

  historyFile(userKey, historyKey = null) {
    const suffix = historyKey ? `--${safeHistoryKey(historyKey)}` : ''
    return path.join(this.historyDir, `${safeKey(userKey)}${suffix}.jsonl`)
  }

  ensureHistory(userKey, historyKey) {
    const file = this.historyFile(userKey, historyKey)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    if (!fs.existsSync(file)) fs.writeFileSync(file, '', { encoding: 'utf8', mode: 0o600 })
    return file
  }

  appendHistory(userKey, role, text, extra = {}) {
    const file = this.historyFile(userKey, extra.historyKey)
    const line = JSON.stringify({ t: Date.now(), role, text: String(text), ...extra }) + '\n'
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.appendFileSync(file, line, 'utf8')
  }

  readHistory(userKey, limit = Infinity, historyKey = null) {
    try {
      const activeKey = historyKey ?? this.getUser(userKey)?.historyKey ?? null
      const rows = fs.readFileSync(this.historyFile(userKey, activeKey), 'utf8')
        .split(/\r?\n/)
        .filter(Boolean)
        .map(line => JSON.parse(line))
      return Number.isFinite(limit) ? rows.slice(-Math.max(0, limit)) : rows
    } catch {
      return []
    }
  }

  appendError(scope, error, details = {}) {
    const row = {
      t: Date.now(),
      scope,
      message: error?.message ?? String(error),
      stack: error?.stack,
      ...details,
    }
    fs.mkdirSync(this.dir, { recursive: true })
    fs.appendFileSync(this.errorFile, JSON.stringify(row) + '\n', 'utf8')
  }

  readErrors(limit = 50) {
    try {
      return fs.readFileSync(this.errorFile, 'utf8').split(/\r?\n/).filter(Boolean)
        .slice(-Math.max(1, limit)).map(line => JSON.parse(line))
    } catch {
      return []
    }
  }

  /** Refuse two bot runtimes using the same session directory. */
  acquireLock() {
    fs.mkdirSync(this.dir, { recursive: true })
    const existing = readJson(this.lockFile, null)
    if (existing?.pid !== process.pid && processExists(existing?.pid)) {
      throw new Error(`dsh-message 已在运行（PID ${existing.pid}，数据目录 ${this.dir}）`)
    }
    atomicWrite(this.lockFile, JSON.stringify({ pid: process.pid, startedAt: Date.now() }) + '\n')
    this.hasLock = true
  }

  releaseLock() {
    if (!this.hasLock) return
    const existing = readJson(this.lockFile, null)
    if (existing?.pid === process.pid) {
      try { fs.unlinkSync(this.lockFile) } catch (error) {
        if (error?.code !== 'ENOENT') throw error
      }
    }
    this.hasLock = false
  }
}
