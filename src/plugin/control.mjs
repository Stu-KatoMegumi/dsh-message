const API_PREFIX = '/_dsh/dsh-message/api'

function writeJson(response, status, data) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  })
  response.end(JSON.stringify(data))
}

function trustedBrowserRequest(request) {
  const host = request.headers?.host
  if (!host) return false
  let hostname
  try { hostname = new URL(`http://${host}`).hostname } catch { return false }
  const loopback = hostname === 'localhost' || hostname === '[::1]' || /^127(?:\.\d{1,3}){3}$/.test(hostname)
  if (!loopback || request.headers?.['sec-fetch-site'] === 'cross-site') return false
  const origin = request.headers?.origin
  if (!origin) return true
  try { return new URL(origin).host === host } catch { return false }
}

function readBody(request, limit = 64 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    request.on('data', chunk => {
      size += chunk.length
      if (size > limit) {
        reject(Object.assign(new Error('请求体过大'), { status: 413 }))
        request.destroy()
      } else chunks.push(chunk)
    })
    request.on('end', () => {
      if (size > limit) return
      try {
        const text = Buffer.concat(chunks).toString('utf8')
        resolve(text ? JSON.parse(text) : {})
      } catch {
        reject(Object.assign(new Error('JSON 格式无效'), { status: 400 }))
      }
    })
    request.on('error', reject)
  })
}

export function registerControlApi(webServer, engine, wechat) {
  return webServer.register({
    kind: 'prefix',
    path: API_PREFIX,
    handler: async (request, response) => {
      if (!trustedBrowserRequest(request)) return writeJson(response, 403, { ok: false, error: { message: 'forbidden' } })
      if (request.method !== 'POST') return writeJson(response, 405, { ok: false, error: { message: 'method not allowed' } })
      const pathname = new URL(request.url || '/', 'http://dsh.internal').pathname
      const method = pathname.startsWith(`${API_PREFIX}/`) ? pathname.slice(API_PREFIX.length + 1) : ''
      try {
        const body = await readBody(request)
        let value
        if (method === 'status') value = engine.status()
        else if (method === 'settings.update') value = engine.updateSettings(body?.patch)
        // open (default) so the server opens a dedicated scan app-window that
        // it can close automatically once the login/renewal scan succeeds. The
        // settings page must not open a second window of its own.
        else if (method === 'login.start') {
          await wechat.beginRenewal(null, { notify: false, open: true })
          value = { started: true, pending: true }
        }
        else if (method === 'errors') value = engine.store.readErrors(Math.min(100, Number(body?.limit || 20)))
        else if (method === 'prompt.list') value = engine.listPrompts()
        else if (method === 'prompt.save') value = engine.savePrompt(body?.name, body?.content)
        else if (method === 'prompt.reset') value = engine.resetPrompt(body?.name)
        else return writeJson(response, 404, { ok: false, error: { message: `unknown method: ${method}` } })
        return writeJson(response, 200, { ok: true, value })
      } catch (error) {
        return writeJson(response, error?.status || 400, { ok: false, error: { message: error?.message || String(error) } })
      }
    },
  })
}

export { API_PREFIX, trustedBrowserRequest }
