import crypto from 'node:crypto'
import { BaseTransport, unwrapResult } from './transport.mjs'

function sessionIdFor(userKey, salt = '') {
  const digest = crypto.createHash('sha256').update(`${String(userKey)}:${salt}`).digest('hex').slice(0, 32)
  return `wx-${digest}`
}

function workspaceFor(items, cwd, title) {
  const normalized = String(cwd).replace(/[\\/]+$/, '').toLowerCase()
  return items.find((item) => String(item.path).replace(/[\\/]+$/, '').toLowerCase() === normalized)
    || items.find((item) => item.title === title)
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export class HttpTransport extends BaseTransport {
  constructor({
    base = 'http://127.0.0.1:3080',
    preset = 'standard',
    sessionCwd = process.cwd(),
    workspaceTitle = '微信会话',
    fetchImpl = globalThis.fetch,
    muxReconnectMs = 1000,
    ...options
  } = {}) {
    super(options)
    this.base = String(base).replace(/\/$/, '')
    this.preset = preset
    this.sessionCwd = sessionCwd
    this.workspaceTitle = workspaceTitle
    this.fetch = fetchImpl
    this.muxReconnectMs = Math.max(100, muxReconnectMs)
    this.abortController = null
    this.streamTask = null
    this.stallReported = false
  }

  async call(method, payload, { signal } = {}) {
    const rpcId = `dsh-message-${crypto.randomUUID()}`
    const response = await this.fetch(`${this.base}/api/${method}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: 'client-request', rpcId, method, payload }),
      signal,
    })
    const body = await response.json().catch(() => null)
    if (!response.ok) throw new Error(`DSH HTTP ${method} failed: ${response.status}`)
    if (body?.rpcId !== rpcId) throw new Error(`DSH RPC id mismatch for ${method}`)
    return unwrapResult(body)
  }

  /** Verify that the configured endpoint is a responsive DSH Web API. */
  async probe({ timeoutMs = 3000 } = {}) {
    return this.call('agentPreset.list', {}, {
      signal: AbortSignal.timeout(Math.max(100, Number(timeoutMs) || 3000)),
    })
  }

  async respond(message) {
    const response = await this.fetch(`${this.base}/api/respond`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(message),
    })
    return response.json().catch(() => ({ accepted: false, reason: 'bad-response' }))
  }

  /**
   * DSH serves the mux event channel over WebSocket only: plain GET SSE on
   * /api/events.mux is answered with HTTP 426 "upgrade required". The server
   * pushes one JSON frame per event: {type:'server-request', rpcId, method,
   * payload}, where payload is the MuxFrame consumed by _handleEnvelope.
   */
  _startStream() {
    this.abortController = new AbortController()
    const signal = this.abortController.signal
    this.streamTask = this.#runMuxStream(signal)
    void this.streamTask.catch(error => {
      if (!signal.aborted) this.onStall(error?.message || 'DSH 事件流失败')
    })
  }

  _stopStream() {
    this.abortController?.abort()
    this.abortController = null
    this.streamTask = null
  }

  async #runMuxStream(signal) {
    if (typeof WebSocket !== 'function') {
      throw new Error('当前 Node 版本不支持 WebSocket（需要 >= 22），无法连接 DSH 事件流')
    }
    const wsBase = this.base.replace(/^http:/, 'ws:').replace(/^https:/, 'wss:')
    let backoff = this.muxReconnectMs
    while (!signal.aborted) {
      let socket
      try {
        socket = await this.#openMux(wsBase, signal)
        backoff = this.muxReconnectMs
        this.stallReported = false
        await this.#pumpMux(socket, signal)
        if (signal.aborted) return
        throw new Error('DSH event stream closed')
      } catch (error) {
        if (signal.aborted) return
        try { socket?.close() } catch { /* already closed */ }
        const message = error?.message || 'DSH 事件流已断开'
        if (!this.stallReported) {
          this.stallReported = true
          this.onStall(message)
        } else {
          this.logger.warn(`[dsh-message] DSH 事件流重连中（${Math.ceil(backoff / 1000)} 秒后重试）: ${message}`)
        }
        await sleep(backoff)
        backoff = Math.min(30_000, backoff * 2)
      }
    }
  }

  async #openMux(wsBase, signal) {
    const socket = new WebSocket(`${wsBase}/api/events.mux`)
    const abortOnSignal = () => { try { socket.close() } catch { /* ignore */ } }
    signal.addEventListener('abort', abortOnSignal)
    try {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('DSH event stream open timed out')), 15_000)
        socket.onopen = () => { clearTimeout(timeout); resolve() }
        socket.onerror = () => { clearTimeout(timeout); reject(new Error('DSH event stream failed to open')) }
        socket.onclose = () => { clearTimeout(timeout); reject(new Error('DSH event stream closed before open')) }
        if (socket.readyState === WebSocket.CLOSING || socket.readyState === WebSocket.CLOSED) {
          clearTimeout(timeout)
          reject(new Error('DSH event stream closed before open'))
        }
      })
      socket.onopen = null
      socket.onerror = null
      socket.onclose = null
      signal.removeEventListener('abort', abortOnSignal)
      return socket
    } catch (error) {
      signal.removeEventListener('abort', abortOnSignal)
      try { socket.close() } catch { /* ignore */ }
      throw error
    }
  }

  #pumpMux(socket, signal) {
    return new Promise((resolve) => {
      const abortOnSignal = () => { try { socket.close() } catch { /* ignore */ } }
      signal.addEventListener('abort', abortOnSignal)
      const cleanup = () => {
        socket.onmessage = null
        socket.onclose = null
        socket.onerror = null
        signal.removeEventListener('abort', abortOnSignal)
      }
      socket.onmessage = (event) => {
        if (typeof event.data !== 'string' || !event.data) return
        try {
          this._handleEnvelope(JSON.parse(event.data))
        } catch (error) {
          this.logger.warn('[dsh-message] 丢弃格式错误的 DSH 事件:', error?.message ?? error)
        }
      }
      socket.onerror = () => { /* close always follows */ }
      socket.onclose = () => { cleanup(); resolve() }
    })
  }

  /** Reuse an existing DSH session when the stable id collides across cdw. */
  async #reuseExistingSession(sessionId) {
    const listing = await this.call('session.list', {})
    const found = (listing?.items || []).find(item => item?.sessionId === sessionId)
    return found ? { sessionId: found.sessionId } : null
  }

  async _ensureSession(userKey, { fresh = false, sessionId: requestedId } = {}) {
    const sessionId = requestedId || sessionIdFor(userKey, fresh ? crypto.randomUUID() : '')
    let workspace
    try {
      const listing = await this.call('workspace.list', {})
      workspace = workspaceFor(listing?.items || [], this.sessionCwd, this.workspaceTitle)
      if (!workspace) workspace = (await this.call('workspace.create', { path: this.sessionCwd }))?.workspace
      if (workspace && this.workspaceTitle && workspace.title !== this.workspaceTitle) {
        try {
          workspace = (await this.call('workspace.rename', {
            workspaceId: workspace.workspaceId,
            title: this.workspaceTitle,
          }))?.workspace || workspace
        } catch (error) {
          if (error?.code !== 'workspace-name-conflict') throw error
        }
      }
    } catch (error) {
      if (error?.code && error.code !== 'internal') throw error
    }
    try {
      return await this.call('session.create', workspace?.workspaceId
        ? { workspaceId: workspace.workspaceId, sessionId, agentPreset: this.preset }
        : { cwd: this.sessionCwd, sessionId, agentPreset: this.preset })
    } catch (error) {
      // DSH rejects a preallocated id that already exists under a different cwd
      // (session-conflict). Reuse the existing session so the user's
      // conversation survives launches where the process cwd differs.
      if (error?.code === 'session-conflict') {
        const existing = await this.#reuseExistingSession(sessionId)
        if (existing) return existing
      }
      throw error
    }
  }

  async _prompt(sessionId, text) {
    await this.call('session.prompt', {
      sessionId,
      mode: 'queue',
      content: [{ type: 'text', text: String(text) }],
    })
  }

  async _cancel(sessionId) {
    await this.call('session.cancel', { sessionId })
  }

  async _selectModel(sessionId, model) {
    return (await this.call('session.selectModel', {
      sessionId,
      provider: model.provider,
      model: model.model,
      ...(model.reasoningEffort ? { reasoningEffort: model.reasoningEffort } : {}),
    }))?.selected || model
  }

  async _status(sessionId) {
    const history = await this.call('session.history', { sessionId, maxMessages: 1 })
    return { sessionId, exists: true, hasMore: history?.hasMore === true }
  }

  async _respondQuestion(rpcId, sessionId, questions, text) {
    const answers = (questions || []).map((question) => ({ id: question.id, selected: [], custom: String(text) }))
    const response = await this.respond({
      type: 'client-response',
      rpcId,
      result: {
        ok: true,
        value: { sessionId, answer: { answers } },
      },
    })
    if (response?.accepted === false) throw new Error(`DSH 未接受问题回答：${response.reason || 'unknown'}`)
  }
}

export { sessionIdFor }
