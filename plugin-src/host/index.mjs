import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getAgentService } from '../../src/agent/service.mjs';
import { ensureImAgentPreset } from '../../src/core/agent-preset.mjs';
import { loadEnvFile } from '../../src/core/envfile.mjs';
import { migrateLegacyData } from '../../src/runtime/migrate.mjs';
import { SILENT_LOGGER } from '../../src/runtime/silent-logger.mjs';
import { apply as applyDingtalk } from './channels/dingtalk/index.mjs';
import { apply as applyFeishu } from './channels/feishu/index.mjs';
import { apply as applyQq } from './channels/qq/index.mjs';
import { apply as applyWecom } from './channels/wecom/index.mjs';
import { apply as applyWeixin } from './channels/weixin/index.mjs';
import { installAgentRpc } from './agent.mjs';

export const name = 'dsh-message-host';
export const inject = ['connection', 'credentials', 'webServer'];
const moduleDirectory = dirname(fileURLToPath(import.meta.url));

function channelConfig(config, name, agent, root) {
  const channel = config[name] ?? {};
  return {
    ...channel,
    agent,
    logger: channel.logger ?? SILENT_LOGGER,
    dataDir: channel.dataDir ?? join(root, 'channels', name),
    ...(config.rpcAuthority === undefined ? {} : { rpcAuthority: config.rpcAuthority }),
  };
}

export function createMessageHostPlugin(internals = {}) {
  const startFeishu = internals.applyFeishu ?? applyFeishu;
  const startWeixin = internals.applyWeixin ?? applyWeixin;
  const startDingtalk = internals.applyDingtalk ?? applyDingtalk;
  const startWecom = internals.applyWecom ?? applyWecom;
  const startQq = internals.applyQq ?? applyQq;
  return Object.freeze({
    name,
    inject,
    async apply(ctx, config = {}) {
      const envCandidates = config.envFile
        ? [resolve(config.envFile)]
        : [
          resolve(moduleDirectory, '../..', 'config', '.env'),
          resolve(moduleDirectory, '..', 'config', '.env'),
          resolve(process.cwd(), 'config', '.env'),
        ];
      for (const envFile of envCandidates) if (loadEnvFile(envFile)) break;
      const dshHome = resolve(config.dshHome ?? process.env.DSH_HOME ?? join(homedir(), '.dsh'));
      // IM 会话使用不含 ask_user_question 的专用预设；缺失时幂等写入 DSH 用户根
      const presetResult = ensureImAgentPreset(dshHome, { logger: config.logger ?? SILENT_LOGGER });
      if (!presetResult.ok) {
        (config.logger ?? SILENT_LOGGER).warn?.(
          `[dsh-message] 无法确保 DSH agent 预设 ${presetResult.preset}：${presetResult.reason}（会话创建将失败并报 UnknownPresetError）`,
        );
      }
      const root = resolve(config.dataDir ?? join(dshHome, 'integrations', 'dsh-message'));
      await migrateLegacyData({ dshHome, root });
      const agent = config.agent ?? getAgentService({
        dataDir: resolve(config.agentDataDir ?? join(root, 'agent')),
        defaultPromptDir: config.defaultPromptDir,
      });
      const disposeAgentRpc = installAgentRpc(ctx, agent, config.rpcAuthority);
      ctx.effect(() => disposeAgentRpc, 'dsh-message: close agent settings RPC');
      await startFeishu(ctx, channelConfig(config, 'feishu', agent, root));
      await startWeixin(ctx, channelConfig(config, 'weixin', agent, root));
      await startDingtalk(ctx, channelConfig(config, 'dingtalk', agent, root));
      await startWecom(ctx, channelConfig(config, 'wecom', agent, root));
      await startQq(ctx, channelConfig(config, 'qq', agent, root));
    },
  });
}

export async function apply(ctx, config = {}) {
  return createMessageHostPlugin().apply(ctx, config);
}

/** @deprecated Use createMessageHostPlugin. */
export const createImHostPlugin = createMessageHostPlugin;
