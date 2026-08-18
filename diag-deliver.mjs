// 临时诊断：用 bot.json 的真实 token 发起一次带完整协议头的发送，验证能否真实投递
import fs from 'node:fs'

const state = JSON.parse(fs.readFileSync('./session/bot.json', 'utf8'))
const token = state.botToken
const baseUrl = state.baseUrl || 'https://ilinkai.weixin.qq.com'
const to = process.argv[2] || 'o9cq80wf8Z0p0u5O-NyIMkmscaZg@im.wechat'
const version = '1.0.0'
const clientVersion = ((1 & 0xff) << 16) | ((0 & 0xff) << 8) | (0 & 0xff)

function randomUin() {
  const uin = (Math.random() * 0xffffffff) >>> 0
  return Buffer.from(String(uin)).toString('base64')
}

async function ilink(pathname, body, timeoutMs = 20000) {
  const headers = {
    'content-type': 'application/json',
    'authorizationtype': 'ilink_bot_token',
    'x-wechat-uin': randomUin(),
    'iLink-App-Id': 'bot',
    'iLink-App-ClientVersion': String(clientVersion),
    authorization: `Bearer ${token}`,
  }
  const res = await fetch(baseUrl + pathname, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
  })
  const text = await res.text()
  console.log('HTTP', res.status, pathname)
  let json
  try { json = JSON.parse(text) } catch { json = { _raw: text.slice(0, 500) } }
  return json
}

console.log('=== 上线通知 notifyStart ===')
const ns = await ilink('/ilink/bot/msg/notifystart', { base_info: { channel_version: version, bot_agent: 'dsh-message' } })
console.log(JSON.stringify(ns))

console.log('\n=== sendmessage（完整协议头 + context_token 省略）===')
const send = await ilink('/ilink/bot/sendmessage', {
  msg: {
    from_user_id: '',
    to_user_id: to,
    client_id: 'diag-' + Date.now(),
    message_type: 2,
    message_state: 2,
    item_list: [{ type: 1, text_item: { text: '[投递测试] 如果你在微信看到这条，说明修复生效了' } }],
  },
  base_info: { channel_version: version, bot_agent: 'dsh-message' },
})
console.log(JSON.stringify(send, null, 2))
