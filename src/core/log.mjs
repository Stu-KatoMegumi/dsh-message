// src/core/log.mjs — 给所有日志行加时间戳前缀（[HH:MM:SS.mmm]）
//
// 在入口（standalone/plugin）启动时调用 installTimestampLogging() 一次，
// 之后所有 console.log/warn/error 输出都带时间戳，方便排查"卡"与投递延迟。

const pad = (n, len = 2) => String(n).padStart(len, '0')

function stamp() {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`
}

let installed = false

export function installTimestampLogging() {
  if (installed) return
  installed = true
  for (const level of ['log', 'warn', 'error']) {
    const original = console[level]
    console[level] = (...args) => original(`[${stamp()}]`, ...args)
  }
}

/** Create a scoped logger. When `enabled` is false every call is a no-op, so a
 *  plugin can be silent without overriding the shared global `console` — which
 *  also carries the host's own output (e.g. the `dsh web: http://...` banner). */
export function createLogger(enabled = true) {
  const noop = () => {}
  const reflect = level => (...args) => { console[level](...args) }
  return {
    log: enabled ? reflect('log') : noop,
    warn: enabled ? reflect('warn') : noop,
    error: enabled ? reflect('error') : noop,
  }
}
