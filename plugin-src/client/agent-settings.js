import * as React from 'react'

import { h } from './i18n.js'

const ENDPOINTS = {
  status: 'agent.status',
  updateSettings: 'agent.settings.update',
  savePrompt: 'agent.prompt.save',
  resetPrompt: 'agent.prompt.reset',
}

const TOGGLES = [
  ['enabled', '启用助手增强', '为五个消息渠道注入共享提示词与模型策略'],
  ['dailySessions', '每天自动开始新会话', '按本机日期隔离上下文，避免会话无限增长'],
  ['memoryEnabled', '启用长期记忆', '允许模型维护并在新会话读取 memory.md'],
]

function valueOf(result) {
  if (result?.ok === false) throw new Error(result.error?.message ?? '操作失败')
  return result?.ok === true ? result.value : result
}

function modelValue(choice) {
  return choice ? `${choice.model}/${choice.reasoningEffort}` : ''
}

function SettingToggle({ name, label, description, checked, busy, onChange }) {
  return h('label', { className: 'dim-agentToggle' },
    h('span', { className: 'dim-agentToggleCopy' },
      h('strong', null, label),
      h('small', null, description)),
    h('input', {
      className: 'dim-agentSwitch',
      type: 'checkbox',
      name,
      checked,
      disabled: busy,
      onChange,
    }))
}

function ModelSelect({ name, label, description, value, options, busy, onChange }) {
  return h('label', { className: 'dim-agentModelField' },
    h('span', { className: 'dim-agentFieldLabel' }, label),
    h('span', { className: 'dim-agentFieldHint' }, description),
    h('span', { className: 'dim-agentSelectWrap' },
      h('select', { name, value, disabled: busy, onChange },
        options.map((option) => {
          const optionValue = modelValue(option)
          return h('option', { key: optionValue, value: optionValue }, optionValue)
        }))))
}

export function AgentSettingsTab({ rpcCall }) {
  const [model, setModel] = React.useState({ loading: true, data: null, error: null })
  const [selected, setSelected] = React.useState('system-prompt.md')
  const [content, setContent] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [notice, setNotice] = React.useState('')

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
    setNotice('')
  }

  const invoke = async (endpoint, payload) => {
    setBusy(true)
    setNotice('')
    setModel((current) => ({ ...current, error: null }))
    try {
      const data = valueOf(await rpcCall(endpoint, payload))
      if (data?.prompts) {
        setModel({ loading: false, data, error: null })
        setContent(data.prompts.find((item) => item.name === selected)?.content ?? '')
      } else if (endpoint === ENDPOINTS.updateSettings) {
        setModel((current) => ({
          loading: false,
          error: null,
          data: { ...current.data, settings: data },
        }))
      } else {
        await load()
      }
      setNotice(endpoint === ENDPOINTS.savePrompt
        ? '提示词已保存'
        : endpoint === ENDPOINTS.resetPrompt
          ? '已恢复默认内容'
          : '设置已保存')
    } catch (error) {
      setModel((current) => ({ ...current, error }))
    } finally {
      setBusy(false)
    }
  }

  if (model.loading) return h('div', { className: 'dim-agentLoading dim-surfaceCard' },
    h('div', { className: 'dim-spinner' }), h('span', null, '正在读取助手设置…'))
  if (!model.data) return h('div', { className: 'dim-agentError dim-surfaceCard' },
    h('h3', null, '无法读取助手设置'),
    h('p', null, model.error?.message ?? '请稍后重试'),
    h('button', { className: 'dim-agentButton dim-agentButtonPrimary', type: 'button', onClick: () => void load() }, '重试'))

  const settings = model.data.settings
  const options = model.data.modelOptions ?? []
  const updateModel = (name, value) => {
    const choice = options.find((option) => modelValue(option) === value)
    if (choice) void invoke(ENDPOINTS.updateSettings, { settings: { [name]: choice } })
  }

  return h('section', { className: 'dim-agentSettings' },
    h('header', { className: 'dim-agentHeader' },
      h('div', null,
        h('h2', null, '助手设置'),
        h('p', null, '提示词、长期记忆和会话策略由五个渠道共享。')),
      notice ? h('span', { className: 'dim-agentNotice', role: 'status' }, notice) : null),

    h('article', { className: 'dim-agentCard dim-surfaceCard' },
      h('div', { className: 'dim-agentCardHeader' },
        h('div', null,
          h('h3', null, '会话与记忆'),
          h('p', null, '控制助手增强能力，并为不同任务强度选择模型。'))),
      h('div', { className: 'dim-agentCardBody' },
        h('div', { className: 'dim-agentToggleList' }, TOGGLES.map(([name, label, description]) =>
          h(SettingToggle, {
            key: name,
            name,
            label,
            description,
            checked: settings[name] !== false,
            busy,
            onChange: (event) => void invoke(ENDPOINTS.updateSettings, {
              settings: { [name]: event.target.checked },
            }),
          }))),
        h('div', { className: 'dim-agentRule' }),
        h('div', { className: 'dim-agentModelGrid' },
          h(ModelSelect, {
            name: 'fastModel',
            label: '简单消息模型',
            description: '短消息与普通聊天默认使用',
            value: modelValue(settings.fastModel),
            options,
            busy,
            onChange: (event) => updateModel('fastModel', event.target.value),
          }),
          h(ModelSelect, {
            name: 'complexModel',
            label: '复杂任务模型',
            description: '长消息、分析和执行类任务使用',
            value: modelValue(settings.complexModel),
            options,
            busy,
            onChange: (event) => updateModel('complexModel', event.target.value),
          })))),

    h('article', { className: 'dim-agentCard dim-surfaceCard' },
      h('div', { className: 'dim-agentCardHeader dim-agentPromptHeader' },
        h('div', null,
          h('h3', null, '提示词与记忆'),
          h('p', null, '选择文件后直接编辑；memory.md 会与运行时长期记忆同步。')),
        h('span', { className: 'dim-agentFileState' },
          model.data.prompts.find((item) => item.name === selected)?.isDefault ? '默认内容' : '已自定义')),
      h('div', { className: 'dim-agentCardBody dim-agentEditorBody' },
        h('div', { className: 'dim-promptTabs', role: 'tablist', 'aria-label': '提示词文件' },
          model.data.prompts.map((prompt) => h('button', {
            type: 'button',
            role: 'tab',
            key: prompt.name,
            disabled: busy,
            'aria-selected': selected === prompt.name,
            onClick: () => choose(prompt.name),
          }, prompt.name))),
        h('textarea', {
          className: 'dim-agentEditor',
          value: content,
          rows: 15,
          disabled: busy,
          spellCheck: false,
          'aria-label': `${selected} 内容`,
          onChange: (event) => setContent(event.target.value),
        }),
        h('div', { className: 'dim-agentEditorFooter' },
          h('span', { className: 'dim-agentEditorMeta' }, `${content.length.toLocaleString()} 字符`),
          h('div', { className: 'dim-agentActions' },
            h('button', {
              className: 'dim-agentButton dim-agentButtonSecondary',
              type: 'button',
              disabled: busy,
              onClick: () => void invoke(ENDPOINTS.resetPrompt, { name: selected }),
            }, '恢复默认'),
            h('button', {
              className: 'dim-agentButton dim-agentButtonPrimary',
              type: 'button',
              disabled: busy,
              onClick: () => void invoke(ENDPOINTS.savePrompt, { name: selected, content }),
            }, busy ? '正在保存…' : '保存修改'))))),

    h('div', { className: 'dim-agentDataPath' },
      h('span', null, '数据目录'),
      h('code', null, model.data.dataDir)),
    model.error ? h('p', { className: 'dim-agentInlineError', role: 'alert' }, model.error.message) : null)
}
