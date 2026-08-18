window.__ModuleLoader__.load({
  id: '@stu-xie/dsh-message',
  factory: (require) => {
    const module = { exports: {} }
    const exports = module.exports
    const React = require('react')
    const { useCallback, useEffect, useState } = React
    const h = React.createElement

    const input = {
      width: '100%', boxSizing: 'border-box', padding: '7px 9px', font: 'inherit', fontSize: 13,
      borderRadius: 6, border: '1px solid var(--dsw-alias-border-strong, #cbd2dc)',
      background: 'var(--dsw-alias-bg, #fff)', color: 'inherit',
    }
    const row = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }
    const field = { marginBottom: 12 }
    const label = { display: 'block', marginBottom: 4, fontSize: 12, opacity: 0.8 }

    async function api(method, payload = {}) {
      const response = await fetch(`/_dsh/dsh-message/api/${method}`, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload),
      })
      const body = await response.json().catch(() => null)
      if (!response.ok || !body?.ok) throw new Error(body?.error?.message || `HTTP ${response.status}`)
      return body.value
    }

    function Field({ title, children }) {
      return h('div', { style: field }, h('label', { style: label }, title), children)
    }

    function Toggle({ title, checked, onChange }) {
      return h('label', { style: { display: 'flex', alignItems: 'center', gap: 7, fontSize: 13 } },
        h('input', { type: 'checkbox', checked, onChange: event => onChange(event.target.checked) }), title)
    }

    function Settings() {
      const [status, setStatus] = useState(null)
      const [draft, setDraft] = useState(null)
      const [message, setMessage] = useState('')
      const [busy, setBusy] = useState(false)
      const refresh = useCallback(async () => {
        try {
          const value = await api('status')
          setStatus(value)
          setDraft(current => current || {
            ...value.settings,
            allowlistText: (value.settings.allowlist || []).join('\n'),
            jobsText: JSON.stringify(value.settings.jobs || [], null, 2),
          })
        } catch (error) { setMessage(error.message) }
      }, [])
      useEffect(() => {
        void refresh()
        const timer = setInterval(() => void refresh(), 15000)
        return () => clearInterval(timer)
      }, [refresh])
      const set = (key, value) => setDraft(current => ({ ...current, [key]: value }))
      const save = async () => {
        setBusy(true)
        try {
          const jobs = JSON.parse(draft.jobsText || '[]')
          await api('settings.update', { patch: {
            enabled: draft.enabled, streaming: draft.streaming, typing: draft.typing,
            mediaEnabled: draft.mediaEnabled, renewalEnabled: draft.renewalEnabled,
            accessPolicy: draft.accessPolicy,
            allowlist: draft.allowlistText.split(/\r?\n|,/).map(v => v.trim()).filter(Boolean),
            streamFlushChars: Number(draft.streamFlushChars), streamFlushMs: Number(draft.streamFlushMs),
            slowAckMs: Number(draft.slowAckMs), turnTimeoutMs: Number(draft.turnTimeoutMs), jobs,
          } })
          setMessage('设置已保存并热更新。')
          await refresh()
        } catch (error) { setMessage(`保存失败：${error.message}`) } finally { setBusy(false) }
      }
      const login = async () => {
        setBusy(true)
        try {
          await api('login.start')
          setMessage('已弹出扫码窗口，完成扫码后窗口将自动关闭。')
        } catch (error) { setMessage(`生成二维码失败：${error.message}`) } finally { setBusy(false) }
      }
      if (!draft) return h('div', null, '正在读取 dsh-message 状态…')
      const connected = status?.wechat?.connected
      return h('div', { style: { maxWidth: 760, paddingBottom: 30 } },
        h('h2', { style: { margin: '0 0 8px' } }, '微信 dsh-message'),
        h('div', { style: { marginBottom: 16, fontSize: 13, color: connected ? '#258750' : '#b56a00' } },
          connected ? '● 微信已连接' : '● 微信未登录',
          ` · 已知用户 ${status?.users || 0} · 最近轮询 ${status?.wechat?.lastSuccessAt ? new Date(status.wechat.lastSuccessAt).toLocaleString() : '无'}`),
        h('button', { type: 'button', disabled: busy, onClick: login, style: { ...input, width: 'auto', cursor: 'pointer', marginBottom: 18 } },
          connected ? '扫码续期' : '扫码登录'),
        h('div', { style: row },
          h(Toggle, { title: '启用通道', checked: draft.enabled, onChange: value => set('enabled', value) }),
          h(Toggle, { title: '流式输出', checked: draft.streaming, onChange: value => set('streaming', value) }),
          h(Toggle, { title: '显示“正在输入”', checked: draft.typing, onChange: value => set('typing', value) }),
          h(Toggle, { title: '媒体/文件收发', checked: draft.mediaEnabled, onChange: value => set('mediaEnabled', value) }),
          h(Toggle, { title: '到期前在工作时间提醒全部已知用户续期', checked: draft.renewalEnabled, onChange: value => set('renewalEnabled', value) })),
        h(Field, { title: '私聊权限模式' }, h('select', { style: input, value: draft.accessPolicy, onChange: event => set('accessPolicy', event.target.value) },
          h('option', { value: 'pairing' }, 'pairing - 允许所有私聊'), h('option', { value: 'allowlist' }, 'allowlist - 仅白名单'), h('option', { value: 'disabled' }, 'disabled - 关闭'))),
        h(Field, { title: '白名单（每行一个用户 ID）' }, h('textarea', { style: { ...input, minHeight: 88 }, value: draft.allowlistText, onChange: event => set('allowlistText', event.target.value) })),
        h('div', { style: row },
          h(Field, { title: '单气泡长度上限（字符，超限强制切分）' }, h('input', { style: input, type: 'number', value: draft.streamFlushChars, onChange: event => set('streamFlushChars', event.target.value) })),
          h(Field, { title: '空闲超时（ms，无新内容自动发出）' }, h('input', { style: input, type: 'number', value: draft.streamFlushMs, onChange: event => set('streamFlushMs', event.target.value) })),
          h(Field, { title: '慢任务提示延迟（ms）' }, h('input', { style: input, type: 'number', value: draft.slowAckMs, onChange: event => set('slowAckMs', event.target.value) })),
          h(Field, { title: '单轮超时（ms）' }, h('input', { style: input, type: 'number', value: draft.turnTimeoutMs, onChange: event => set('turnTimeoutMs', event.target.value) }))),
        h('div', { style: { fontSize: 12, opacity: 0.7, marginBottom: 14 } },
          '气泡规则：模型输出三个连续换行（\n\n\n）即结束当前气泡并开始下一条；单/双换行只是段落排版。长度上限按当前气泡累计，超过或空闲超时也会自动切分。'),
        h(Field, { title: '定时任务 JSON（id / cron / userId / prompt / enabled）' },
          h('textarea', { style: { ...input, minHeight: 130, fontFamily: 'monospace' }, value: draft.jobsText, onChange: event => set('jobsText', event.target.value) })),
        h('button', { type: 'button', disabled: busy, onClick: save, style: { ...input, width: 'auto', cursor: 'pointer', background: '#2878d0', color: '#fff', border: 0 } }, busy ? '处理中…' : '保存设置'),
        h(PromptEditor, { api, busy }),
        message ? h('div', { style: { marginTop: 10, fontSize: 13 } }, message) : null,
      )
    }

    const promptMeta = [
      { name: 'system-prompt.md', label: '系统设定', hint: '总纲与气泡契约（空行=新气泡），修改后下一条消息生效' },
      { name: 'soul.md', label: '人设与灵魂', hint: '性格、语气、价值观' },
      { name: 'rules.md', label: '行为规则', hint: '硬性规则与禁区' },
      { name: 'memory.md', label: '背景记忆', hint: 'LLM 根据用户意图自动新增、更新或删除，也可在此人工编辑' },
    ]

    function PromptEditor({ api, busy }) {
      const [prompts, setPrompts] = useState(null)
      const [message, setMessage] = useState('')
      const [saving, setSaving] = useState('')
      const load = useCallback(async () => {
        try { setPrompts(await api('prompt.list')) } catch (error) { setMessage(error.message) }
      }, [api])
      useEffect(() => { void load() }, [load])
      if (!prompts) return h('div', { style: { marginTop: 22 } }, '正在读取 prompt 文件…')
      return h('div', { style: { marginTop: 22, borderTop: '1px solid var(--dsw-alias-border-strong, #e2e6ec)', paddingTop: 16 } },
        h('h3', { style: { margin: '0 0 4px', fontSize: 14 } }, 'Prompt 定制'),
        h('div', { style: { fontSize: 12, opacity: 0.7, marginBottom: 12 } },
          `Prompt 编辑目录：${prompts.dir}；记忆文件：${prompts.memoryFile}。静态 Prompt 修改会创建新会话；记忆在下一次新会话注入。`),
        prompts.files.map(entry => {
          const meta = promptMeta.find(item => item.name === entry.name) || { name: entry.name, label: entry.name, hint: '' }
          return h('div', { key: entry.name, style: { marginBottom: 16 } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 } },
              h('label', { style: { fontSize: 13, fontWeight: 600 } }, meta.label),
              h('span', { style: { fontSize: 11, opacity: 0.6 } }, entry.name),
              entry.isDefault ? h('span', { style: { fontSize: 11, color: '#258750' } }, '（默认内容）') : null),
            h('div', { style: { fontSize: 12, opacity: 0.7, marginBottom: 4 } }, meta.hint),
            h('textarea', { style: { ...input, minHeight: 130, fontFamily: 'monospace', fontSize: 12 }, value: entry.content, onChange: event => {
              setPrompts(current => ({ ...current, files: current.files.map(item => item.name === entry.name ? { ...item, content: event.target.value } : item) }))
            } }),
            h('div', { style: { display: 'flex', gap: 8, marginTop: 6 } },
              h('button', { type: 'button', disabled: busy || saving === entry.name, onClick: async () => {
                setSaving(entry.name)
                try {
                  await api('prompt.save', { name: entry.name, content: entry.content })
                  setMessage(`已保存 ${entry.name}。`)
                  await load()
                } catch (error) { setMessage(`保存失败：${error.message}`) } finally { setSaving('') }
              }, style: { ...input, width: 'auto', cursor: 'pointer' } }, '保存'),
              h('button', { type: 'button', disabled: busy || saving === entry.name, onClick: async () => {
                setSaving(entry.name)
                try {
                  await api('prompt.reset', { name: entry.name })
                  setMessage(`已重置 ${entry.name} 为默认内容。`)
                  await load()
                } catch (error) { setMessage(`重置失败：${error.message}`) } finally { setSaving('') }
              }, style: { ...input, width: 'auto', cursor: 'pointer' } }, '重置默认'),
            ),
          )
        }),
        message ? h('div', { style: { marginTop: 10, fontSize: 13 } }, message) : null,
      )
    }

    function apply(ctx) {
      ctx.effect(() => ctx.slots.inject('settings.section', function* () {
        yield ctx.slots.register({ name: 'settings.section', id: 'dsh-message', order: 25, label: '微信' }, Settings)
      }), 'dsh-message: settings page')
    }
    exports.apply = apply
    exports.inject = ['slots']
    return module.exports
  },
})
