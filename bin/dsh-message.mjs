#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import {
  cpSync, existsSync, mkdirSync, readFileSync, rmSync,
} from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { isAbsolute, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const PACKAGE_NAME = '@stu-xie/dsh-message';
const DEFAULT_SOURCE = PACKAGE_NAME;
const LEGACY_PACKAGES = [
  '@xmanrui/dsh-feishu',
  '@xmanrui/dsh-weixin',
  '@xmanrui/dsh-dingtalk',
  '@xmanrui/dsh-im',
  '@deepseek-ai/dsh-message',
  '@deepseek-ai/dsh-weixin',
];
const PACKAGE_NAMES = new Set([PACKAGE_NAME, ...LEGACY_PACKAGES]);

function usage() {
  console.log(`Usage:
  dsh-message install [--profile web] [--source <package-spec>]
  dsh-message uninstall [--profile web]

Examples:
  npx -y @stu-xie/dsh-message install
  dsh-message install --source .`);
}

function takeOption(args, name, fallback) {
  const index = args.indexOf(name);
  if (index < 0) return fallback;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`);
  args.splice(index, 2);
  return value;
}

function sourceCheckout(root) {
  return typeof root === 'string' && root.length > 0
    && existsSync(join(root, 'package.json'))
    && existsSync(join(root, 'pnpm-workspace.yaml'));
}

function dshInvocation() {
  const root = process.env.DSH_ROOT;
  if (root && !sourceCheckout(root)) {
    throw new Error(`DSH_ROOT 不是有效的 DSH 源码目录：${root}`);
  }
  const fromSource = sourceCheckout(root);
  return {
    cli: process.env.DSH_CLI || (fromSource ? 'pnpm' : 'dsh'),
    prefix: fromSource ? ['dsh'] : [],
    cwd: fromSource ? resolve(root) : tmpdir(),
    fromSource,
  };
}

function runDsh(args) {
  const invocation = dshInvocation();
  const commandArgs = [...invocation.prefix, ...args];
  const executable = process.platform === 'win32'
    ? (process.env.ComSpec || 'cmd.exe')
    : invocation.cli;
  const executableArgs = process.platform === 'win32'
    ? ['/d', '/s', '/c', invocation.cli, ...commandArgs]
    : commandArgs;
  const result = spawnSync(executable, executableArgs, {
    cwd: invocation.cwd,
    stdio: 'inherit',
    shell: false,
  });
  if (result.error?.code === 'ENOENT') {
    throw new Error(invocation.fromSource
      ? `找不到 ${invocation.cli}，无法从 DSH_ROOT 运行源码版 DSH。`
      : `找不到 ${invocation.cli}，请确保 dsh 在 PATH 中，或设置 DSH_ROOT 指向 DSH 源码目录。`);
  }
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${invocation.fromSource ? `${invocation.cli} dsh` : invocation.cli} 退出，状态码 ${result.status ?? 1}`);
  }
}

function dshHome() {
  return resolve(process.env.DSH_HOME || join(homedir(), '.dsh'));
}

function linkTarget(spec) {
  return typeof spec === 'string' && spec.startsWith('link:') ? spec.slice(5) : null;
}

async function installedProfileKeys(profile) {
  const dshHome = process.env.DSH_HOME || join(homedir(), '.dsh');
  const profilePackage = join(dshHome, 'profiles', profile, 'package.json');
  try {
    const manifest = JSON.parse(await readFile(profilePackage, 'utf8'));
    const bundles = new Set(manifest.dsh?.profile?.bundles ?? []);
    const dependencies = manifest.dependencies ?? {};
    const found = new Set(
      [...PACKAGE_NAMES].filter((name) => dependencies[name] || bundles.has(name)),
    );
    for (const alias of ['dsh-message', 'dsh-weixin']) {
      if (dependencies[alias]) found.add(alias);
    }

    // Older Windows installers passed an unquoted checkout path through the
    // DSH/pnpm forwarding shell. A path such as "E:\\Research Files\\...\\dsh-weixin"
    // became two dependencies: "Research" and "dsh-weixin". Reconstruct the
    // split link and remove it only when it resolves to this exact checkout.
    const project = resolve(process.cwd()).toLocaleLowerCase();
    for (const [tailKey, tailSpec] of Object.entries(dependencies)) {
      const tail = linkTarget(tailSpec);
      if (!tail || isAbsolute(tail) || !['dsh-message', 'dsh-weixin'].includes(tailKey)) continue;
      for (const [headKey, headSpec] of Object.entries(dependencies)) {
        const head = linkTarget(headSpec);
        if (!head || !isAbsolute(head)) continue;
        if (resolve(`${head} ${tail}`).toLocaleLowerCase() === project) {
          found.add(tailKey);
          found.add(headKey);
        }
      }
    }
    return found;
  } catch (error) {
    if (error?.code === 'ENOENT') return new Set();
    throw new Error(`无法读取 Harness 配置 ${profilePackage}：${error.message}`);
  }
}

function localPackageSource(source) {
  if (!isAbsolute(source) || !existsSync(join(source, 'package.json'))) return source;
  if (process.platform !== 'win32' || !/\s/.test(source)) return source;
  const cacheRoot = join(dshHome(), 'bundles');
  const target = join(cacheRoot, 'dsh-message');
  const manifest = JSON.parse(readFileSync(join(source, 'package.json'), 'utf8'));
  if (manifest.name !== PACKAGE_NAME) {
    throw new Error(`本地源码包名不是 ${PACKAGE_NAME}：${manifest.name ?? 'unknown'}`);
  }
  if (existsSync(target)) {
    const cachedManifest = join(target, 'package.json');
    if (!existsSync(cachedManifest)
      || !PACKAGE_NAMES.has(JSON.parse(readFileSync(cachedManifest, 'utf8')).name)) {
      throw new Error(`拒绝覆盖不属于 dsh-message 的缓存目录：${target}`);
    }
    rmSync(target, { recursive: true, force: true });
  }
  mkdirSync(cacheRoot, { recursive: true });
  cpSync(source, target, {
    recursive: true,
    filter: (value) => !['node_modules', '.git', 'others', 'session', 'state']
      .includes(value.split(/[\\/]/).at(-1)),
  });
  console.log(`[dsh-message] Windows 路径含空格，使用安装缓存：${target}`);
  return `file:${target}`;
}

function removeInstallCache() {
  const cacheRoot = join(dshHome(), 'bundles');
  const target = join(cacheRoot, 'dsh-message');
  if (!existsSync(target)) return;
  const manifestPath = join(target, 'package.json');
  if (!existsSync(manifestPath)
    || !PACKAGE_NAMES.has(JSON.parse(readFileSync(manifestPath, 'utf8')).name)) {
    throw new Error(`拒绝清理不属于 dsh-message 的缓存目录：${target}`);
  }
  rmSync(target, { recursive: true, force: true });
  console.log(`[dsh-message] 已清理安装缓存：${target}`);
}

const args = process.argv.slice(2);
const command = args.shift();

if (!command || command === '--help' || command === '-h') {
  usage();
  process.exit(0);
}

try {
  const profile = takeOption(args, '--profile', process.env.DSH_PROFILE || 'web');
  const invocation = dshInvocation();
  console.log(`[dsh-message] DSH=${invocation.fromSource ? `${invocation.cli} dsh (${invocation.cwd})` : invocation.cli}，profile=${profile}`);
  if (command === 'install') {
    const requested = takeOption(args, '--source', DEFAULT_SOURCE);
    const resolvedSource = requested === '.' || requested === '..'
      || requested.startsWith('./') || requested.startsWith('../')
      ? resolve(process.cwd(), requested)
      : (isAbsolute(requested) ? requested : requested);
    if (args.length > 0) throw new Error(`无法识别的参数：${args.join(' ')}`);

    const source = localPackageSource(resolvedSource);
    const legacy = await installedProfileKeys(profile);
    for (const packageName of [...legacy].sort((left, right) => (
      left.startsWith('dsh-') ? -1 : right.startsWith('dsh-') ? 1 : 0
    ))) {
      runDsh(['plugin', '--profile', profile, 'remove', packageName]);
    }
    runDsh(['plugin', '--profile', profile, 'add', '--save-exact', source]);
    console.log('\ndsh-message 已安装。请重启 dsh web，然后打开「设置 → 插件 → 消息接入」。');
    if (legacy.size > 0) {
      console.log('已替换旧消息渠道插件；原有数据不会被安装器删除。');
    }
  } else if (command === 'uninstall') {
    if (args.length > 0) throw new Error(`无法识别的参数：${args.join(' ')}`);
    const installed = await installedProfileKeys(profile);
    if (installed.size === 0) {
      console.log('\ndsh-message 未安装，无需卸载。');
    } else {
      for (const packageName of [...installed].sort((left, right) => (
        left.startsWith('dsh-') ? -1 : right.startsWith('dsh-') ? 1 : 0
      ))) {
        runDsh(['plugin', '--profile', profile, 'remove', packageName]);
      }
      console.log('\ndsh-message 已卸载。请重启 dsh web。');
    }
    removeInstallCache();
  } else {
    throw new Error(`无法识别的命令：${command}`);
  }
} catch (error) {
  console.error(`dsh-message: ${error.message}`);
  process.exit(1);
}
