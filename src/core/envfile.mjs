// src/core/envfile.mjs — 极简 .env 加载（仅独立模式使用）
//
// 约定：进程已有的环境变量优先（不覆盖）；支持 # 注释、空行、KEY=VALUE、
// 值两侧单/双引号去除。不引入 dotenv 依赖。

import fs from 'node:fs'

export function loadEnvFile(file) {
  let text
  try {
    text = fs.readFileSync(file, 'utf8')
  } catch {
    return false
  }
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq <= 0) continue
    const key = line.slice(0, eq).trim()
    const value = line.slice(eq + 1).trim()
    if (!key || process.env[key] !== undefined) continue
    process.env[key] = value.replace(/^(['"])(.*)\1$/, '$2')
  }
  return true
}
