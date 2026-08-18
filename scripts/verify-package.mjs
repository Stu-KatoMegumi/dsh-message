import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const required = [
  'lib/index.js',
  'lib/client.js',
  'bin/dsh-message.mjs',
  'cordis.patch.yml',
  'README.md',
  'THIRD_PARTY_NOTICES.md',
  'plugin-src/client/agent-settings.js',
  'plugin-src/host/agent.mjs',
  'src/agent/service.mjs',
  ...['feishu', 'weixin', 'dingtalk', 'qq', 'wecom'].flatMap((channel) => [
    `plugin-src/client/channels/${channel}/index.js`,
    `plugin-src/host/channels/${channel}/index.mjs`,
  ]),
]
await Promise.all(required.map((file) => access(resolve(root, file))))

const [client, host, patch, manifestText, lockText, notices] = await Promise.all([
  readFile(resolve(root, 'lib/client.js'), 'utf8'),
  readFile(resolve(root, 'lib/index.js'), 'utf8'),
  readFile(resolve(root, 'cordis.patch.yml'), 'utf8'),
  readFile(resolve(root, 'package.json'), 'utf8'),
  readFile(resolve(root, 'package-lock.json'), 'utf8'),
  readFile(resolve(root, 'THIRD_PARTY_NOTICES.md'), 'utf8'),
])
const manifest = JSON.parse(manifestText)
const lock = JSON.parse(lockText)

if (manifest.name !== '@stu-xie/dsh-message' || manifest.version !== '2.0.0') {
  throw new Error('package identity must be @stu-xie/dsh-message@2.0.0')
}
if (manifest.bin?.['dsh-message'] !== 'bin/dsh-message.mjs') {
  throw new Error('package must publish the dsh-message executable')
}
if (!client.includes('id: "@stu-xie/dsh-message"')
  || !client.includes('id: "message"')
  || !client.includes('message-settings')) {
  throw new Error('client bundle does not register the dsh-message settings entry')
}
if ((client.match(/settings\.plugins\.tab/g) ?? []).length < 1) {
  throw new Error('client bundle does not contain the unified settings tab')
}
for (const marker of ['/feishu', '/weixin', '/dingtalk', '/wecom', '/qq', '/message-agent']) {
  if (!host.includes(marker)) throw new Error(`host bundle is missing ${marker}`)
}
for (const excluded of ['/slack', '/telegram', '/discord', '/whatsapp']) {
  if (host.includes(excluded)) throw new Error(`host bundle unexpectedly contains ${excluded}`)
}
if (!host.includes('session.selectModel') || !host.includes('DSH_MEMORY_OPS')) {
  throw new Error('host bundle is missing the shared model or memory policy')
}
if (host.includes('InprocTransport')) {
  throw new Error('production host bundle must not contain InprocTransport')
}
if (!patch.includes("name: '@stu-xie/dsh-message'")) {
  throw new Error('bundle patch does not activate dsh-message')
}
for (const name of ['@whiskeysockets/baileys']) {
  if (manifest.dependencies?.[name] || manifest.devDependencies?.[name] || lock.packages?.[`node_modules/${name}`]) {
    throw new Error(`${name} must not be published for the five-channel build`)
  }
}
if (!notices.includes('Copyright (c) 2026 xmanrui') || !notices.includes('protobufjs')) {
  throw new Error('third-party notices are incomplete')
}
if (/private-bot-token|must-be-rolled-back|DEEPSEEK_API_KEY=/.test(client + host)) {
  throw new Error('built artifacts contain a test or environment secret marker')
}
await import(pathToFileURL(resolve(root, 'lib/index.js')).href)

console.log('Verified dsh-message package artifacts.')
