import * as React from 'react'

import { h } from './i18n.js'

const ENDPOINTS = {
  status: 'agent.status',
  updateSettings: 'agent.settings.update',
  savePrompt: 'agent.prompt.save',
  resetPrompt: 'agent.prompt.reset',
}

function valueOf(result) {
  if (result?.ok === false) throw new Error(result.error?.message ?? '操作失败')
  return result?.ok === true ? result.value : result
}

export function AgentSettingsTab({ rpcCall }) {
  const [model, setModel] = React.useState({ loading: true, data: null, error: null })
  const [selected, setSelected] = React.useState('system-prompt.md')
  const [content, setContent] = React.useState('')
  const [busy, setBusy] = React.useState(false)

  const load = React.useCallback(async () => {
    try {
      const data = valueOf(await rpcCall(ENDPOINTS.status, {}))
      setModel({ loading: false, data, error: null })
      const prompt = data.prompts?.find((item) => item.name === selected)
      setContent(prompt?.content ?? '')
    } catch (error) {
      setModel({ loading: false, data: null, error })
    }
  }, [rpcCall, selected])

  React.useEffect(() => { void load() }, [load])
  const choose = (name) => {
    setSelected(name)
    setContent(model.data?.prompts?.find((item) => item.name === name)?.content ?? '')
  }
  const invoke = async (endpoint, payload) => {
    setBusy(true)
    try {
      const data = valueOf(await rpcCall(endpoint, payload))
      if (data?.prompts) setModel({ loading: false, data, error: null })
      else await load()
    } catch (error) {
      setModel((current) => ({ ...current, error }))
    } finally {
      setBusy(false)
    }
  }

  if (model.loading) return h('p', null, '正在读取助手设置…')
  if (!model.data) return h('div', { className: 'dxw-error' },
    h('h3', null, '无法读取助手设置'),
    h('p', null, model.error?.message ?? '请稍后重试'),
    h('button', { type: 'button', onClick: () => void load() }, '重试'))

  const settings = model.data.settings
  return h('section', { className: 'dim-agentSettings' },
    h('div', { className: 'dxw-heading' },
      h('div', null, h('h2', null, '助手设置'),
        h('p', null, '提示词、长期记忆和会话策略由五个渠道共享。'))),
    h('div', { className: 'dim-card' },
      h('h3', null, '会话与记忆'),
      [['enabled', '启用助手增强'], ['dailySessions', '每天自动开始新会话'], ['memoryEnabled', '启用长期记忆']]
        .map(([name, label]) => h('label', { key: name, className: 'dim-field' },
          h('input', {
            type: 'checkbox',
            checked: settings[name] !== false,
            disabled: busy,
            onChange: (event) => void invoke(ENDPOINTS.updateSettings, {
              settings: { [name]: event.target.checked },
            }),
          }), ` ${label}`)),
      h('p', null, '简单消息：deepseek-v4-flash/off；复杂任务：deepseek-v4-flash/max。')),
    h('div', { className: 'dim-card' },
      h('h3', null, '提示词与记忆'),
      h('div', { className: 'dim-promptTabs' }, model.data.prompts.map((prompt) => h('button', {
        type: 'button', key: prompt.name, disabled: busy,
        'aria-pressed': selected === prompt.name,
        onClick: () => choose(prompt.name),
      }, prompt.name))),
      h('textarea', {
        value: content,
        rows: 18,
        disabled: busy,
        onChange: (event) => setContent(event.target.value),
        style: { width: '100%', marginTop: 12, fontFamily: 'monospace' },
      }),
      h('div', { style: { display: 'flex', gap: 8, marginTop: 8 } },
        h('button', {
          type: 'button', disabled: busy,
          onClick: () => void invoke(ENDPOINTS.savePrompt, { name: selected, content }),
        }, '保存'),
        h('button', {
          type: 'button', disabled: busy,
          onClick: () => void invoke(ENDPOINTS.resetPrompt, { name: selected }),
        }, '恢复默认'))),
    h('p', { className: 'dim-muted' }, `数据目录：${model.data.dataDir}`),
    model.error ? h('p', { className: 'dxw-error' }, model.error.message) : null)
}
