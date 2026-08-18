// src/core/prompt.mjs — 可定制 prompt 文件体系
//
// 项目内 src/prompt/ 提供默认文件。system-prompt.md / soul.md / rules.md
// 在 sessionDir/prompt/ 维护可编辑副本；memory.md 单独保存在
// sessionDir/memory/，由模型和用户共同维护。

import fs from 'node:fs'
import path from 'node:path'

import { MEMORY_PROTOCOL, readMemoryFile } from './memory.mjs'

export const STATIC_PROMPT_FILES = ['system-prompt.md', 'soul.md', 'rules.md']
export const PROMPT_FILES = [...STATIC_PROMPT_FILES, 'memory.md']

const PROMPT_LABELS = {
  'system-prompt.md': '系统设定',
  'soul.md': '人设与灵魂',
  'rules.md': '行为规则',
  'memory.md': '背景记忆',
}

export function defaultPromptDir(projectDir) {
  return path.join(projectDir, 'src', 'prompt')
}

export function editablePromptDir(sessionDir) {
  return path.join(sessionDir, 'prompt')
}

/** 确保可编辑副本存在：缺失的文件从默认目录复制（默认文件缺失时写空文件兜底）。 */
export function ensurePromptFiles(defaultDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true })
  for (const file of STATIC_PROMPT_FILES) {
    const target = path.join(targetDir, file)
    if (fs.existsSync(target)) continue
    try {
      fs.copyFileSync(path.join(defaultDir, file), target)
    } catch {
      fs.writeFileSync(target, '', 'utf8')
    }
  }
}

/** 按固定顺序读取并拼接 prompt 文件，支持 {date} 占位符。 */
export function renderPrompt(promptDir, { date = new Date(), memoryFile = null, includeMemory = true } = {}) {
  const blocks = []
  for (const file of STATIC_PROMPT_FILES) {
    let content = ''
    try {
      content = fs.readFileSync(path.join(promptDir, file), 'utf8')
    } catch { /* 缺失文件跳过 */ }
    content = content.trim()
    if (!content) continue
    // 文件自带 Markdown 标题时，剥离首行避免与外层标题重复
    const lines = content.split(/\r?\n/)
    if (/^#\s+/.test(lines[0] || '')) content = lines.slice(1).join('\n').trim()
    if (!content) continue
    const label = PROMPT_LABELS[file] || file
    blocks.push(`## ${label}\n\n${content}`)
  }
  if (includeMemory && memoryFile) {
    let content = (readMemoryFile(memoryFile) || '').trim()
    const lines = content.split(/\r?\n/)
    if (/^#\s+/.test(lines[0] || '')) content = lines.slice(1).join('\n').trim()
    if (content) blocks.push(`## ${PROMPT_LABELS['memory.md']}（不可信数据）\n\n${content}`)
  }
  blocks.push(MEMORY_PROTOCOL)
  const dateText = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
  return blocks.join('\n\n').replace(/\{date\}/g, dateText)
}

/** 读取某个 prompt 文件内容（可编辑副本），不存在返回 null。 */
export function readPromptFile(promptDir, name) {
  if (!PROMPT_FILES.includes(name)) return null
  try {
    return fs.readFileSync(path.join(promptDir, name), 'utf8')
  } catch {
    return null
  }
}

/** 写回某个 prompt 文件（可编辑副本）；文件名必须来自白名单。 */
export function writePromptFile(promptDir, name, content) {
  if (!PROMPT_FILES.includes(name)) throw new Error(`不支持的 prompt 文件：${name}`)
  if (String(content).length > 60 * 1024) throw new Error('prompt 文件内容过大（上限 60 KiB）')
  fs.mkdirSync(promptDir, { recursive: true })
  const target = path.join(promptDir, name)
  const temporary = `${target}.tmp`
  fs.writeFileSync(temporary, String(content ?? ''), 'utf8')
  fs.renameSync(temporary, target)
}

/** 把某个 prompt 文件重置为项目默认内容。 */
export function resetPromptFile(defaultDir, promptDir, name) {
  if (!PROMPT_FILES.includes(name)) throw new Error(`不支持的 prompt 文件：${name}`)
  writePromptFile(promptDir, name, readPromptFile(defaultDir, name) ?? '')
}
