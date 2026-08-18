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

export class InprocTransport extends BaseTransport {
  constructor(apiProxy, { preset = 'standard', sessionCwd = process.cwd(), workspaceTitle = '微信会话', ...options } = {}) {
    super(options)
    this.api = apiProxy
    this.preset = preset
    this.sessionCwd = sessionCwd
    this.workspaceTitle = workspaceTitle
    this.abortController = null
    this.streamTask = null
  }

  async call(domain, method, payload) {
    const fn = this.api?.[domain]?.[method]
    if (typeof fn !== 'function') throw new Error(`DSH apiProxy 缺少 ${domain}.${method}`)
    const response = await fn.call(this.api[domain], { rpcId: `dsh-message-${crypto.randomUUID()}`, payload })
    return unwrapResult(response)
  }

  _startStream() {
    if (!this.api?.events?.mux) throw new Error('DSH apiProxy 缺少 events.mux')
    this.abortController = new AbortController()
    const signal = this.abortController.signal
    this.streamTask = (async () => {
      try {
        for await (const envelope of this.api.events.mux({ rpcId: `dsh-message-${crypto.randomUUID()}`, payload: {} }, signal)) {
          this._handleEnvelope(envelope)
        }
      } catch (error) {
        if (!signal.aborted) this.onStall(error?.message || 'DSH 事件流已断开')
      }
    })()
  }

  _stopStream() {
    this.abortController?.abort()
    this.abortController = null
    this.streamTask = null
  }

  /** Reuse an existing DSH session when the stable id collides across cdw. */
  async #reuseExistingSession(sessionId) {
    const listing = await this.call('sessions', 'list', {})
    const found = (listing?.items || []).find(item => item?.sessionId === sessionId)
    return found ? { sessionId: found.sessionId } : null
  }

  async _ensureSession(userKey, { fresh = false, sessionId: requestedId } = {}) {
    const sessionId = requestedId || sessionIdFor(userKey, fresh ? crypto.randomUUID() : '')
    let workspace
    try {
      const listing = await this.call('workspace', 'list', {})
      workspace = workspaceFor(listing?.items || [], this.sessionCwd, this.workspaceTitle)
      if (!workspace) {
        const created = await this.call('workspace', 'create', { path: this.sessionCwd })
        workspace = created?.workspace
      }
      if (workspace && this.workspaceTitle && workspace.title !== this.workspaceTitle) {
        try {
          workspace = (await this.call('workspace', 'rename', {
            workspaceId: workspace.workspaceId,
            title: this.workspaceTitle,
          }))?.workspace || workspace
        } catch (error) {
          // A title collision must not prevent the bot from using an existing
          // workspace; DSH's path identity remains the authoritative match.
          if (error?.code !== 'workspace-name-conflict') throw error
        }
      }
    } catch (error) {
      // Workspace support is optional in older DSH builds. Session creation by
      // cwd is the documented fallback and keeps those builds usable.
      if (error?.code && error.code !== 'internal') throw error
    }

    const payload = workspace?.workspaceId
      ? { workspaceId: workspace.workspaceId, sessionId, agentPreset: this.preset }
      : { cwd: this.sessionCwd, sessionId, agentPreset: this.preset }
    try {
      return await this.call('sessions', 'create', payload)
    } catch (error) {
      // create is idempotent for a stable sessionId and the same cwd, but DSH
      // rejects a preallocated id that already exists under a different cwd
      // (session-conflict). This happens when the bot's process cwd differs
      // between launches (e.g. standalone from the checkout vs. loaded by DSH).
      // Reuse the existing session instead of failing the turn, so the user's
      // conversation and its history survive the cwd change.
      if (error?.code === 'session-conflict') {
        const existing = await this.#reuseExistingSession(sessionId)
        if (existing) return existing
      }
      throw error
    }
  }

  async _prompt(sessionId, text) {
    await this.call('sessions', 'prompt', {
      sessionId,
      mode: 'queue',
      content: [{ type: 'text', text: String(text) }],
    })
  }

  async _cancel(sessionId) {
    await this.call('sessions', 'cancel', { sessionId })
  }

  async _selectModel(sessionId, model) {
    return (await this.call('sessions', 'selectModel', {
      sessionId,
      provider: model.provider,
      model: model.model,
      ...(model.reasoningEffort ? { reasoningEffort: model.reasoningEffort } : {}),
    }))?.selected || model
  }

  async _status(sessionId) {
    const history = await this.call('sessions', 'history', { sessionId, maxMessages: 1 })
    return { sessionId, exists: true, hasMore: history?.hasMore === true }
  }

  async _respondQuestion(rpcId, sessionId, questions, text) {
    const answers = (questions || []).map((question) => ({
      id: question.id,
      selected: [],
      custom: String(text),
    }))
    const response = await this.api.respond({
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
