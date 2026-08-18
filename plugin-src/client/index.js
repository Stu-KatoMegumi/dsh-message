import * as React from 'react'

import {
  DingtalkLogoGlyph,
  FeishuLogoGlyph,
  QqLogoGlyph,
  WecomLogoGlyph,
  WeixinLogoGlyph,
} from './channel-logos.js'
import { DINGTALK_RPC_CHANNEL } from './channels/dingtalk/api.js'
import { DingtalkSettingsTab } from './channels/dingtalk/index.js'
import { installDingtalkStyles } from './channels/dingtalk/styles.js'
import { FeishuSettingsTab } from './channels/feishu/index.js'
import { FEISHU_RPC_CHANNEL } from './channels/feishu/api.js'
import { installFeishuStyles } from './channels/feishu/styles.js'
import { QQ_RPC_CHANNEL } from './channels/qq/api.js'
import { QqSettingsTab } from './channels/qq/index.js'
import { installQqStyles } from './channels/qq/styles.js'
import { WECOM_RPC_CHANNEL } from './channels/wecom/api.js'
import { WecomSettingsTab } from './channels/wecom/index.js'
import { installWecomStyles } from './channels/wecom/styles.js'
import { WeixinSettingsTab } from './channels/weixin/index.js'
import { WEIXIN_RPC_CHANNEL } from './channels/weixin/api.js'
import { installWeixinStyles } from './channels/weixin/styles.js'
import { AgentSettingsTab } from './agent-settings.js'
import { en, h, IM_LOCALE_NAMESPACE, setImTranslator, zh } from './i18n.js'
import { installImStyles } from './styles.js'
import { WorkspaceDirectoryPickerContext } from './workspace-editor.js'

export const name = 'message-settings'
export const inject = ['slots', 'connection', 'locale', 'workspaces']

const MESSAGE_RPC_CHANNEL = '/message-agent'
const MESSAGE_LOGO_URL = globalThis.__DSH_MESSAGE_LOGO_DATA_URL__ ?? 'assets/logo-icon.png'

const CHANNELS = Object.freeze([
  { id: 'weixin', label: '微信' },
  { id: 'feishu', label: '飞书' },
  { id: 'qq', label: 'QQ' },
  { id: 'wecom', label: '企业微信' },
  { id: 'dingtalk', label: '钉钉' },
  { id: 'agent', label: '助手设置' },
])

function ChannelLogo({ channel }) {
  const icons = {
    weixin: WeixinLogoGlyph,
    feishu: FeishuLogoGlyph,
    qq: QqLogoGlyph,
    wecom: WecomLogoGlyph,
    dingtalk: DingtalkLogoGlyph,
  }
  const Icon = icons[channel]
  return h('span', {
    className: `dim-logo dim-logo${channel[0].toUpperCase()}${channel.slice(1)}`,
    'aria-hidden': 'true',
  }, Icon ? h(Icon) : '⚙')
}

export function MessageSettingsTab({
  dingtalkRpcCall,
  feishuRpcCall,
  qqRpcCall,
  wecomRpcCall,
  weixinRpcCall,
  agentRpcCall,
  workspaceDirectoryPicker,
}) {
  const [selected, setSelected] = React.useState('weixin')
  const active = CHANNELS.find((channel) => channel.id === selected) ?? CHANNELS[0]
  return h(WorkspaceDirectoryPickerContext.Provider, { value: workspaceDirectoryPicker },
    h('section', { className: 'dim-page', 'aria-label': 'dsh-message 消息接入设置' },
      h('header', { className: 'dim-title' },
        h('div', { className: 'dim-brand' },
          h('img', {
            className: 'dim-brandLogo',
            src: MESSAGE_LOGO_URL,
            alt: 'dsh-message',
            width: 48,
            height: 48,
          }),
          h('div', null,
            h('strong', null, 'dsh-message'),
            h('p', null, '让五种消息渠道共享同一个 DeepSeek Harness 助手')))),
      h('div', { className: 'dim-layout' },
        h('nav', { className: 'dim-rail', role: 'tablist', 'aria-label': '消息渠道与助手设置' },
          CHANNELS.map((channel) => h('button', {
            key: channel.id,
            type: 'button',
            role: 'tab',
            id: `dim-tab-${channel.id}`,
            className: 'dim-channel',
            'aria-selected': channel.id === active.id,
            'aria-controls': `dim-panel-${channel.id}`,
            onClick: () => setSelected(channel.id),
          }, h(ChannelLogo, { channel: channel.id }),
          h('span', { className: 'dim-channelCopy' }, h('strong', null, channel.label))))),
        h('div', { className: 'dim-divider', 'aria-hidden': 'true' }),
        h('main', {
          className: 'dim-panel',
          role: 'tabpanel',
          id: `dim-panel-${active.id}`,
          'aria-labelledby': `dim-tab-${active.id}`,
        }, active.id === 'weixin'
          ? h(WeixinSettingsTab, { rpcCall: weixinRpcCall })
          : active.id === 'feishu'
            ? h(FeishuSettingsTab, { rpcCall: feishuRpcCall })
            : active.id === 'qq'
              ? h(QqSettingsTab, { rpcCall: qqRpcCall })
              : active.id === 'wecom'
                ? h(WecomSettingsTab, { rpcCall: wecomRpcCall })
                : active.id === 'dingtalk'
                  ? h(DingtalkSettingsTab, { rpcCall: dingtalkRpcCall })
                  : h(AgentSettingsTab, { rpcCall: agentRpcCall })))))
}

export const IMSettingsTab = MessageSettingsTab

export function apply(ctx) {
  ctx.effect(
    () => ctx.locale.register(IM_LOCALE_NAMESPACE, { zh, en }),
    'dsh-message: bilingual dictionaries',
  )
  const t = ctx.locale.bind(IM_LOCALE_NAMESPACE)
  setImTranslator(t)

  ctx.effect(() => {
    const disposers = [
      installFeishuStyles(),
      installWeixinStyles(),
      installWecomStyles(),
      installQqStyles(),
      installDingtalkStyles(),
      installImStyles(),
    ]
    return () => {
      for (const dispose of disposers.reverse()) dispose()
    }
  }, 'dsh-message: install settings styles')

  const rpc = channel => (endpoint, payload, signal) =>
    ctx.connection.rpc.call(channel, endpoint, payload, signal)
  const workspaceDirectoryPicker = Object.freeze({
    listDirectory: (path, signal) => ctx.workspaces.listDirectory(path, signal),
    pickDirectory: () => ctx.workspaces.pickDirectory(),
  })

  ctx.slots.inject('settings.plugins.tab', () => ctx.slots.register({
    name: 'settings.plugins.tab',
    id: 'message',
    order: 20,
    label: () => t('消息接入'),
    locale: IM_LOCALE_NAMESPACE,
    inject: () => ({
      dingtalkRpcCall: rpc(DINGTALK_RPC_CHANNEL),
      feishuRpcCall: rpc(FEISHU_RPC_CHANNEL),
      qqRpcCall: rpc(QQ_RPC_CHANNEL),
      wecomRpcCall: rpc(WECOM_RPC_CHANNEL),
      weixinRpcCall: rpc(WEIXIN_RPC_CHANNEL),
      agentRpcCall: rpc(MESSAGE_RPC_CHANNEL),
      workspaceDirectoryPicker,
    }),
  }, MessageSettingsTab))
}
