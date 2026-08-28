/**
 * Single source of truth for "did the model channel fail, and is it safe to
 * replay this turn on the fallback provider?"
 *
 * Both the plugin host (`src/agent/service.mjs`) and the legacy standalone
 * engine (`src/core/engine.mjs`) used to keep their own copy of a message
 * regex. That regex was the only way to notice an outage, so any turn that
 * ended without text — `turn/end {kind:'completed'}` with an empty body — was
 * silently classified as "not a model failure" and the declared DeepSeek
 * fallback never activated. These helpers classify the structured DSH turn
 * facts instead, and keep the regex only as a last resort for adapters that
 * expose nothing else.
 */

/** `TurnEndReasonMap` keys published by DSH. */
export const TURN_END_KINDS = new Set(
  ['completed', 'aborted', 'blocked', 'error', 'max-tokens', 'interrupted'],
)

/** `session.selectModel`-level DSH codes: the route itself cannot serve. */
export const MODEL_ROUTE_CODES = new Set([
  'model-not-found',
  'provider-not-found',
  'provider-unavailable',
  'model-unavailable',
  'model-routing-failed',
  'llm-unavailable',
  'upstream-unavailable',
  'routing-failed',
])

/**
 * `LlmFailure.code` values where switching provider can genuinely recover.
 * `quota`/`auth`/`invalid_credential` are included on purpose: the failing
 * credential belongs to the self-hosted channel, so the official DeepSeek
 * fallback can still serve the user (recorded as `llm:<code>` for diagnosis).
 */
export const FAILOVER_LLM_CODES = new Set([
  'transport',
  'stream_closed',
  'timeout',
  'server',
  'provider_error',
  'rate_limit',
  'no_adapter',
  'unknown_model',
  'unsupported_reasoning_effort',
  'missing_credential',
  'quota',
  'auth',
  'invalid_credential',
])

/** Never a channel outage: user/session-side outcomes or request-level defects. */
export const NON_FAILOVER_CODES = new Set([
  'aborterror',
  'cancelled',
  'canceled',
  'aborted',
  'blocked',
  'interrupted',
  'max-tokens',
  'max_tokens',
  'invalid_request',
  'context_window_exceeded',
  'unsupported_option',
  'invariant',
  'session-not-found',
  'session-conflict',
  'workspace-session-stale',
  'deep-retry-side-effect',
  'deep-retry-loop',
])

const FAILOVER_STATUS = [408, 429, 500, 502, 503, 504]

/** Last-resort text match when the adapter carried no structured facts at all. */
const LEGACY_OUTAGE_PATTERN = /econnrefused|connection refused|connection reset|fetch failed|timed? ?out|gateway timeout|service unavailable|temporarily unavailable|network|provider|model .*not found|model .*unavailable|upstream|qwen|vllm/i

function normalizeToken(value) {
  return value === undefined || value === null ? '' : String(value).trim().toLowerCase()
}

function statusOf(error) {
  const status = Number(error?.status ?? error?.details?.status)
  return Number.isFinite(status) ? status : undefined
}

/** Turn whatever DSH published (`{kind, error}` or a legacy shape) into flat facts. */
export function describeTurnEnd(reason) {
  const source = reason && typeof reason === 'object' ? reason : null
  const failure = source?.error && typeof source.error === 'object' ? source.error : null
  const kindToken = normalizeToken(source?.kind ?? source?.type)
  const kind = TURN_END_KINDS.has(kindToken) ? kindToken : (kindToken || 'unknown')
  const llmCode = normalizeToken(failure?.code ?? source?.code) || undefined
  const status = Number.isFinite(Number(failure?.status ?? source?.status))
    ? Number(failure?.status ?? source?.status)
    : undefined
  const rawMessage = typeof failure?.message === 'string' ? failure.message
    : typeof source?.message === 'string' ? source.message
      : typeof source?.error === 'string' ? source.error : ''
  const message = rawMessage.replace(/\s+/g, ' ').trim().slice(0, 240)
  return { kind, llmCode, status, message }
}

/**
 * Build the error every DSH adapter throws when a turn cannot be delivered.
 * The message stays human-readable (it lands in `status.lastError`), while the
 * classification fields below are what the router actually reads.
 */
export function createTurnFailure({
  reason = null,
  emptyReply = false,
  sideEffectSeen = false,
  timeoutMs = 0,
  context = 'DSH',
} = {}) {
  const described = describeTurnEnd(reason)
  let message
  if (timeoutMs > 0) {
    message = `${context} 等待模型回复超时（${Math.max(1, Math.round(timeoutMs / 1000))} 秒）`
  } else if (described.kind === 'error' || described.llmCode) {
    const detail = [described.llmCode, described.status ? `HTTP ${described.status}` : '']
      .filter(Boolean).join(', ')
    message = `模型服务调用失败${detail ? `（${detail}）` : ''}${described.message ? `：${described.message}` : ''}`
  } else {
    message = `模型本轮没有返回内容（${context} 回合结束原因：${described.kind}）`
  }
  const error = new Error(message)
  error.name = 'ModelTurnFailure'
  error.turnEndKind = described.kind
  if (described.llmCode) error.llmCode = described.llmCode
  if (described.status !== undefined) error.status = described.status
  error.emptyReply = emptyReply === true
  error.sideEffectSeen = sideEffectSeen === true
  if (timeoutMs > 0) error.timeout = true
  error.code = described.llmCode ?? (error.timeout ? 'timeout' : (error.emptyReply ? 'model-empty-reply' : 'model-turn-failed'))
  return error
}

/**
 * Decide whether this turn may be replayed on the fallback channel.
 *
 * `failover: true` additionally requires (enforced by the callers) that the
 * same user message has not already switched once.
 */
export function classifyModelFailure(error, { hadSideEffect = false } = {}) {
  if (hadSideEffect || error?.sideEffectSeen === true) return { failover: false, reason: 'side-effect' }

  const kind = normalizeToken(error?.turnEndKind) || undefined
  const llmCode = normalizeToken(error?.llmCode) || undefined
  const code = normalizeToken(error?.code) || undefined
  const status = statusOf(error)
  const emptyReply = error?.emptyReply === true

  if (llmCode && NON_FAILOVER_CODES.has(llmCode)) return { failover: false, reason: `llm:${llmCode}` }
  if (code && NON_FAILOVER_CODES.has(code)) return { failover: false, reason: `code:${code}` }
  if (error?.timeout === true) return { failover: true, reason: 'timeout' }

  if (kind && kind !== 'error') {
    if (kind === 'completed') {
      // The model answered with an empty body (reasoning-only output, empty
      // content, provider returning nothing): the channel produced nothing,
      // so a single replay on the fallback is the declared recovery.
      return emptyReply ? { failover: true, reason: 'empty-reply' } : { failover: false, reason: 'turn-completed' }
    }
    return { failover: false, reason: `turn-${kind}` }
  }

  if (kind === 'error') {
    if (llmCode && FAILOVER_LLM_CODES.has(llmCode)) return { failover: true, reason: `llm:${llmCode}` }
    if (status !== undefined && FAILOVER_STATUS.includes(status)) return { failover: true, reason: `http:${status}` }
    // Unknown LlmFailure code: replay only when nothing was produced at all.
    if (emptyReply) return { failover: true, reason: `unknown-code:${llmCode || 'missing'}` }
    return { failover: false, reason: `llm-unclassified:${llmCode || 'missing'}` }
  }

  if (error?.modelRouteFailure === true) return { failover: true, reason: 'model-route-selection' }
  if (code && MODEL_ROUTE_CODES.has(code)) return { failover: true, reason: `code:${code}` }
  if (status !== undefined && FAILOVER_STATUS.includes(status)) return { failover: true, reason: `http:${status}` }
  if (emptyReply) return { failover: true, reason: 'empty-reply' }
  const message = String(error?.message ?? error ?? '')
  if (message && LEGACY_OUTAGE_PATTERN.test(message)) return { failover: true, reason: 'legacy-pattern' }
  return { failover: false, reason: 'unclassified' }
}

/** Compact, secret-free diagnostic record for the settings page and logs. */
export function failureRecord(error, { reason, route, sessionId = null, switched = false, at = null } = {}) {
  const status = statusOf(error)
  return {
    at: (at instanceof Date ? at : new Date(at ?? Date.now())).toISOString(),
    reason: String(reason ?? 'unclassified'),
    route: route === 'fallback' ? 'fallback' : 'primary',
    switched: switched === true,
    sessionId,
    turnEndKind: error?.turnEndKind ?? null,
    llmCode: error?.llmCode ?? error?.code ?? null,
    status: status === undefined ? null : status,
    emptyReply: error?.emptyReply === true,
    timeout: error?.timeout === true,
  }
}
