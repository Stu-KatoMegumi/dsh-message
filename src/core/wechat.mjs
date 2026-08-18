import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
import QRCode from 'qrcode'
import { downloadInboundItem, uploadOutboundBuffer, uploadOutboundFile } from './media.mjs'
import { formatForWeChat, safeTextCut } from './format.mjs'

const ILINK_DEFAULT = 'https://ilinkai.weixin.qq.com'
const ILINK_APP_ID = 'bot'
const BOT_AGENT = 'dsh-message'
const DEFAULT_RENEW_AFTER_MS = 24 * 60 * 60 * 1000
const DEFAULT_RENEW_WARN_MS = 2 * 60 * 60 * 1000
const RENEW_NOTICE_INTERVAL_MS = 10 * 60 * 1000
const QR_CONTENT_MAX_CHARS = 4096
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function localTime(reference, hour, minute, dayOffset = 0) {
  return new Date(
    reference.getFullYear(),
    reference.getMonth(),
    reference.getDate() + dayOffset,
    hour,
    minute,
    0,
    0,
  ).getTime()
}

function isRenewalWorkTime(timestamp) {
  const date = new Date(timestamp)
  const hour = date.getHours()
  return (hour >= 8 && hour < 22) || (hour === 22 && date.getMinutes() === 0)
}

/** First reminder timestamp using the host machine's local calendar. */
export function firstRenewalNoticeAt(expiresAt, leadMs = DEFAULT_RENEW_WARN_MS) {
  const normal = new Date(Number(expiresAt) - leadMs)
  if (!Number.isFinite(normal.getTime())) return 0
  const minute = normal.getHours() * 60 + normal.getMinutes()
  if (minute < 8 * 60) return localTime(normal, 21, 30, -1)
  if (minute > 22 * 60) return localTime(normal, 21, 30)
  return normal.getTime()
}

/** Decide whether an automatic reminder is due now. */
export function renewalReminderDecision({
  expiresAt,
  now = Date.now(),
  lastAttemptAt = 0,
  emergencySentAt = 0,
  intervalMs = RENEW_NOTICE_INTERVAL_MS,
  leadMs = DEFAULT_RENEW_WARN_MS,
} = {}) {
  const expiry = Number(expiresAt)
  const current = Number(now)
  if (!Number.isFinite(expiry) || !Number.isFinite(current) || current >= expiry) return null
  if (current < firstRenewalNoticeAt(expiry, leadMs)) return null
  if (isRenewalWorkTime(current)) {
    return !lastAttemptAt || current - Number(lastAttemptAt) >= intervalMs ? 'regular' : null
  }
  if (!lastAttemptAt && !emergencySentAt) return 'emergency'
  return null
}

export async function renderQrPng(content) {
  const value = String(content || '').trim()
  if (!value) throw new Error('二维码内容为空')
  if (value.length > QR_CONTENT_MAX_CHARS) throw new Error('二维码内容过长')
  return QRCode.toBuffer(value, {
    type: 'png',
    width: 512,
    margin: 4,
    errorCorrectionLevel: 'H',
    color: { dark: '#000000', light: '#ffffff' },
  })
}

function formatLocalDateTime(timestamp) {
  const value = new Date(timestamp)
  const date = [value.getFullYear(), value.getMonth() + 1, value.getDate()]
    .map((part, index) => String(part).padStart(index === 0 ? 4 : 2, '0')).join('-')
  const time = [value.getHours(), value.getMinutes()].map(part => String(part).padStart(2, '0')).join(':')
  return `${date} ${time}`
}

function recipientList(value) {
  const values = Array.isArray(value) ? value : [value]
  return [...new Set(values.map(item => String(item || '').trim()).filter(Boolean))]
}

export class SessionExpiredError extends Error {
  constructor(message = '微信登录凭据已过期') {
    super(message)
    this.name = 'SessionExpiredError'
    this.code = 'ILINK_SESSION_EXPIRED'
  }
}

function buildClientVersion(version) {
  const [major = 0, minor = 0, patch = 0] = String(version).split('.').map(value => Number.parseInt(value, 10) || 0)
  return ((major & 0xff) << 16) | ((minor & 0xff) << 8) | (patch & 0xff)
}

function atomicJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const temporary = `${file}.tmp`
  fs.writeFileSync(temporary, JSON.stringify(value, null, 2) + '\n', { mode: 0o600 })
  fs.renameSync(temporary, file)
}

function openUrl(url) {
  try {
    if (process.platform === 'win32') {
      spawn('rundll32.exe', ['url.dll,FileProtocolHandler', url], { stdio: 'ignore', detached: true, windowsHide: true }).unref()
    } else if (process.platform === 'darwin') {
      spawn('open', [url], { stdio: 'ignore', detached: true }).unref()
    } else {
      spawn('xdg-open', [url], { stdio: 'ignore', detached: true }).unref()
    }
    return true
  } catch {
    return false
  }
}

const EDGE_PATHS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
].filter(Boolean)

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
].filter(Boolean)

export function openScanWindow(qrUrl) {
  const candidates = [process.env.WX_BOT_BROWSER, ...EDGE_PATHS, ...CHROME_PATHS].filter(Boolean)
  for (const browser of candidates) {
    if (!fs.existsSync(browser)) continue
    let profile = ''
    try {
      profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-message-login-'))
      const child = spawn(browser, [
        `--app=${qrUrl}`,
        `--user-data-dir=${profile}`,
        '--no-first-run',
        '--no-default-browser-check',
      ], { stdio: 'ignore', windowsHide: true })
      let closed = false
      const close = () => {
        if (closed) return
        closed = true
        try { child.kill() } catch { /* already closed */ }
        setTimeout(() => {
          try { fs.rmSync(profile, { recursive: true, force: true }) } catch { /* locked browser files */ }
        }, 2000)
      }
      child.on('error', close)
      child.on('exit', close)
      return { close, browser }
    } catch {
      try { if (profile) fs.rmSync(profile, { recursive: true, force: true }) } catch { /* ignore */ }
    }
  }
  return null
}

/** Tencent iLink/ClawBot protocol client with reconnect and renewal supervision. */
export class WeChatClient {
  constructor({
    stateFile,
    mediaDir = path.join(path.dirname(stateFile), 'media'),
    chunkSize = 2000,
    sendIntervalMs = 200,
    pollTimeoutMs = 8000,
    watchdogMs = 90_000,
    renewAfterMs = DEFAULT_RENEW_AFTER_MS,
    renewWarnBeforeMs = DEFAULT_RENEW_WARN_MS,
    version = '1.0.0',
    fetchImpl = globalThis.fetch,
    qrEncoder = renderQrPng,
    now = () => Date.now(),
    log = console.log,
    warn = console.warn,
    error = console.error,
  }) {
    this.stateFile = stateFile
    this.mediaDir = mediaDir
    this.chunkSize = Math.max(200, chunkSize)
    this.sendIntervalMs = Math.max(0, Number(sendIntervalMs) || 0)
    this.pollTimeoutMs = pollTimeoutMs
    this.watchdogMs = watchdogMs
    this.renewAfterMs = renewAfterMs
    this.renewWarnBeforeMs = renewWarnBeforeMs
    this.version = version
    this.fetch = fetchImpl
    this.qrEncoder = qrEncoder
    this.now = now
    this.log = log
    this.warn = warn
    this.error = error
    this.clientVersion = buildClientVersion(version)
    this.state = this.#loadState()
    this.token = this.state.botToken || ''
    this.baseUrl = this.state.baseUrl || ILINK_DEFAULT
    this.credentialEpoch = 0
    this.nextPollTimeoutMs = pollTimeoutMs
    this.stopped = false
    this.notified = false
    this.scanClose = null
    this.renewal = null
    this.feedbackFlush = null
    this.feedbackFlushTarget = null
    this.feedbackDelivery = null
    this.typingTickets = new Map()
    this.lastPollAt = 0
    this.lastSuccessAt = 0
    this.lastError = null
    this.lastSendAt = 0
  }

  #loadState() {
    try { return JSON.parse(fs.readFileSync(this.stateFile, 'utf8')) } catch { return {} }
  }

  #saveState() {
    atomicJson(this.stateFile, this.state)
  }

  #randomUin() {
    return Buffer.from(String((Math.random() * 0xffffffff) >>> 0)).toString('base64')
  }

  #authSnapshot() {
    return { token: this.token, baseUrl: this.baseUrl, epoch: this.credentialEpoch }
  }

  async #ilink(pathname, body, { timeoutMs, auth = this.#authSnapshot() } = {}) {
    const response = await this.fetch(auth.baseUrl + pathname, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorizationtype: 'ilink_bot_token',
        authorization: `Bearer ${auth.token}`,
        'x-wechat-uin': this.#randomUin(),
        'iLink-App-Id': ILINK_APP_ID,
        'iLink-App-ClientVersion': String(this.clientVersion),
      },
      body: JSON.stringify({ ...body, base_info: { channel_version: this.version, bot_agent: BOT_AGENT } }),
      signal: AbortSignal.timeout(timeoutMs ?? Math.max(this.nextPollTimeoutMs + 15_000, 70_000)),
    })
    const value = await response.json().catch(() => ({ ret: -1, message: `HTTP ${response.status}` }))
    const code = value?.errcode ?? value?.ret
    if (code === -14) {
      // A long poll started with the previous token may finish after renewal.
      // Never let that stale response invalidate credentials accepted later.
      const staleCredentials = auth.epoch !== this.credentialEpoch || auth.token !== this.token
      const renewalTransition = Boolean(
        !staleCredentials
        && this.renewal
        && this.renewal.auth?.token === auth.token
        && !this.renewal.failed,
      )
      if (!staleCredentials && !renewalTransition) this.invalidateCredentials()
      const error = new SessionExpiredError()
      error.staleCredentials = staleCredentials
      error.renewalTransition = renewalTransition
      throw error
    }
    if (!response.ok || (typeof value?.ret === 'number' && value.ret !== 0)) {
      const error = new Error(value?.errmsg || value?.message || `iLink HTTP ${response.status}`)
      error.code = code
      throw error
    }
    return value
  }

  status() {
    const loginAt = Number(this.state.loginAt || 0)
    return {
      connected: Boolean(this.token),
      loginAt: loginAt || null,
      expiresAt: loginAt ? loginAt + this.renewAfterMs : null,
      renewalPending: Boolean(this.renewal),
      lastPollAt: this.lastPollAt || null,
      lastSuccessAt: this.lastSuccessAt || null,
      lastError: this.lastError?.message || null,
    }
  }

  invalidateCredentials() {
    this.credentialEpoch += 1
    this.token = ''
    this.notified = false
    delete this.state.botToken
    delete this.state.loginAt
    delete this.state.updatesBuf
    delete this.state.renewalNotice
    this.#saveState()
  }

  async notifyStart({ timeoutMs } = {}) {
    const auth = this.#authSnapshot()
    await this.#ilink('/ilink/bot/msg/notifystart', {}, { timeoutMs, auth })
    if (auth.epoch === this.credentialEpoch) this.notified = true
  }

  async notifyStop() {
    if (!this.token) return
    try { await this.#ilink('/ilink/bot/msg/notifystop', {}, { timeoutMs: 10_000 }) } catch { /* best effort */ }
  }

  async #newQrCode() {
    const response = await this.fetch(`${ILINK_DEFAULT}/ilink/bot/get_bot_qrcode?bot_type=3`, {
      signal: AbortSignal.timeout(20_000),
    })
    const qr = await response.json()
    if (!response.ok || qr.ret !== 0 || !qr.qrcode) throw new Error(`获取登录二维码失败：${qr.message || qr.ret}`)
    const url = String(qr.qrcode_img_content || qr.url || '').trim()
    if (!url) throw new Error('获取登录二维码失败：缺少二维码内容')
    return { ticket: qr.qrcode, url }
  }

  async #pollQr(qr, signal, onScanned = null) {
    let scannedHandled = false
    while (!signal.aborted && !this.stopped) {
      try {
        const response = await this.fetch(`${ILINK_DEFAULT}/ilink/bot/get_qrcode_status?qrcode=${encodeURIComponent(qr.ticket)}`, {
          signal: AbortSignal.any([signal, AbortSignal.timeout(45_000)]),
        })
        const value = await response.json()
        if (value.status === 'confirmed') return value
        if (value.status === 'scaned' && !scannedHandled) {
          scannedHandled = true
          await onScanned?.()
          continue
        }
        if (value.status === 'expired' || value.status === 'cancelled') throw new Error('二维码已失效')
      } catch (error) {
        if (signal.aborted || this.stopped || error?.message === '二维码已失效') throw error
        this.warn('[wechat] 查询扫码状态失败，将继续重试:', error.message)
      }
      await sleep(1000)
    }
    throw signal.reason || new Error('登录已停止')
  }

  #persistQr(url) {
    fs.mkdirSync(path.dirname(this.stateFile), { recursive: true })
    fs.writeFileSync(path.join(path.dirname(this.stateFile), 'qrcode.txt'), `${url}\n`, 'utf8')
  }

  #stageCredentials(value) {
    const credentials = {
      token: String(value.bot_token || ''),
      baseUrl: value.baseurl || ILINK_DEFAULT,
    }
    if (!credentials.token) throw new Error('续签确认响应缺少 bot token')
    this.credentialEpoch += 1
    this.state.botToken = credentials.token
    this.state.baseUrl = credentials.baseUrl
    this.state.loginAt = this.now()
    delete this.state.updatesBuf
    delete this.state.renewalNotice
    this.#saveState()
    this.notified = false
    return credentials
  }

  #activateCredentials(credentials) {
    this.token = credentials.token
    this.baseUrl = credentials.baseUrl
  }

  #acceptCredentials(value) {
    const credentials = this.#stageCredentials(value)
    this.#activateCredentials(credentials)
  }

  async ensureLogin() {
    if (this.token) {
      if (!this.state.loginAt) {
        this.state.loginAt = this.now()
        this.#saveState()
      }
      return false
    }
    const qr = await this.#newQrCode()
    this.#persistQr(qr.url)
    this.log(`[wechat] 请扫码登录：${qr.url}`)
    const scan = openScanWindow(qr.url)
    this.scanClose = scan?.close || null
    if (!scan) openUrl(qr.url)
    const controller = new AbortController()
    try {
      const value = await this.#pollQr(qr, controller.signal)
      this.#acceptCredentials(value)
      this.log('[wechat] 登录成功')
      return true
    } finally {
      controller.abort()
      this.#closeScan()
    }
  }

  #openRenewalWindow(record) {
    if (record.scanClose) return
    const scan = openScanWindow(record.url)
    record.scanClose = scan?.close || null
    if (!scan) openUrl(record.url)
  }

  #closeRenewalWindow(record) {
    if (typeof record?.scanClose === 'function') {
      try { record.scanClose() } catch { /* window already gone */ }
    }
    if (record) record.scanClose = null
  }

  #queueRenewalFeedback(type, recipients, delivery = null) {
    const values = recipientList(recipients)
    if (!values.length) return
    this.state.renewalFeedback = {
      type,
      recipients: values,
      createdAt: this.now(),
      ...(delivery?.waitForFreshContext ? { waitForFreshContext: true } : {}),
    }
    this.feedbackDelivery = delivery ? { feedback: this.state.renewalFeedback, ...delivery } : null
    this.#saveState()
  }

  async #flushRenewalFeedback() {
    const requested = this.state.renewalFeedback
    if (this.feedbackFlush) {
      const activeTarget = this.feedbackFlushTarget
      await this.feedbackFlush
      if (requested && requested !== activeTarget && this.state.renewalFeedback === requested) {
        return this.#flushRenewalFeedback()
      }
      return
    }
    this.feedbackFlushTarget = requested
    this.feedbackFlush = (async () => {
      const feedback = this.state.renewalFeedback
      if (!feedback?.recipients?.length) return
      const text = feedback.type === 'success'
        ? '✅ 微信登录续期成功，连接已更新。'
        : '❌ 微信续签二维码已超时或失效，请重新发送 /renew 获取新二维码。'
      const remaining = []
      const delivery = this.feedbackDelivery?.feedback === feedback ? this.feedbackDelivery : null
      const waitForFreshContext = Boolean(delivery?.waitForFreshContext || feedback.waitForFreshContext || feedback.active)
      for (const recipient of feedback.recipients) {
        const contextToken = delivery?.contextTokens?.get(recipient) || this.state.contextTokens?.[recipient] || ''
        const contextUpdatedAt = Number(this.state.contextTokenUpdatedAt?.[recipient] || 0)
        if (!contextToken || (waitForFreshContext && contextUpdatedAt <= Number(feedback.createdAt || 0))) {
          remaining.push(recipient)
          continue
        }
        try {
          await this.sendText(recipient, contextToken, text, { auth: delivery?.auth })
          this.log(`[wechat] 续签${feedback.type === 'success' ? '成功' : '失败'}提示请求已被微信接口接受${waitForFreshContext ? '（使用最新入站 context）' : ''}`)
        } catch (error) {
          remaining.push(recipient)
          this.warn(`[wechat] 续签${feedback.type === 'success' ? '成功' : '失败'}提示发送失败:`, error.message)
        }
      }
      if (this.state.renewalFeedback !== feedback) return
      if (remaining.length) feedback.recipients = remaining
      else delete this.state.renewalFeedback
      if (this.feedbackDelivery?.feedback === feedback) this.feedbackDelivery = null
      this.#saveState()
    })()
    try {
      await this.feedbackFlush
    } finally {
      this.feedbackFlush = null
      this.feedbackFlushTarget = null
    }
  }

  async #deliverRenewal(record, recipient) {
    const contextToken = this.state.contextTokens?.[recipient] || ''
    if (!recipient || !contextToken || !this.token) return { delivered: false, mode: 'unavailable' }
    const expiresAt = Number(this.state.loginAt || 0) + this.renewAfterMs
    const instruction = [
      `🔐 当前微信连接预计于 ${formatLocalDateTime(expiresAt)} 到期。`,
      '为避免夜间断连，请现在完成续签。请使用另一台设备展示下方二维码，再打开需要续签的手机微信“扫一扫”，用摄像头扫码并确认授权。',
      '请勿在当前微信聊天中长按识别，该方式无法完成续签。',
    ].join('\n')
    await this.sendText(recipient, contextToken, instruction).catch(error => {
      this.warn('[wechat] 续签说明发送失败:', error.message)
    })
    try {
      if (!record.pngBuffer) throw new Error('二维码图片不可用')
      await this.sendImageBuffer(recipient, contextToken, record.pngBuffer, 'dsh-message-renewal.png')
      record.recipients.add(recipient)
      record.contextTokens.set(recipient, contextToken)
      return { delivered: true, mode: 'image' }
    } catch (error) {
      this.warn('[wechat] 续签二维码图片发送失败，将发送电脑端链接:', error.message)
      await this.sendText(recipient, contextToken, [
        '二维码发送失败，请在电脑端完成微信续签！',
        record.url,
      ].join('\n'))
      record.recipients.add(recipient)
      record.contextTokens.set(recipient, contextToken)
      return { delivered: true, mode: 'link' }
    }
  }

  async #notifyRenewalScanned(record) {
    if (record.scannedNotified) return
    record.scannedNotified = true
    while ([...record.expectedRecipients].some(recipient => !record.deliverySettled.has(recipient))) {
      if (this.renewal !== record || record.confirmed || record.failed) return
      await sleep(10)
    }
    for (const recipient of record.recipients) {
      const contextToken = record.contextTokens.get(recipient) || ''
      if (!contextToken) continue
      try {
        await this.sendText(recipient, contextToken, [
          '👀 已检测到扫码，请在手机上确认授权。确认后微信续签会自动生效。',
          '确认完成后，程序会立即发送续签结果。',
        ].join('\n'), { auth: record.auth })
        this.log('[wechat] 续签扫码确认提示请求已被微信接口接受')
      } catch (error) {
        this.warn('[wechat] 续签扫码确认提示发送失败:', error.message)
      }
    }
  }

  async #sendRenewalSuccessFromNewConnection(recipient, contextToken) {
    try {
      await this.#ilink('/ilink/bot/getconfig', {
        ilink_user_id: recipient,
        context_token: contextToken || '',
      }, { timeoutMs: 10_000 })
    } catch (error) {
      this.warn('[wechat] 新连接用户路由预热失败，仍将尝试主动发送续签结果:', error.message)
    }
    await this.sendText(recipient, contextToken, '✅ 微信登录续期成功，连接已更新。')
    this.log('[wechat] 续签成功主动消息请求已通过新连接提交')
  }

  #startRenewalPolling(record) {
    void this.#pollQr(record, record.controller.signal, () => this.#notifyRenewalScanned(record)).then(async (value) => {
      if (this.renewal !== record) {
        record.resolveSettled()
        return
      }
      record.confirmed = true
      await Promise.allSettled([...record.deliveries])
      this.#closeRenewalWindow(record)
      const recipients = [...record.recipients]
      record.pngBuffer = null
      const credentials = this.#stageCredentials(value)
      const pendingRecipients = []
      try {
        for (const recipient of recipients) {
          const contextToken = record.contextTokens.get(recipient) || ''
          if (!contextToken) {
            pendingRecipients.push(recipient)
            continue
          }
          try {
            await this.sendText(recipient, contextToken, '✅ 微信登录续期成功，连接已更新。', { auth: record.auth })
            this.log('[wechat] 续签成功提示已在新连接上线前提交给旧会话')
          } catch (error) {
            pendingRecipients.push(recipient)
            this.warn('[wechat] 续签成功提示无法通过旧会话即时发送，将尝试新连接主动发送:', error.message)
          }
        }
      } finally {
        this.#activateCredentials(credentials)
      }
      try {
        await this.notifyStart({ timeoutMs: 10_000 })
      } catch (error) {
        this.warn('[wechat] 新续签连接初始化失败，仍将尝试主动发送续签结果:', error.message)
      }
      for (const recipient of pendingRecipients) {
        const contextToken = record.contextTokens.get(recipient) || ''
        const target = pendingRecipients.length === 1 && value.ilink_user_id
          ? String(value.ilink_user_id)
          : recipient
        try {
          await this.#sendRenewalSuccessFromNewConnection(target, contextToken)
        } catch (error) {
          this.warn('[wechat] 续签成功主动消息发送失败:', error.message)
        }
      }
      this.renewal = null
      record.resolveSettled()
    }).catch((error) => {
      if (this.renewal !== record) {
        record.resolveSettled()
        return
      }
      record.failed = true
      void Promise.allSettled([...record.deliveries]).then(async () => {
        if (this.renewal !== record) return
        const recipients = [...record.recipients]
        this.#closeRenewalWindow(record)
        record.pngBuffer = null
        this.renewal = null
        if (!record.controller.signal.aborted && !this.stopped) {
          this.warn('[wechat] 续期未完成:', error.message)
          this.#queueRenewalFeedback('failure', recipients, {
            auth: record.auth,
            contextTokens: record.contextTokens,
          })
          await this.#flushRenewalFeedback()
        }
        record.resolveSettled()
      }).catch(feedbackError => {
        this.warn('[wechat] 续签失败反馈处理异常:', feedbackError.message)
        record.resolveSettled()
      })
    })
  }

  /** Start or reuse a parallel QR renewal while the old token remains usable. */
  async beginRenewal(recipient, { notify = true, open = true } = {}) {
    const recipients = recipientList(recipient)
    let record = this.renewal
    if (!record) {
      const qr = await this.#newQrCode()
      let pngBuffer = null
      try {
        pngBuffer = await this.qrEncoder(qr.url)
      } catch (error) {
        this.warn('[wechat] 本地生成续签二维码失败，将使用电脑端链接:', error.message)
      }
      let resolveSettled
      const settled = new Promise(resolve => { resolveSettled = resolve })
      record = {
        ...qr,
        auth: this.#authSnapshot(),
        pngBuffer,
        controller: new AbortController(),
        startedAt: this.now(),
        scanClose: null,
        recipients: new Set(),
        contextTokens: new Map(),
        deliveries: new Set(),
        expectedRecipients: new Set(notify ? recipients : []),
        deliverySettled: new Set(),
        scannedNotified: false,
        confirmed: false,
        failed: false,
        settled,
        resolveSettled,
      }
      this.renewal = record
      this.#startRenewalPolling(record)
    }
    if (notify) for (const userId of recipients) record.expectedRecipients.add(userId)
    if (!recipients.length && open) this.#openRenewalWindow(record)
    if (!notify || !recipients.length) {
      return { pending: true, delivered: false, mode: open ? 'window' : 'pending' }
    }
    if (record.confirmed || record.failed) return { pending: false, delivered: false, mode: record.confirmed ? 'confirmed' : 'failed' }
    const deliveries = []
    let firstError = null
    for (const userId of recipients) {
      if (record.confirmed || record.failed) break
      let task
      try {
        task = this.#deliverRenewal(record, userId)
        record.deliveries.add(task)
        deliveries.push({ recipient: userId, ...await task })
      } catch (error) {
        firstError ||= error
        deliveries.push({ recipient: userId, delivered: false, mode: 'failed' })
        this.warn(`[wechat] 向用户 ${userId} 发送续签二维码失败:`, error.message)
      } finally {
        if (task) record.deliveries.delete(task)
        record.deliverySettled.add(userId)
      }
    }
    const delivered = deliveries.some(item => item.delivered)
    if (!delivered && firstError) throw firstError
    if (deliveries.length === 1) return { pending: true, ...deliveries[0] }
    return { pending: true, delivered, mode: 'multiple', deliveries }
  }

  async checkRenewal(recipient) {
    if (!this.token) return null
    const loginAt = Number(this.state.loginAt || 0)
    if (!loginAt) return null
    const expiresAt = loginAt + this.renewAfterMs
    const now = this.now()
    const saved = Number(this.state.renewalNotice?.expiresAt) === expiresAt
      ? this.state.renewalNotice
      : { recipients: {} }
    const recipients = recipientList(recipient)
    const due = []
    const notices = { ...(saved.recipients || {}) }
    for (const userId of recipients) {
      const userNotice = notices[userId] || {}
      const decision = renewalReminderDecision({
        expiresAt,
        now,
        lastAttemptAt: userNotice.lastAttemptAt,
        emergencySentAt: userNotice.emergencySentAt,
        leadMs: this.renewWarnBeforeMs,
      })
      if (!decision) continue
      due.push(userId)
      notices[userId] = {
        ...userNotice,
        lastAttemptAt: now,
        ...(decision === 'emergency' ? { emergencySentAt: now } : {}),
      }
    }
    if (!due.length) return null
    this.state.renewalNotice = { expiresAt, recipients: notices }
    this.#saveState()
    return this.beginRenewal(due, { notify: true, open: false })
  }

  #closeScan() {
    try { this.scanClose?.() } catch { /* ignore */ }
    this.scanClose = null
  }

  async pollOnce() {
    const epoch = this.credentialEpoch
    const value = await this.#ilink('/ilink/bot/getupdates', { get_updates_buf: this.state.updatesBuf || '' })
    if (epoch !== this.credentialEpoch) return []
    this.lastPollAt = Date.now()
    this.lastSuccessAt = this.lastPollAt
    this.lastError = null
    if (Number(value.longpolling_timeout_ms) > 0) this.nextPollTimeoutMs = Number(value.longpolling_timeout_ms)
    if (value.get_updates_buf) {
      this.state.updatesBuf = value.get_updates_buf
      this.#saveState()
    }
    return value.msgs || []
  }

  async startPolling(handler) {
    let backoff = 1000
    while (!this.stopped) {
      try {
        if (!this.token) await this.ensureLogin()
        if (!this.notified) await this.notifyStart()
        await this.#flushRenewalFeedback()
        const startedAt = Date.now()
        const messages = await this.pollOnce()
        if (Date.now() - startedAt > this.watchdogMs) this.warn('[wechat] 长轮询响应过慢，已进入下一轮监听')
        for (const message of messages) {
          if (this.stopped) return
          void Promise.resolve(handler(message)).catch(error => this.error('[wechat] 消息处理失败:', error.message))
        }
        backoff = 1000
      } catch (error) {
        if (this.stopped) return
        if (error?.renewalTransition) {
          const renewal = this.renewal
          if (renewal) await renewal.settled
          backoff = 1000
          continue
        }
        if (error?.staleCredentials) {
          backoff = 1000
          continue
        }
        this.lastError = error
        this.notified = false
        this.warn(`[wechat] 连接异常，${Math.ceil(backoff / 1000)} 秒后重试：${error.message}`)
        await sleep(backoff)
        backoff = Math.min(30_000, backoff * 2)
      }
    }
  }

  async rememberContext(userId, contextToken) {
    if (!contextToken) return
    this.state.contextTokens ||= {}
    this.state.contextTokenUpdatedAt ||= {}
    this.state.contextTokens[userId] = contextToken
    this.state.contextTokenUpdatedAt[userId] = this.now()
    this.#saveState()
  }

  async sendItems(to, contextToken, itemList, { auth } = {}) {
    const body = {
      msg: {
        from_user_id: '',
        to_user_id: to,
        client_id: `dsh-message-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
        message_type: 2,
        message_state: 2,
        context_token: contextToken || undefined,
        item_list: itemList,
      },
    }
    // 节流：控制两次 sendmessage 的最小间隔，降低微信 iLink 限流（prepare failed）概率。
    const wait = this.lastSendAt + this.sendIntervalMs - Date.now()
    if (wait > 0) await sleep(wait)
    this.lastSendAt = Date.now()
    let attempt = 0
    for (;;) {
      try {
        return await this.#ilink('/ilink/bot/sendmessage', body, { auth })
      } catch (error) {
        // 登录过期不重试；其余错误退避重试，最多 3 次，避免偶发限流丢失整条气泡。
        if (error instanceof SessionExpiredError || ++attempt >= 3) throw error
        await sleep(250 * attempt)
      }
    }
  }

  async sendText(to, contextToken, text, { format = true, auth } = {}) {
    const normalized = format ? formatForWeChat(text) : String(text || '')
    if (!normalized) return []
    let remaining = normalized
    const responses = []
    while (remaining) {
      const cut = safeTextCut(remaining, this.chunkSize)
      const part = remaining.slice(0, cut).trim()
      remaining = remaining.slice(cut).trimStart()
      if (part) responses.push(await this.sendItems(to, contextToken, [{ type: 1, text_item: { text: part } }], { auth }))
    }
    return responses
  }

  async setTyping(userId, contextToken, active) {
    try {
      let ticket = this.typingTickets.get(userId)?.ticket
      if (!ticket) {
        const config = await this.#ilink('/ilink/bot/getconfig', {
          ilink_user_id: userId,
          context_token: contextToken || '',
        }, { timeoutMs: 15_000 })
        ticket = config.typing_ticket
        if (ticket) this.typingTickets.set(userId, { ticket, at: Date.now() })
      }
      if (!ticket) return
      await this.#ilink('/ilink/bot/sendtyping', {
        ilink_user_id: userId,
        typing_ticket: ticket,
        status: active ? 1 : 2,
      }, { timeoutMs: 15_000 })
    } catch (error) {
      this.typingTickets.delete(userId)
      this.warn('[wechat] typing 状态发送失败:', error.message)
    }
  }

  async getUploadUrl(parameters) {
    const value = await this.#ilink('/ilink/bot/getuploadurl', {
      filekey: parameters.filekey,
      media_type: parameters.mediaType,
      to_user_id: parameters.toUserId,
      rawsize: parameters.rawsize,
      rawfilemd5: parameters.rawfilemd5,
      filesize: parameters.filesize,
      no_need_thumb: true,
      aeskey: parameters.aeskeyHex,
    }, { timeoutMs: 30_000 })
    return { uploadFullUrl: value.upload_full_url || '', uploadParam: value.upload_param || '' }
  }

  async sendFile(to, contextToken, filePath, caption = '') {
    const item = await uploadOutboundFile(this, filePath, to)
    if (caption) await this.sendText(to, contextToken, caption)
    await this.sendItems(to, contextToken, [item])
  }

  async sendImageBuffer(to, contextToken, buffer, fileName = 'image.png') {
    const item = await uploadOutboundBuffer(this, buffer, to, { fileName, fetchImpl: this.fetch })
    await this.sendItems(to, contextToken, [item])
  }

  async downloadMedia(message, userKey) {
    const saveDir = path.join(this.mediaDir, String(userKey).replace(/[^a-zA-Z0-9_-]/g, '_'))
    const results = []
    for (const item of message.item_list || []) {
      try {
        const result = await downloadInboundItem(item, saveDir)
        if (result) results.push(result)
      } catch (error) {
        this.warn('[wechat] 媒体下载失败:', error.message)
      }
    }
    return results
  }

  stop() {
    this.stopped = true
    this.#closeScan()
    const renewal = this.renewal
    this.#closeRenewalWindow(renewal)
    renewal?.controller.abort()
    if (renewal) {
      renewal.pngBuffer = null
      renewal.resolveSettled()
    }
    this.renewal = null
    void this.notifyStop()
  }
}

export function formatQuestions(questions) {
  const lines = (questions || []).map((question, index) => {
    let line = `${index + 1}. ${question.question}`
    if (question.detail) line += `\n　${question.detail}`
    if (question.options?.length) line += `\n　可选：${question.options.map(option => option.label).join(' / ')}`
    return line
  })
  return `📋 DSH 需要你回答：\n${lines.join('\n')}\n\n请直接回复答案。`
}
