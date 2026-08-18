// Convenience wrapper around the official DSH bundle installer.
//
// It intentionally does not copy files into the DSH checkout and does not edit
// cordis.patch.yml itself. `dsh plugin` owns profile dependencies, lockfiles,
// and bundle ordering; this script only supplies the right CLI arguments.

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const projectDir = path.dirname(fileURLToPath(import.meta.url))
const packageJson = JSON.parse(fs.readFileSync(path.join(projectDir, 'package.json'), 'utf8'))
const profile = process.env.DSH_PROFILE || 'web'
const uninstall = process.argv.includes('--uninstall')
const dshRoot = process.env.DSH_ROOT || 'D:\\Program Files\\dsh'
const dshHome = process.env.DSH_HOME || path.join(os.homedir(), '.dsh')
const sourceCheckout = fs.existsSync(path.join(dshRoot, 'package.json'))
  && fs.existsSync(path.join(dshRoot, 'pnpm-workspace.yaml'))

function migrateLegacyState() {
  const legacyDir = path.join(dshHome, 'profiles', profile, 'node_modules', ...packageJson.name.split('/'), 'session')
  const durableDir = path.join(dshHome, 'channels', 'dsh-weixin')
  if (!fs.existsSync(legacyDir)) return
  fs.mkdirSync(durableDir, { recursive: true })
  fs.cpSync(legacyDir, durableDir, { recursive: true, force: false, errorOnExist: false })
  console.log(`[dsh-weixin] 已保留旧版登录/会话数据到：${durableDir}`)
}

function fail(message) {
  console.error(`[dsh-weixin] ${message}`)
  process.exit(1)
}

if (!packageJson.dsh?.bundle?.patch || !fs.existsSync(path.join(projectDir, 'cordis.patch.yml'))) {
  fail('当前目录不是完整的 DSH bundle：缺少 package.json 的 dsh.bundle.patch 或 cordis.patch.yml')
}

const cli = process.env.DSH_CLI || (sourceCheckout ? 'pnpm' : 'dsh')
let packageSpec = projectDir
const stableBundle = path.join(dshHome, 'bundles', 'dsh-weixin')
// `dsh plugin` forwards to pnpm through a Windows shell. A direct absolute
// path containing spaces is split by that shell before pnpm sees it. A stable
// no-space cache under DSH_HOME keeps the official command usable from
// Chinese/spaceful checkout paths and lets pnpm install dependencies normally.
if (!uninstall && process.platform === 'win32' && /\s/.test(projectDir)) {
  fs.mkdirSync(path.dirname(stableBundle), { recursive: true })
  try {
    const stat = fs.lstatSync(stableBundle)
    if (stat.isSymbolicLink()) fs.unlinkSync(stableBundle)
    else {
      const existing = JSON.parse(fs.readFileSync(path.join(stableBundle, 'package.json'), 'utf8'))
      const compatibleNames = new Set([packageJson.name, 'dsh-weixin'])
      if (!compatibleNames.has(existing.name)) fail(`Windows 兼容缓存目录已被其他包占用：${stableBundle}`)
      fs.rmSync(stableBundle, { recursive: true, force: true })
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      if (error instanceof SyntaxError) fail(`Windows 兼容缓存目录不是 dsh-weixin：${stableBundle}`)
      throw error
    }
  }
  fs.cpSync(projectDir, stableBundle, {
    recursive: true,
    filter: (source) => !['node_modules', '.git', 'session', 'state', 'others'].includes(path.basename(source)),
  })
  // `file:` makes pnpm install this bundle and its declared dependencies in
  // the profile. A plain `link:` would resolve dependencies from the external
  // checkout, which is not valid for a user who has not run npm install here.
  packageSpec = `file:${stableBundle}`
}
console.log(`[dsh-weixin] ${uninstall ? '卸载' : '安装'} bundle ${packageJson.name} 到 profile “${profile}”`)
if (sourceCheckout) console.log(`[dsh-weixin] 使用源码版 DSH：${dshRoot}`)
else console.log('[dsh-weixin] 使用 PATH 中的 dsh CLI；如需指定源码 checkout，请设置 DSH_ROOT')

// Invoke cmd.exe explicitly on Windows so .cmd shims work without Node's
// deprecated `shell: true` argument concatenation (DEP0190).
const executable = process.platform === 'win32' ? (process.env.ComSpec || 'cmd.exe') : cli
function runPlugin(action, spec) {
  const args = sourceCheckout
    ? ['dsh', 'plugin', '--profile', profile, action, spec]
    : ['plugin', '--profile', profile, action, spec]
  const executableArgs = process.platform === 'win32' ? ['/d', '/s', '/c', cli, ...args] : args
  const result = spawnSync(executable, executableArgs, {
    cwd: sourceCheckout ? dshRoot : projectDir,
    stdio: 'inherit',
  })
  if (result?.error) fail(`无法执行 ${cli}：${result.error.message}`)
  if (result?.status !== 0) fail(`DSH CLI 退出码为 ${result?.status}`)
}

// A pnpm file dependency with the same package version can otherwise remain
// linked to the previous store snapshot. Remove+add is the official CLI path
// and guarantees a development reinstall picks up every changed source file.
const profileManifest = path.join(dshHome, 'profiles', profile, 'package.json')
const alreadyInstalled = (() => {
  try {
    const manifest = JSON.parse(fs.readFileSync(profileManifest, 'utf8'))
    return Object.hasOwn(manifest.dependencies || {}, packageJson.name)
  } catch { return false }
})()
migrateLegacyState()
if (!uninstall && alreadyInstalled) {
  console.log('[dsh-weixin] 检测到旧版本，先通过官方 CLI 刷新安装…')
  runPlugin('remove', packageJson.name)
}
runPlugin(uninstall ? 'remove' : 'add', uninstall ? packageJson.name : packageSpec)

if (uninstall && fs.existsSync(stableBundle)) {
  const resolved = path.resolve(stableBundle)
  const expectedParent = path.resolve(dshHome, 'bundles') + path.sep
  if (!resolved.startsWith(expectedParent) || path.basename(resolved) !== 'dsh-weixin') {
    fail(`拒绝清理意外路径：${resolved}`)
  }
  try {
    const cached = JSON.parse(fs.readFileSync(path.join(resolved, 'package.json'), 'utf8'))
    if (![packageJson.name, 'dsh-weixin'].includes(cached.name)) fail(`缓存目录不属于 dsh-weixin：${resolved}`)
    fs.rmSync(resolved, { recursive: true, force: true })
    console.log(`[dsh-weixin] 已清理 Windows 兼容缓存：${resolved}`)
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
  }
}

console.log(`[dsh-weixin] ${uninstall ? '卸载' : '安装'}完成。启动时使用：${sourceCheckout ? 'pnpm dsh' : 'dsh'} --profile ${profile}`)
