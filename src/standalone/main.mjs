import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { installTimestampLogging } from '../core/log.mjs'
import { loadEnvFile } from '../core/envfile.mjs'
import { WeChatClient } from '../core/wechat.mjs'
import { Store } from '../core/store.mjs'
import { Engine, modelConfig } from '../core/engine.mjs'
import { HttpTransport } from '../dsh/http.mjs'
import { defaultPromptDir, editablePromptDir } from '../core/prompt.mjs'

installTimestampLogging()

const dirname = path.dirname(fileURLToPath(import.meta.url))
const projectDir = path.resolve(dirname, '../..')
const sessionCwd = path.resolve(process.env.WX_BOT_CWD || projectDir)
const sessionDir = path.resolve(process.env.WX_BOT_SESSION_DIR || path.join(sessionCwd, 'session'))
// config/.env 仅服务独立模式：进程环境变量优先，.env 只补充缺失项
loadEnvFile(path.join(projectDir, 'config', '.env'))
const list = value => String(value || '').split(/[\s,;]+/).filter(Boolean)
const flag = (value, fallback = true) => value == null ? fallback : !['0', 'false', 'off'].includes(String(value).toLowerCase())
let version = '1.0.1'
try { version = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8')).version } catch { /* default */ }

const config = {
  dshBase: process.env.DSH_URL || 'http://127.0.0.1:3080',
  preset: process.env.WX_BOT_PRESET || 'standard',
  sessionCwd,
  workspaceTitle: process.env.WX_BOT_WORKSPACE_TITLE || '微信会话',
  enabled: flag(process.env.WX_BOT_ENABLED),
  streaming: flag(process.env.WX_BOT_STREAMING),
  typing: flag(process.env.WX_BOT_TYPING),
  mediaEnabled: flag(process.env.WX_BOT_MEDIA),
  renewalEnabled: flag(process.env.WX_BOT_RENEWAL),
  accessPolicy: process.env.WX_BOT_ACCESS_POLICY || 'pairing',
  allowlist: list(process.env.WX_BOT_ALLOWLIST),
  slowAckMs: Number(process.env.WX_BOT_SLOW_ACK_MS || 4000),
  turnTimeoutMs: Number(process.env.WX_BOT_TURN_TIMEOUT_MS || 15 * 60 * 1000),
  streamFlushChars: Number(process.env.WX_BOT_STREAM_FLUSH_CHARS || 800),
  streamFlushMs: Number(process.env.WX_BOT_STREAM_FLUSH_MS || 30000),
  outboxDir: path.resolve(process.env.WX_BOT_OUTBOX_DIR || path.join(sessionCwd, 'outbox')),
  ...modelConfig(),
}

const transport = new HttpTransport({
  base: config.dshBase,
  preset: config.preset,
  sessionCwd,
  workspaceTitle: config.workspaceTitle,
  timeoutMs: config.turnTimeoutMs,
  slowMs: config.slowAckMs,
})

let dshReady = false
try {
  await transport.probe({ timeoutMs: Number(process.env.DSH_STARTUP_CHECK_TIMEOUT_MS || 3000) })
  dshReady = true
} catch (error) {
  console.error(`[dsh-message] 未检测到可用的 DSH 服务：${config.dshBase}`)
  console.error('[dsh-message] 请先启动 DSH（在 DSH 目录执行：pnpm dsh web），然后再运行 npm start。')
  console.error(`[dsh-message] 检测失败：${error?.message ?? error}`)
  process.exitCode = 1
}

if (dshReady) {
  const store = new Store(sessionDir)
  const wechat = new WeChatClient({
    stateFile: store.botFile,
    mediaDir: path.join(sessionDir, 'media'),
    chunkSize: Number(process.env.WX_BOT_CHUNK_SIZE || 2000),
    sendIntervalMs: Number(process.env.WX_BOT_SEND_INTERVAL_MS || 200),
    pollTimeoutMs: Number(process.env.WX_BOT_POLL_TIMEOUT_MS || 8000),
    watchdogMs: Number(process.env.WX_BOT_WATCHDOG_MS || 90_000),
    version,
  })
  const engine = new Engine({
    wechat,
    store,
    transport,
    config,
    promptDir: editablePromptDir(sessionDir),
    defaultPromptDir: defaultPromptDir(projectDir),
  })

  console.log(`[dsh-message] v${version} 独立模式`)
  console.log(`[dsh-message] DSH=${config.dshBase} sessionDir=${sessionDir}`)
  engine.start()

  const shutdown = () => {
    console.log('[dsh-message] 正在停止…')
    engine.stop()
  }
  process.once('SIGINT', () => { shutdown(); process.exit(0) })
  process.once('SIGTERM', () => { shutdown(); process.exit(0) })
  process.on('unhandledRejection', error => {
    store.appendError('unhandledRejection', error)
    console.error('[dsh-message] 未处理异常:', error?.message ?? error)
  })
}
