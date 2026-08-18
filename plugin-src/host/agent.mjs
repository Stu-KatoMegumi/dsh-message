import { resolveRpcAuthority } from './rpc-authority.mjs'

export const AGENT_RPC_CHANNEL = '/message-agent'
export const AGENT_ENDPOINTS = Object.freeze({
  status: 'agent.status',
  updateSettings: 'agent.settings.update',
  savePrompt: 'agent.prompt.save',
  resetPrompt: 'agent.prompt.reset',
})

function badRequest(message) {
  return { ok: false, error: { code: 'bad-request', message } }
}

export function createAgentRpcHandler(agent) {
  return async (endpoint, payload = {}, signal) => {
    if (signal?.aborted) return { ok: false, error: { code: 'cancelled', message: '请求已取消。' } }
    try {
      if (endpoint === AGENT_ENDPOINTS.status && Object.keys(payload).length === 0) {
        return { ok: true, value: agent.status() }
      }
      if (endpoint === AGENT_ENDPOINTS.updateSettings && payload?.settings && typeof payload.settings === 'object') {
        return { ok: true, value: agent.updateSettings(payload.settings) }
      }
      if (endpoint === AGENT_ENDPOINTS.savePrompt
        && typeof payload?.name === 'string' && typeof payload?.content === 'string') {
        return { ok: true, value: agent.savePrompt(payload.name, payload.content) }
      }
      if (endpoint === AGENT_ENDPOINTS.resetPrompt && typeof payload?.name === 'string') {
        return { ok: true, value: agent.resetPrompt(payload.name) }
      }
      return badRequest('未知或不完整的助手设置请求。')
    } catch (error) {
      return { ok: false, error: { code: 'agent-operation-failed', message: error?.message ?? '助手设置操作失败。' } }
    }
  }
}

export function installAgentRpc(ctx, agent, authority) {
  if (!ctx?.connection?.rpc || typeof ctx.connection.rpc.handle !== 'function') {
    throw new TypeError('DSH Host Connection RPC is required')
  }
  return ctx.connection.rpc.handle(
    AGENT_RPC_CHANNEL,
    createAgentRpcHandler(agent),
    { authority: resolveRpcAuthority(authority) },
  )
}
