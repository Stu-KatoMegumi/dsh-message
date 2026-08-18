# Third-party notices

## dsh-im

本项目的统一 Host/Client 插件结构、五渠道设置页面、机器人管理、工作区与 Session 绑定以及部分渠道实现，迁移并修改自 [xmanrui/dsh-im](https://github.com/xmanrui/dsh-im)，版本 0.7.0，提交 `6cb97c6a1141860dc34acfbc577b0e009e1a84b5`。

MIT License

Copyright (c) 2026 xmanrui

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 渠道实现与依赖

- 微信 iLink 请求格式、扫码状态和消息字段改编自 Tencent [`openclaw-weixin`](https://github.com/Tencent/openclaw-weixin)，提交 `cef0bfc390393f716903e16d50408118047f87e0`，MIT License，Copyright Tencent。
- 钉钉设备授权和 AI Card 流式协议改编自 DingTalk Real Team [`dingtalk-openclaw-connector`](https://github.com/DingTalk-Real-AI/dingtalk-openclaw-connector)，提交 `b2fd6e5ea2ff99bd213faac637d3da541b2bfaf4`，MIT License，Copyright 2026 DingTalk Real Team。
- 企业微信二维码授权流程改编自官方 `@wecom/wecom-openclaw-cli` 1.1.0（npm 元数据显示 ISC License）；本项目不打包其 CLI 或 OpenClaw Runtime。
- Host 构建产物包含 `@larksuiteoapi/node-sdk` 1.73.0 及其 `protobufjs` 运行代码。Lark SDK 使用 MIT License；protobufjs 使用 BSD 3-Clause License。
- 运行时依赖 `dingtalk-stream` 2.1.4、`@wecom/aibot-node-sdk` 1.0.7、`@tencent-connect/qqbot-nodejs` 1.0.4 和 `qrcode` 1.5.4，均使用 MIT License。
- QQ 扫码使用官方外部依赖 `@tencent-connect/qqbot-connector` 1.2.0；其 npm 元数据显示 `UNLICENSED`，本项目没有复制该包源码。

## protobufjs BSD 3-Clause License

Copyright (c) 2016, Daniel Wirtz. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of its author, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

本项目是独立的 DeepSeek Harness 集成，不隶属于或受 Tencent、WeCom、Feishu、DingTalk 或 QQ 背书。渠道名称和标识属于各自权利人；设置页中的识别性图形按其原始来源许可使用。
