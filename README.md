# dsh-message

`dsh-message` 是面向 DeepSeek Harness 的统一消息接入插件，仅包含微信、飞书、QQ、企业微信和钉钉。项目采用一套 Host/Client 插件、统一设置页和统一 HTTP Harness 会话链路，并在五个渠道上共享提示词、长期记忆和会话策略。

## 功能

- 一个“消息接入”设置入口，集中管理五种渠道和多个机器人。
- 五个渠道统一解析模型回复中的独立 `---` 行：每段发送为一条独立气泡，分隔符不展示，单轮最多 10 条。
- 支持渠道扫码或官方机器人凭据、连接状态、重连、删除、工作区和 Session 绑定。
- 微信保留 iLink 扫码、验证码、重新登录/续签、引用、语音转写、媒体和流式气泡能力。
- 飞书支持长连接和 CardKit Markdown 流式；QQ、企业微信、钉钉使用各自官方 SDK/Stream 能力。
- `system-prompt.md`、`soul.md`、`rules.md` 和 `memory.md` 可在“助手设置”中编辑和重置。
- 新 Session 首轮注入提示词；日期或静态提示词变化时轮换会话。
- 模型记忆操作不会显示给聊天用户，支持新增、替换、删除、去重、凭据拒绝和原子写入。
- 简单消息和复杂任务可分别在“助手设置”中选择 `deepseek-v4-flash` 或 `deepseek-v4-pro`，推理挡位支持 `off`、`high`、`max`；默认分别为 `deepseek-v4-flash/off` 和 `deepseek-v4-flash/max`。
- 历史按 `channel + botId + conversation` 隔离保存。

## 安装

要求 Node.js 22.19 或更高版本，并确保 `dsh` 命令可用。

### 环境变量

- `DSH_ROOT`：可选的 DSH 源码根目录；设置后安装器会在该目录运行 `pnpm dsh`。
- `DSH_HOME`：DSH 数据根目录，里面保存 `profiles/` 和 `integrations/`；不设置时默认为当前用户目录下的 `.dsh`。
- `DSH_PROFILE`：安装或卸载使用的 DSH profile；不设置时默认为 `web`。
- `DSH_CLI`：可选的 CLI 命令覆盖值；通常无需设置。

> `D:\Program Files\dsh` 是源码目录，应配置给 `DSH_ROOT`，不能配置给 `DSH_HOME`。当前机器的实际 profile 位于 `%USERPROFILE%\.dsh\profiles\web`，所以 `DSH_HOME` 应为 `%USERPROFILE%\.dsh`。

如果没有设置 `DSH_ROOT`，安装器会直接调用 `dsh` CLI，因此应先确认以下命令可以正常运行：

```bash
dsh --help
```

Windows PowerShell：

```powershell
# 当前 PowerShell 会话生效
$env:DSH_ROOT = 'D:\Program Files\dsh'
$env:DSH_HOME = "$env:USERPROFILE\.dsh"
$env:DSH_PROFILE = 'web'

npm install
npm run check
npm run install:dsh
```

需要持久保存到当前 Windows 用户时，可执行下面的命令，然后重新打开 PowerShell：

```powershell
[Environment]::SetEnvironmentVariable('DSH_ROOT', 'D:\Program Files\dsh', 'User')
[Environment]::SetEnvironmentVariable('DSH_HOME', "$env:USERPROFILE\.dsh", 'User')
[Environment]::SetEnvironmentVariable('DSH_PROFILE', 'web', 'User')
```

Linux/macOS（bash 或 zsh）：

```bash
# 当前终端会话生效
export DSH_ROOT="/path/to/dsh"
export DSH_HOME="$HOME/.dsh"
export DSH_PROFILE="web"

npm install
npm run check
npm run install:dsh
```

需要长期生效时，把两个 `export` 写入 `~/.bashrc`、`~/.zshrc` 或系统实际使用的 shell 配置文件，然后重新打开终端或执行 `source`。

环境变量只是默认值，也可以在单次操作中用 CLI 参数覆盖 profile：

```bash
npm run install:dsh -- --profile web
npm run uninstall:dsh -- --profile web
```

### 执行安装

```bash
npm install
npm run check
npm run install:dsh
```

重启 `dsh web` 后，打开“设置 → 插件 → 消息接入”。卸载只移除插件，不删除机器人凭据、登录状态、提示词、记忆或历史：

插件模式默认完全静默：不会向 `dsh web` 终端输出渠道连接、SDK、消息收发、重连或错误日志；运行状态和最近错误只保存在状态数据中并显示在设置页。该行为不会覆盖全局 `console`，因此 DSH 自身的启动信息仍会正常显示。

```bash
npm run uninstall:dsh
```

## 数据目录

默认根目录是 `<DSH_HOME>/integrations/dsh-message`：

```text
dsh-message/
  agent/
    prompt/       可编辑提示词
    memory/       长期记忆
    history/      隔离的本地会话历史
    sessions.json 会话日期和提示词指纹
    settings.json 助手设置
  channels/
    weixin/
    feishu/
    qq/
    wecom/
    dingtalk/
```

Host 配置可用 `dataDir` 覆盖根目录，也可在具体渠道配置中单独覆盖 `dataDir`。管理 RPC 默认只允许 loopback；只有明确需要可信远程 Host 时才配置 `rpcAuthority: "trusted-host"`。

## 项目结构

```text
plugin-src/client/   统一 React 设置页和五渠道 UI
plugin-src/host/     Host 插件、管理 RPC 和生产 Controller
src/agent/           五渠道共享的提示词、记忆、会话与模型策略
src/channels/shared/ Harness、工作区、Session 和通用桥接
src/channels/*/      五种渠道的 Controller、Runtime、Bridge 和 Store
src/core/            原项目保留的提示词、记忆、微信媒体和调度基础能力
src/prompt/          默认提示词模板
bin/dsh-message.mjs  安装/卸载 CLI
```

插件模式和渠道生产 Controller 都使用 DSH Web 暴露的 HTTP RPC，不在生产入口中使用进程内 Transport。旧版 `src/standalone` 代码仅作为兼容迁移来源保留，不是新插件的运行入口。

## 从旧版迁移

安装器会替换旧的 `@deepseek-ai/dsh-weixin`、`@xmanrui/dsh-im` 以及独立渠道插件，但不会删除旧数据。Host 首次启动时会把旧提示词、`memory/memory.md`、历史和五渠道数据复制到新目录，已经存在的目标文件不会被覆盖；结果记录在 `migration.json`。首次部署前仍建议备份 `<DSH_HOME>`。

## 开发验证

```bash
npm test
npm run build
npm run check
```

渠道真实登录仍需要相应平台账号和机器人应用；自动测试与构建不会代替平台端联调。

## 许可证与来源

项目使用 MIT License。迁移自 dsh-im 及渠道 SDK/协议实现的代码、版本和许可证见 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)。
