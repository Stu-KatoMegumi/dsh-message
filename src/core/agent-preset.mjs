// src/core/agent-preset.mjs — IM 渠道专用 DSH agent 预设
//
// dsh-message 的 IM 会话必须使用不含 `ask_user_question`（Web 选项卡提问）
// 的 agent 预设，模型才会直接在渠道内以纯文字编号提问（Codex 式"回复 1/2、
// 1A 2B"），手机用户无需鼠标、不会被 Web 选项卡卡死。
//
// DSH 的系统根预设（安装目录 config/agent-presets）对重复 id 优先，因此本
// 插件使用独立 id 的用户根预设（`$DSH_HOME/.agent-presets/<id>`）。模板随
// 包分发（assets/agent-presets/dsh-message），插件/独立模式启动时幂等复制：
// 目标文件已存在（含用户手动编辑过）绝不覆盖；不安装本插件则不会创建该
// 预设，DSH 自身会话（standard）的选项卡提问完全不受影响。

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** IM 会话使用的 DSH agent preset id（与插件同名）。 */
export const IM_AGENT_PRESET = 'dsh-message'

const PRESET_FILES = ['agent.cordis.yml', 'preset.yml']

/** 解析内置预设模板目录（覆盖源码布局与 esbuild bundle 布局）。 */
export function presetTemplateDir() {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url))
  return [
    path.resolve(moduleDir, '..', 'assets', 'agent-presets', IM_AGENT_PRESET),
    path.resolve(moduleDir, '..', '..', 'assets', 'agent-presets', IM_AGENT_PRESET),
    path.resolve(process.cwd(), 'assets', 'agent-presets', IM_AGENT_PRESET),
  ].find((candidate) => fs.existsSync(path.join(candidate, 'agent.cordis.yml'))) ?? null
}

/** DSH 用户根预设目录。 */
export function userPresetDir(dshHome) {
  return path.join(dshHome, '.agent-presets', IM_AGENT_PRESET)
}

/**
 * 幂等确保 DSH 用户根存在 IM 专用预设。
 *
 * - 目录/文件已存在（含用户手动编辑过）绝不覆盖；
 * - 模板缺失或写入失败时返回 { ok: false, reason }，由调用方记录日志、
 *   不阻塞启动；会话创建时 DSH 会以 UnknownPresetError 明确报错，可定位。
 *
 * @param {string} dshHome DSH 用户根（$DSH_HOME 或 ~/.dsh）
 * @param {{ logger?: {log?: Function, warn?: Function} }} [options]
 * @returns {{ ok: boolean, preset: string, reason?: string, written?: string[], error?: unknown }}
 */
export function ensureImAgentPreset(dshHome, { logger = console } = {}) {
  const source = presetTemplateDir()
  if (!source) {
    return { ok: false, reason: 'preset-template-missing', preset: IM_AGENT_PRESET }
  }
  const targetDir = userPresetDir(dshHome)
  try {
    fs.mkdirSync(targetDir, { recursive: true })
  } catch (error) {
    return { ok: false, reason: 'preset-dir-write-failed', preset: IM_AGENT_PRESET, error }
  }
  const written = []
  for (const name of PRESET_FILES) {
    const target = path.join(targetDir, name)
    if (fs.existsSync(target)) continue
    try {
      fs.copyFileSync(path.join(source, name), target)
      written.push(name)
    } catch (error) {
      return { ok: false, reason: 'preset-file-write-failed', preset: IM_AGENT_PRESET, file: name, error }
    }
  }
  if (written.length > 0 && typeof logger?.log === 'function') {
    logger.log(`[dsh-message] 已确保 DSH agent 预设 ${IM_AGENT_PRESET} 存在：${targetDir}（写入 ${written.join(', ')}）`)
  }
  return { ok: true, preset: IM_AGENT_PRESET, written }
}
