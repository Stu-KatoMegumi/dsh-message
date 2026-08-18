import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import z from '@deepseek-ai/schemastery'
import { createLogger } from '../core/log.mjs'
import { WeChatClient } from '../core/wechat.mjs'
import { Store } from '../core/store.mjs'
import { Engine, modelConfig } from '../core/engine.mjs'
import { InprocTransport } from '../dsh/inproc.mjs'
import { registerControlApi } from './control.mjs'
import { defaultPromptDir, editablePromptDir } from '../core/prompt.mjs'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const projectDir = path.resolve(dirname, '../..')
let pluginVersion = '1.0.1'
try { pluginVersion = JSON.parse(fs.readFileSync(path.join(projectDir, 'version.json'), 'utf8')).version } catch { /* default */ }

export const name = 'dsh-message'
export const inject = ['apiProxy', 'webServer']

const jobSchema = z.object({
  id: z.string().default(''),
  cron: z.string().default('0 9 * * *'),
  userId: z.string().default(''),
  prompt: z.string().default(''),
  enabled: z.boolean().default(true),
})

export const Config = z.object({
  enabled: z.boolean().default(true),
  sessionDir: z.string().default(''),
  sessionCwd: z.string().default(''),
  workspaceTitle: z.string().default('微信会话'),
  preset: z.string().default('standard'),
  accessPolicy: z.union(['pairing', 'allowlist', 'disabled']).default('pairing'),
  allowlist: z.array(z.string()).default([]),
  streaming: z.boolean().default(true),
  typing: z.boolean().default(true),
  mediaEnabled: z.boolean().default(true),
  renewalEnabled: z.boolean().default(true),
  slowAckMs: z.number().default(4000),
  turnTimeoutMs: z.number().default(15 * 60 * 1000),
  streamFlushChars: z.number().default(800),
  streamFlushMs: z.number().default(30000),
  chunkSize: z.number().default(2000),
  pollTimeoutMs: z.number().default(8000),
  watchdogMs: z.number().default(90_000),
  renewAfterMs: z.number().default(24 * 60 * 60 * 1000),
  renewWarnBeforeMs: z.number().default(2 * 60 * 60 * 1000),
  outboxDir: z.string().default(''),
  jobs: z.array(jobSchema).default([]),
})

export function apply(ctx, config = {}) {
  const dshHome = process.env.DSH_HOME || path.join(os.homedir(), '.dsh')
  const sessionCwd = path.resolve(config.sessionCwd || process.env.WX_BOT_CWD || process.cwd())
  const sessionDir = path.resolve(
    config.sessionDir || process.env.WX_BOT_SESSION_DIR || path.join(dshHome, 'channels', 'dsh-message'),
  )
  const preset = config.preset || process.env.WX_BOT_PRESET || 'standard'
  // 插件模式与 DSH 共享同一个进程，绝不能覆盖 DSH 的全局 console（否则会连 DSH
  // 自己的 `dsh web: http://...` 启动横幅一起吞掉）。这里给插件自己的组件注入一个
  // 静默 logger，只对插件自身输出生效；需要排查时请改用独立模式 `npm start`。
  const silent = createLogger(false)
  const engineConfig = {
    ...config,
    sessionCwd,
    outboxDir: path.resolve(config.outboxDir || path.join(sessionCwd, 'outbox')),
    slowAckMs: config.slowAckMs ?? Number(process.env.WX_BOT_SLOW_ACK_MS || 4000),
    turnTimeoutMs: config.turnTimeoutMs ?? Number(process.env.WX_BOT_TURN_TIMEOUT_MS || 15 * 60 * 1000),
    ...modelConfig(),
  }
  const store = new Store(sessionDir)
  const wechat = new WeChatClient({
    stateFile: store.botFile,
    mediaDir: path.join(sessionDir, 'media'),
    chunkSize: config.chunkSize ?? Number(process.env.WX_BOT_CHUNK_SIZE || 2000),
    sendIntervalMs: Number(process.env.WX_BOT_SEND_INTERVAL_MS || 200),
    pollTimeoutMs: config.pollTimeoutMs ?? Number(process.env.WX_BOT_POLL_TIMEOUT_MS || 8000),
    watchdogMs: config.watchdogMs ?? Number(process.env.WX_BOT_WATCHDOG_MS || 90_000),
    renewAfterMs: config.renewAfterMs ?? 24 * 60 * 60 * 1000,
    renewWarnBeforeMs: config.renewWarnBeforeMs ?? 2 * 60 * 60 * 1000,
    version: pluginVersion,
    log: silent.log,
    warn: silent.warn,
    error: silent.error,
  })
  const transport = new InprocTransport(ctx.apiProxy, {
    preset,
    sessionCwd,
    workspaceTitle: config.workspaceTitle || '微信会话',
    timeoutMs: engineConfig.turnTimeoutMs,
    slowMs: engineConfig.slowAckMs,
    logger: silent,
  })
  const engine = new Engine({
    wechat,
    store,
    transport,
    config: engineConfig,
    promptDir: editablePromptDir(sessionDir),
    defaultPromptDir: defaultPromptDir(projectDir),
    logger: silent,
  })

  ctx.effect(() => {
    engine.start()
    return () => engine.stop()
  }, 'dsh-message: runtime')
  ctx.effect(() => registerControlApi(ctx.webServer, engine, wechat), 'dsh-message: settings api')
}
