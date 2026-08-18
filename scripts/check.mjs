import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const files = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(file)
    else if (/\.(?:mjs|js)$/.test(entry.name)) files.push(file)
  }
}
walk(path.join(root, 'src'))
for (const file of files) {
  const check = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' })
  if (check.status !== 0) {
    process.stderr.write(check.stderr)
    process.exit(check.status || 1)
  }
}
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const version = JSON.parse(fs.readFileSync(path.join(root, 'version.json'), 'utf8')).version
if (pkg.version !== version) throw new Error(`package.json (${pkg.version}) 与 version.json (${version}) 不一致`)
if (pkg.name !== '@stu-xie/dsh-message') throw new Error('包名必须为 @stu-xie/dsh-message')
console.log(`checked ${files.length} source files; dsh-message v${version}`)
