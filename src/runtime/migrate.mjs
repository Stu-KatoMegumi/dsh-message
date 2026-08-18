import { access, copyFile, cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

async function exists(value) {
  try { await access(value); return true } catch { return false }
}

async function copyFileIfMissing(source, target) {
  if (!(await exists(source)) || await exists(target)) return false
  await mkdir(path.dirname(target), { recursive: true })
  await copyFile(source, target)
  return true
}

async function copyTreeIfMissing(source, target) {
  if (!(await exists(source))) return false
  await mkdir(target, { recursive: true })
  await cp(source, target, { recursive: true, force: false, errorOnExist: false })
  return true
}

/** Copy legacy data forward without overwriting or removing any source data. */
export async function migrateLegacyData({ dshHome, root }) {
  const marker = path.join(root, 'migration.json')
  if (await exists(marker)) return JSON.parse(await readFile(marker, 'utf8'))
  const copied = []
  const legacyWeixin = path.join(dshHome, 'channels', 'dsh-weixin')
  for (const name of ['system-prompt.md', 'soul.md', 'rules.md']) {
    if (await copyFileIfMissing(
      path.join(legacyWeixin, 'prompt', name),
      path.join(root, 'agent', 'prompt', name),
    )) copied.push(`agent/prompt/${name}`)
  }
  if (await copyFileIfMissing(
    path.join(legacyWeixin, 'memory', 'memory.md'),
    path.join(root, 'agent', 'memory', 'memory.md'),
  )) copied.push('agent/memory/memory.md')
  if (await copyTreeIfMissing(
    path.join(legacyWeixin, 'history'),
    path.join(root, 'agent', 'history', 'legacy-weixin'),
  )) copied.push('agent/history/legacy-weixin')

  for (const channel of ['weixin', 'feishu', 'qq', 'wecom', 'dingtalk']) {
    const source = path.join(dshHome, 'integrations', `dsh-${channel}`)
    const target = path.join(root, 'channels', channel)
    if (path.resolve(source) !== path.resolve(target) && await copyTreeIfMissing(source, target)) {
      copied.push(`channels/${channel}`)
    }
  }

  const result = {
    version: 1,
    completedAt: new Date().toISOString(),
    copied,
    sourcesPreserved: true,
  }
  await mkdir(root, { recursive: true })
  await writeFile(marker, `${JSON.stringify(result, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 })
  return result
}
