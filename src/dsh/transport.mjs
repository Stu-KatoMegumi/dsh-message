import crypto from 'node:crypto'

const DEFAULT_TIMEOUT = 15 * 60 * 1000
const DEFAULT_SLOW = 4000

function newRpcId(prefix = 'dsh-message') {
  return `${prefix}-${crypto.randomUUID()}`
}

function rpcError(result, fallback = 'DSH RPC failed') {
  const value = result?.error ?? result
  const error = new Error(typeof value === 'string' ? value : value?.message || fallback)
  if (value && typeof value === 'object') {
    error.code = value.code
    error.details = value.details
  }
  return error
}

function unwrapResult(response) {
  const result = response?.result ?? response
  if (result?.ok === false) throw rpcError(result)
  return result?.ok === true ? result.value : result
}

function textFromValue(value) {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return ''
  if (typeof value.text === 'string') return value.text
  if (Array.isArray(value.content)) return value.content.map(textFromValue).filter(Boolean).join('')
  if (Array.isArray(value.parts)) return value.parts.map(textFromValue).filter(Boolean).join('')
  return value.message ? textFromValue(value.message) : ''
}

function eventText(event) {
  const data = event?.data ?? event
  return textFromValue(data?.message ?? data?.content ?? data?.text ?? data)
}

function eventTurn(event) {
  return event?.data?.turn ?? event?.turn ?? event?.data?.turnId ?? event?.turnId ?? null
}

/** Shared event/turn coordinator used by the in-process and HTTP adapters. */
export class BaseTransport {
  constructor({ timeoutMs = DEFAULT_TIMEOUT, slowMs = DEFAULT_SLOW, logger = null } = {}) {
    this.timeoutMs = timeoutMs
    this.slowMs = slowMs
    this.logger = logger || { log: console.log, warn: console.warn, error: console.error }
    this.started = false
    this.lastSeq = new Map()
    this.turns = new Map()
    this.waiters = new Map()
    this.questions = new Map()
    this.sessionChains = new Map()
    this.onQuestion = () => {}
    this.onSlow = () => {}
    this.onStall = () => {}
  }

  start() {
    if (this.started) return
    this.started = true
    try { this._startStream?.() } catch (error) {
      this.started = false
      throw error
    }
  }

  stop() {
    this.started = false
    for (const waiter of this.waiters.values()) {
      clearTimeout(waiter.timeout)
      clearTimeout(waiter.slowTimer)
      waiter.reject(new Error('DSH transport stopped'))
    }
    this.waiters.clear()
    this.questions.clear()
    this.turns.clear()
    this.sessionChains.clear()
    this._stopStream?.()
  }

  pendingQuestion(sessionId) {
    return [...this.questions.values()].find(question => question.sessionId === sessionId) ?? null
  }

  async ensureSession(userKey, options = {}) {
    return this._ensureSession(String(userKey), options)
  }

  async selectModel(sessionId, model) {
    return model ? this._selectModel(sessionId, model) : null
  }

  /** Ensure a standalone session uses the same Full Access invariant as the plugin host. */
  async ensureFullAccess(sessionId) {
    return this._ensureFullAccess?.(sessionId) ?? false
  }

  async cancel(sessionId) {
    return this._cancel(sessionId)
  }

  async status(sessionId) {
    return this._status?.(sessionId) ?? { sessionId }
  }

  /** Serialize prompts per session so chunks cannot cross between two turns. */
  ask(sessionId, text, options = {}) {
    const prior = this.sessionChains.get(sessionId) ?? Promise.resolve()
    const current = prior.catch(() => {}).then(() => this.#askOne(sessionId, text, options))
    this.sessionChains.set(sessionId, current)
    void current.finally(() => {
      if (this.sessionChains.get(sessionId) === current) this.sessionChains.delete(sessionId)
    }).catch(() => {})
    return current
  }

  async #askOne(sessionId, text, {
    timeoutMs = this.timeoutMs,
    slowMs = this.slowMs,
    onDelta = null,
    onEvent = null,
  } = {}) {
    if (!this.started) this.start()
    const baseline = this.lastSeq.get(sessionId) ?? 0
    const key = `${sessionId}:${newRpcId('turn')}`
    const promise = new Promise((resolve, reject) => {
      const waiter = {
        sessionId,
        baseline,
        resolve,
        reject,
        onDelta: typeof onDelta === 'function' ? onDelta : null,
        onEvent: typeof onEvent === 'function' ? onEvent : null,
        slowTimer: null,
        timeout: null,
      }
      if (slowMs > 0) {
        waiter.slowTimer = setTimeout(() => {
          if (this.waiters.has(key)) this.onSlow(sessionId)
        }, slowMs)
      }
      waiter.timeout = setTimeout(() => {
        if (!this.waiters.has(key)) return
        this.waiters.delete(key)
        clearTimeout(waiter.slowTimer)
        void Promise.resolve(this._cancel(sessionId)).catch(() => {})
        this.onStall(sessionId)
        reject(new Error(`DSH session timed out after ${timeoutMs} ms`))
      }, timeoutMs)
      this.waiters.set(key, waiter)
    })

    try {
      await this._prompt(sessionId, text)
    } catch (error) {
      const waiter = this.waiters.get(key)
      if (waiter) {
        this.waiters.delete(key)
        clearTimeout(waiter.timeout)
        clearTimeout(waiter.slowTimer)
        waiter.reject(error)
      }
    }
    return promise
  }

  async answerQuestion(rpcId, sessionId, text) {
    const question = this.questions.get(rpcId)
    if (!question || question.sessionId !== sessionId) throw new Error('该提问已过期或不属于当前会话')
    await this._respondQuestion(rpcId, sessionId, question.questions, text)
    this.questions.delete(rpcId)
  }

  _handleEnvelope(envelope) {
    const frame = envelope?.payload ?? envelope
    if (!frame || typeof frame !== 'object') return
    if (frame.type === 'question/requested') {
      const rpcId = envelope?.rpcId || newRpcId('question')
      const record = { rpcId, sessionId: frame.sessionId, questions: frame.questions || [] }
      this.questions.set(rpcId, record)
      this.onQuestion(rpcId, record.sessionId, record.questions)
      return
    }
    if (frame.type === 'question/resolved') {
      this.questions.delete(frame.questionRpcId)
      return
    }
    if (frame.type === 'session/subscribed') {
      this.lastSeq.set(frame.sessionId, Number(frame.lastSeq) || 0)
      return
    }
    if (frame.type === 'stream/error') {
      this.onStall(frame.error?.message || 'DSH event stream failed')
      return
    }
    if (frame.type !== 'session/event' || !frame.event) return
    const sessionId = frame.sessionId
    const seq = Number(frame.event.seq ?? frame.event.sequence ?? 0)
    if (seq) this.lastSeq.set(sessionId, Math.max(seq, this.lastSeq.get(sessionId) ?? 0))
    this._handleSessionEvent(sessionId, frame.event)
  }

  _handleSessionEvent(sessionId, event) {
    const kind = event?.type || event?.kind || event?.event || ''
    const turn = eventTurn(event)
    let state = this.turns.get(sessionId)
    if (!state || (turn != null && state.turn != null && String(state.turn) !== String(turn))) {
      state = { turn, text: '' }
      this.turns.set(sessionId, state)
    } else if (turn != null && state.turn == null) {
      state.turn = turn
    }

    // Tool calls/results are observable side effects even when they produce
    // no text delta. Surface them to the standalone engine so it can refuse
    // to replay a potentially mutating request after a routing failure.
    if (kind === 'tool/call' || kind === 'tool/result'
      || kind === 'tool/code-dispatch' || kind === 'tool/code-dispatch-start') {
      for (const waiter of this.waiters.values()) {
        if (waiter.sessionId === sessionId && Number(event.seq ?? 0) > waiter.baseline) {
          try { waiter.onEvent?.(kind, event) } catch (error) {
            this.logger.warn('[dsh-message] stream event consumer failed:', error?.message ?? error)
          }
        }
      }
    }

    if (kind === 'assistant/chunk' || kind === 'assistant/delta' || kind === 'message/chunk') {
      const chunk = event?.data?.chunk ?? event?.chunk ?? event?.data
      if (chunk?.type === 'tool-call-delta') {
        for (const waiter of this.waiters.values()) {
          if (waiter.sessionId === sessionId && Number(event.seq ?? 0) > waiter.baseline) {
            try { waiter.onEvent?.('tool-call-delta', event) } catch (error) {
              this.logger.warn('[dsh-message] stream event consumer failed:', error?.message ?? error)
            }
          }
        }
      }
      const delta = typeof chunk?.text === 'string' ? chunk.text : ''
      if (delta && (!chunk?.type || chunk.type === 'text-delta')) {
        state.text += delta
        for (const waiter of this.waiters.values()) {
          if (waiter.sessionId === sessionId && Number(event.seq ?? 0) > waiter.baseline) {
            try { waiter.onDelta?.(delta, state.text) } catch (error) {
              this.logger.warn('[dsh-message] stream consumer failed:', error?.message ?? error)
            }
          }
        }
      }
      return
    }
    if (kind === 'assistant/message' || kind === 'message/assistant') {
      const text = eventText(event)
      if (text) state.text = text
      return
    }
    if (kind !== 'turn/end' && kind !== 'turn/ended') return

    const seq = Number(event.seq ?? 0)
    const entries = [...this.waiters.entries()].filter(([, waiter]) => (
      waiter.sessionId === sessionId && (seq === 0 || seq > waiter.baseline)
    ))
    const reason = event?.data?.reason ?? event?.reason
    const failed = reason?.kind === 'error' || reason?.type === 'error' || reason?.error
    for (const [key, waiter] of entries) {
      this.waiters.delete(key)
      clearTimeout(waiter.timeout)
      clearTimeout(waiter.slowTimer)
      if (failed) waiter.reject(new Error(reason?.message || reason?.error?.message || reason?.error || 'DSH turn failed'))
      else waiter.resolve(state?.text || '')
    }
    this.turns.delete(sessionId)
  }

  _startStream() {}
  _stopStream() {}
  async _ensureSession() { throw new Error('Transport does not implement ensureSession') }
  async _prompt() { throw new Error('Transport does not implement prompt') }
  async _cancel() {}
  async _selectModel() { throw new Error('Transport does not implement selectModel') }
  async _respondQuestion() { throw new Error('Transport does not implement question responses') }
}

export { DEFAULT_TIMEOUT, DEFAULT_SLOW, eventText, unwrapResult, rpcError }
