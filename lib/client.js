window.__ModuleLoader__.load({
  id: "@stu-xie/dsh-message",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// plugin-src/client/index.js
var index_exports = {};
__export(index_exports, {
  IMSettingsTab: () => IMSettingsTab,
  MessageSettingsTab: () => MessageSettingsTab,
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var React14 = __toESM(require("react"), 1);

// plugin-src/client/channel-logos.js
var React = __toESM(require("react"), 1);
var h = React.createElement;
function dimensions(size) {
  return size === void 0 ? {} : { width: size, height: size };
}
function WeixinLogoGlyph({ size } = {}) {
  return h("svg", {
    ...dimensions(size),
    viewBox: "0 0 24 24",
    focusable: "false",
    "aria-hidden": "true",
    "data-im-channel-logo": "weixin"
  }, h("path", {
    fill: "currentColor",
    d: "M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"
  }));
}
function FeishuLogoGlyph({ size } = {}) {
  return h(
    "svg",
    {
      ...dimensions(size),
      viewBox: "0 0 24 24",
      focusable: "false",
      "aria-hidden": "true",
      "data-im-channel-logo": "feishu"
    },
    h("path", { fill: "#00D6B9", d: "M7.2 4.5h7.6c1.2 0 2.1.55 2.7 1.58 1.05 1.8 1.55 3.45 1.58 4.95-2.04-.62-4.2-.15-6.22 1.45C11.3 9.7 9.42 7.04 7.2 4.5Z" }),
    h("path", { fill: "#1456B8", d: "M10.8 13.55c3.3-2.93 5.72-4.24 9.47-2.52-1.2 1.45-2.27 4.18-3.86 5.43-1.67 1.31-3.9.5-5.61-.64v-2.27Z" }),
    h("path", { fill: "#3370FF", d: "M4.4 8.35c3.47 3.61 7.25 6.1 10.33 5.7 1.06-.14 2.2-.72 3.4-1.72-1.04 2.65-2.6 4.8-5.06 6-2.46 1.2-5.56.52-7.42-.72A2.76 2.76 0 0 1 4.4 15.3V8.35Z" })
  );
}
function DingtalkLogoGlyph({ size } = {}) {
  return h("svg", {
    ...dimensions(size),
    viewBox: "0 0 48 48",
    focusable: "false",
    "aria-hidden": "true",
    "data-im-channel-logo": "dingtalk"
  }, h("path", {
    fill: "currentColor",
    d: "M37.05 22.783c-6.758-5.216-14.378-12.128-22.73-19.538-.655-.585-1.242-.354-1.536.42-1.88 4.973-.058 9.386 2.889 11.932s7.368 4.912 10.058 6.155c.105.049.013.203-.093.163-4.953-2.182-8.397-3.765-13.07-7.368-.497-.388-1.01-.242-1.07.521-.384 4.748 2.657 8.483 6.058 9.745 2.1.781 4.398 1.212 6.53 1.474.109.015.084.178-.027.178-2.747.01-6.058-.654-8.935-1.751-.606-.233-.818.25-.722.633.491 2.008 2.974 5.076 6.926 5.73a12 12 0 0 0 2.228.115c.164 0 .208.089.154.217q-2.685 4.6-2.803 4.797c-.091.152-.036.275.156.275h3.543c.164 0 .264.106.18.246l-4.958 8.196c-.191.328.035.565.395.301s15.212-11.133 15.636-11.448c.195-.142.148-.327-.124-.327h-3.18c-.206 0-.252-.14-.111-.28.14-.141 3.602-3.594 4.837-4.888 1.283-1.35 1.938-3.825-.231-5.498"
  }));
}
function QqLogoGlyph({ size } = {}) {
  return h("svg", {
    ...dimensions(size),
    viewBox: "0 0 24 24",
    focusable: "false",
    "aria-hidden": "true",
    "data-im-channel-logo": "qq"
  }, h("path", {
    fill: "currentColor",
    d: "M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673"
  }));
}
function WecomLogoGlyph({ size } = {}) {
  return h(
    "svg",
    {
      ...dimensions(size),
      viewBox: "0 0 24 24",
      focusable: "false",
      "aria-hidden": "true",
      "data-im-channel-logo": "wecom"
    },
    h("path", {
      fill: "none",
      stroke: "#3370FF",
      strokeWidth: "2.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M17.7 14.5c1.05-1.12 1.65-2.52 1.65-4.03 0-3.82-3.58-6.92-8-6.92s-8 3.1-8 6.92 3.58 6.92 8 6.92c1.17 0 2.28-.22 3.28-.62"
    }),
    h("path", { fill: "#07C160", d: "M16.1 15.15c.7-.7 1.83-.7 2.53 0s.7 1.83 0 2.53-1.83.7-2.53 0-.7-1.83 0-2.53Z" }),
    h("path", { fill: "#FFB800", d: "M19.25 13.45a1.36 1.36 0 1 1 1.92 1.92 1.36 1.36 0 0 1-1.92-1.92Z" }),
    h("path", { fill: "#FF7A00", d: "M19.55 18.05a1.16 1.16 0 1 1 1.64 1.64 1.16 1.16 0 0 1-1.64-1.64Z" }),
    h("path", { fill: "#3370FF", d: "M15.25 18.75a.92.92 0 1 1 1.3 1.3.92.92 0 0 1-1.3-1.3Z" })
  );
}

// plugin-src/client/channels/dingtalk/api.js
var DINGTALK_RPC_CHANNEL = "/dingtalk";
var DINGTALK_ENDPOINTS = Object.freeze({
  status: "connection.status",
  beginProvisioning: "provision.begin",
  pollProvisioning: "provision.poll",
  cancelProvisioning: "provision.cancel",
  bindCredentials: "bot.bind-credentials",
  reconnectBot: "bot.reconnect",
  deleteBot: "bot.delete",
  setWorkspace: "bot.workspace.set"
});
var ACCOUNT_STATES = /* @__PURE__ */ new Set(["connected", "connecting", "offline", "error"]);
var SNAPSHOT_STATES = /* @__PURE__ */ new Set(["disconnected", "offline", "provisioning", "connected", "degraded"]);
var PROVISION_STATES = /* @__PURE__ */ new Set([
  "starting",
  "pending",
  "scanned",
  "authorizing",
  "creating",
  "connecting",
  "connected",
  "expired",
  "failed",
  "cancelled"
]);
var HEALTH_STATES = /* @__PURE__ */ new Set(["healthy", "checking", "degraded", "offline"]);
var FORBIDDEN_ERROR_FIELDS = /(client[_-]?secret|secret[_-]?ref|device[_-]?code|app[_-]?secret|access[_-]?token|token)/i;
var QR_DATA_URL = /^data:image\/(?:png|webp);base64,[a-z\d+/]+={0,2}$/i;
var MAX_QR_SOURCE_LENGTH = 2 * 1024 * 1024;
function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function optionalString(value, maxLength = 240) {
  if (typeof value !== "string") return void 0;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : void 0;
}
function opaqueId(value) {
  const id3 = optionalString(value, 128);
  return id3 && /^[a-z\d_-]+$/i.test(id3) ? id3 : void 0;
}
function timestamp(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? void 0 : parsed;
  }
  return void 0;
}
function nonNegativeInteger(value) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0 ? number : 0;
}
function clamp(value, min, max, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
}
function safeErrorCode(value, fallback) {
  const code = optionalString(value, 80);
  return code && /^[a-z][a-z\d_.:-]*$/i.test(code) && !FORBIDDEN_ERROR_FIELDS.test(code) ? code : fallback;
}
function sanitizeMessage(value, fallback) {
  const message = optionalString(value, 480) ?? fallback;
  if (FORBIDDEN_ERROR_FIELDS.test(message)) return fallback;
  return message.replace(/([=:]\s*)[^\s,;，。]+/g, "$1\u2022\u2022\u2022\u2022\u2022\u2022").slice(0, 240);
}
function normalizeError(value, fallbackCode, fallbackMessage) {
  if (!isRecord(value)) return void 0;
  return {
    code: safeErrorCode(value.code, fallbackCode),
    message: sanitizeMessage(value.message, fallbackMessage)
  };
}
function unwrapRpcResult(result) {
  if (!isRecord(result) || typeof result.ok !== "boolean") {
    throw new Error("\u9489\u9489\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u54CD\u5E94");
  }
  if (!result.ok) {
    const error = new Error(sanitizeMessage(result.error?.message, "\u9489\u9489\u64CD\u4F5C\u5931\u8D25"));
    error.code = safeErrorCode(result.error?.code, "DINGTALK_RPC_ERROR");
    throw error;
  }
  return result.value;
}
function safeQrSource(value) {
  if (typeof value !== "string" || value.length > MAX_QR_SOURCE_LENGTH) return void 0;
  return QR_DATA_URL.test(value) ? value : void 0;
}
function normalizeProvisioning(value, now = Date.now()) {
  const source = isRecord(value?.provisioning) ? value.provisioning : value;
  if (!isRecord(source)) throw new Error("\u9489\u9489\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u626B\u7801\u7ED1\u5B9A\u8FDB\u5EA6");
  const attemptId = opaqueId(source.attemptId);
  if (!attemptId) throw new Error("\u9489\u9489\u626B\u7801\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u7ED1\u5B9A\u4EFB\u52A1");
  const reportedStatus = optionalString(source.status, 32) ?? optionalString(source.state, 32);
  const status = PROVISION_STATES.has(reportedStatus) ? reportedStatus : "failed";
  const expiresAt = timestamp(source.expiresAt) ?? now + clamp(source.expiresIn, 1, 2 * 60 * 60, 10 * 60) * 1e3;
  const result = {
    attemptId,
    status,
    expiresAt,
    pollIntervalMs: clamp(source.pollIntervalMs, 1e3, 1e4, 3e3)
  };
  const qrCodeDataUrl = safeQrSource(source.qrCodeDataUrl);
  if (qrCodeDataUrl) result.qrCodeDataUrl = qrCodeDataUrl;
  if (opaqueId(source.botId)) result.botId = opaqueId(source.botId);
  if (source.alreadyConnected === true) result.alreadyConnected = true;
  const error = normalizeError(
    source.error,
    "DINGTALK_PROVISION_FAILED",
    "\u9489\u9489\u673A\u5668\u4EBA\u6CA1\u6709\u63A5\u5165\u5B8C\u6210"
  );
  if (error) result.error = error;
  return result;
}
function normalizeBot(value) {
  if (!isRecord(value)) return void 0;
  const botId = opaqueId(value.botId);
  if (!botId) return void 0;
  const bot = isRecord(value.bot) ? value.bot : {};
  const connected = value.connected === true;
  const reportedState = ACCOUNT_STATES.has(value.state) ? value.state : "offline";
  const state = connected ? "connected" : reportedState === "connected" ? "connecting" : reportedState;
  const health = isRecord(value.health) ? value.health : {};
  const stats = isRecord(value.stats) ? value.stats : {};
  return {
    botId,
    state,
    connected,
    configured: value.configured !== false,
    workspace: optionalString(value.workspace, 4096) ?? "",
    bot: {
      name: optionalString(bot.name, 100) ?? "\u9489\u9489\u673A\u5668\u4EBA",
      clientIdMasked: optionalString(bot.clientIdMasked, 140) ?? "\u5DF2\u5B89\u5168\u4FDD\u5B58"
    },
    health: {
      status: HEALTH_STATES.has(health.status) ? health.status : connected ? "healthy" : "offline",
      summary: optionalString(health.summary, 200) ?? (connected ? "\u9489\u9489 Stream \u957F\u8FDE\u63A5\u8FD0\u884C\u6B63\u5E38" : "\u9489\u9489\u8FDE\u63A5\u5C1A\u672A\u5C31\u7EEA"),
      lastCheckedAt: timestamp(health.lastCheckedAt),
      lastConnectedAt: timestamp(health.lastConnectedAt)
    },
    stats: {
      messagesReceived: nonNegativeInteger(stats.messagesReceived),
      messagesReplied: nonNegativeInteger(stats.messagesReplied)
    },
    error: normalizeError(value.error, "DINGTALK_ACCOUNT_ERROR", "\u9489\u9489\u8FDE\u63A5\u5C1A\u672A\u5C31\u7EEA") ?? null
  };
}
function normalizeSnapshot(value) {
  const source = isRecord(value?.snapshot) ? value.snapshot : value;
  if (!isRecord(source) || !Array.isArray(source.bots)) {
    throw new Error("\u9489\u9489\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u673A\u5668\u4EBA\u5217\u8868");
  }
  const seen = /* @__PURE__ */ new Set();
  const bots = source.bots.map(normalizeBot).filter((bot) => {
    if (!bot || seen.has(bot.botId)) return false;
    seen.add(bot.botId);
    return true;
  });
  return {
    schemaVersion: Number.isSafeInteger(source.schemaVersion) ? source.schemaVersion : 1,
    revision: nonNegativeInteger(source.revision),
    state: SNAPSHOT_STATES.has(source.state) ? source.state : "offline",
    bots,
    totals: {
      configured: bots.length,
      connected: bots.filter((bot) => bot.connected).length
    },
    provisioning: source.provisioning ? normalizeProvisioning(source.provisioning) : null
  };
}
function presentError(error) {
  return {
    code: safeErrorCode(error?.code, "DINGTALK_ERROR"),
    message: sanitizeMessage(error?.message, "\u9489\u9489\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5")
  };
}
function formatRemaining(milliseconds) {
  const seconds = Math.max(0, Math.ceil(Number(milliseconds) / 1e3) || 0);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

// plugin-src/client/channels/dingtalk/index.js
var React7 = __toESM(require("react"), 1);

// plugin-src/client/credential-binding.js
var React3 = __toESM(require("react"), 1);

// plugin-src/client/i18n.js
var React2 = __toESM(require("react"), 1);
var IM_LOCALE_NAMESPACE = "dsh-message";
var EN = Object.freeze({
  "$locale": "en",
  "IM\u673A\u5668\u4EBA": "IM bots",
  "IM\u673A\u5668\u4EBA\u8BBE\u7F6E": "IM bot settings",
  "IM \u6E20\u9053": "IM channels",
  "\u8BA9\u804A\u5929\u673A\u5668\u4EBA\u8F7B\u677E\u63A5\u5165 DeepSeek Harness": "Connect IM bots to DeepSeek Harness with ease",
  "\u5E2E\u52A9\u4E0E\u53CD\u9988 \xB7 \u524D\u5F80 GitHub": "Help & feedback \xB7 Open GitHub",
  "\u5FAE\u4FE1": "WeChat",
  "\u98DE\u4E66": "Feishu",
  "\u9489\u9489": "DingTalk",
  "\u4F01\u4E1A\u5FAE\u4FE1": "WeCom",
  "\u5FAE\u4FE1\u673A\u5668\u4EBA": "WeChat bot",
  "\u98DE\u4E66\u673A\u5668\u4EBA": "Feishu bot",
  "\u9489\u9489\u673A\u5668\u4EBA": "DingTalk bot",
  "\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA": "WeCom bot",
  "QQ\u673A\u5668\u4EBA": "QQ bot",
  "WhatsApp\u673A\u5668\u4EBA": "WhatsApp bot",
  "WhatsApp\u8D26\u53F7": "WhatsApp account",
  "\u5FAE\u4FE1\u8BBE\u7F6E": "WeChat settings",
  "\u98DE\u4E66\u673A\u5668\u4EBA\u8BBE\u7F6E": "Feishu bot settings",
  "\u9489\u9489\u8BBE\u7F6E": "DingTalk settings",
  "\u4F01\u4E1A\u5FAE\u4FE1\u8BBE\u7F6E": "WeCom settings",
  "\u626B\u7801\u63A5\u5165\u673A\u5668\u4EBA": "Scan QR code",
  "\u6B63\u5728\u63A5\u5165": "Connecting",
  "\u624B\u52A8\u63A5\u5165": "Manual setup",
  "\u6536\u8D77\u51ED\u636E": "Hide credentials",
  "\u6536\u8D77\u63A5\u5165": "Hide setup",
  "\u63A5\u5165\u673A\u5668\u4EBA": "Connect bot",
  "\u5F00\u59CB\u63A5\u5165": "Start setup",
  "\u5728\u7EBF": "online",
  "\u8FD0\u884C\u6B63\u5E38": "Connected",
  "\u6B63\u5728\u8FDE\u63A5": "Connecting",
  "\u6B63\u5728\u8FDE\u63A5\u2026": "Connecting\u2026",
  "\u8FDE\u63A5\u672A\u5C31\u7EEA": "Not connected",
  "\u8FDE\u63A5\u4E2D": "Connecting",
  "\u8FDE\u63A5\u4E2D\u65AD": "Disconnected",
  "\u9700\u8981\u5904\u7406": "Needs attention",
  "\u72B6\u6001\u672A\u77E5": "Unknown status",
  "\u79BB\u7EBF": "Offline",
  "\u5DF2\u65AD\u5F00": "Disconnected",
  "\u6D88\u606F\u901A\u9053": "Message channel",
  "\u6700\u8FD1\u68C0\u67E5": "Last checked",
  "\u5F53\u524D\u5DE5\u4F5C\u533A": "Current workspace",
  "\u9009\u62E9\u76EE\u5F55": "Choose folder",
  "\u9009\u62E9\u673A\u5668\u4EBA\u5DE5\u4F5C\u533A\u76EE\u5F55": "Select bot workspace folder",
  "\u5F53\u524D\u76EE\u5F55": "Current folder",
  "\u4E3B\u76EE\u5F55": "Home",
  "\u6B63\u5728\u51C6\u5907\u76EE\u5F55\u9009\u62E9\u5668\u2026": "Preparing folder picker\u2026",
  "\u6B63\u5728\u8BFB\u53D6\u76EE\u5F55\u2026": "Loading folders\u2026",
  "\u8FD9\u4E2A\u76EE\u5F55\u4E2D\u6CA1\u6709\u5B50\u6587\u4EF6\u5939\u3002": "This folder has no subfolders.",
  "\u6B64\u76EE\u5F55\u7684\u5B50\u6587\u4EF6\u5939\u8FC7\u591A\uFF0C\u4EC5\u663E\u793A\u524D\u4E00\u90E8\u5206\u3002": "This folder has too many subfolders; only the first group is shown.",
  "\u65E0\u6CD5\u8BFB\u53D6\u76EE\u5F55\uFF0C\u8BF7\u91CD\u8BD5\u3002": "Could not load the folder. Try again.",
  "\u91CD\u8BD5": "Retry",
  "\u663E\u793A\u9690\u85CF\u6587\u4EF6\u5939": "Show hidden folders",
  "\u5207\u6362\u540E\u4F1A\u6E05\u9664\u8FD9\u4E2A\u673A\u5668\u4EBA\u7684\u65E7\u4F1A\u8BDD\u6620\u5C04\u3002": "Switching clears this bot\u2019s previous session mappings.",
  "\u5207\u6362\u4E2D\u2026": "Switching\u2026",
  "\u9009\u62E9\u6B64\u76EE\u5F55": "Select this folder",
  "\u5DE5\u4F5C\u533A\u7EDD\u5BF9\u8DEF\u5F84": "Absolute workspace path",
  "/\u7EDD\u5BF9\u8DEF\u5F84/\u5230/\u5DE5\u4F5C\u533A": "/absolute/path/to/workspace",
  "\u4FEE\u6539": "Change",
  "\u4FDD\u5B58": "Save",
  "\u4FDD\u5B58\u4E2D\u2026": "Saving\u2026",
  "\u672A\u8BBE\u7F6E": "Not set",
  "\u5DE5\u4F5C\u533A\u4FEE\u6539\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002": "Could not update the workspace. Try again.",
  "\u8BF7\u8F93\u5165\u5DE5\u4F5C\u533A\u7EDD\u5BF9\u8DEF\u5F84\u3002": "Enter an absolute workspace path.",
  "\u5DE5\u4F5C\u533A\u5FC5\u987B\u662F\u7EDD\u5BF9\u8DEF\u5F84\u3002": "The workspace must be an absolute path.",
  "\u5DE5\u4F5C\u533A\u8DEF\u5F84\u4E0D\u5B58\u5728\u3002": "The workspace path does not exist.",
  "\u5DE5\u4F5C\u533A\u8DEF\u5F84\u5FC5\u987B\u6307\u5411\u4E00\u4E2A\u76EE\u5F55\u3002": "The workspace path must point to a directory.",
  "\u627E\u4E0D\u5230\u8981\u4FEE\u6539\u7684\u673A\u5668\u4EBA\u3002": "The bot could not be found.",
  "\u5C1A\u672A\u68C0\u67E5": "Not checked yet",
  "\u521A\u521A": "Just now",
  "\u68C0\u67E5\u8FDE\u63A5": "Check connection",
  "\u68C0\u67E5\u4E2D\u2026": "Checking\u2026",
  "\u91CD\u8BD5\u8FDE\u63A5": "Reconnect",
  "\u91CD\u8BD5\u4E2D\u2026": "Retrying\u2026",
  "\u79FB\u9664\u63A5\u5165": "Remove connection",
  "\u786E\u8BA4\u79FB\u9664\u63A5\u5165": "Remove connection",
  "\u786E\u8BA4\u79FB\u9664": "Remove",
  "\u6B63\u5728\u79FB\u9664\u2026": "Removing\u2026",
  "\u4FDD\u7559\u673A\u5668\u4EBA": "Keep bot",
  "\u4FDD\u7559\u8D26\u53F7": "Keep account",
  "\u53D6\u6D88": "Cancel",
  "\u5173\u95ED": "Close",
  "\u7ACB\u5373\u91CD\u8BD5": "Retry now",
  "\u91CD\u65B0\u8BFB\u53D6": "Reload",
  "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801": "Generate a new QR code",
  "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801\u540E\u7EE7\u7EED": "Generate a new QR code",
  "\u5237\u65B0\u4E8C\u7EF4\u7801": "Refresh QR code",
  "\u5237\u65B0\u4E2D\u2026": "Refreshing\u2026",
  "\u6362\u4E00\u4E2A\u4E8C\u7EF4\u7801": "Get another QR code",
  "\u7EE7\u7EED\u8FDE\u63A5": "Continue connecting",
  "\u7ED1\u5B9A\u5E76\u8FDE\u63A5": "Connect",
  "\u6B63\u5728\u7ED1\u5B9A\u2026": "Connecting\u2026",
  "\u9A8C\u8BC1\u5E76\u8FDE\u63A5": "Verify and connect",
  "\u6B63\u5728\u9A8C\u8BC1\u5E76\u8FDE\u63A5\u2026": "Verifying and connecting\u2026",
  "\u6B63\u5728\u9A8C\u8BC1\u2026": "Verifying\u2026",
  "\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5": "The operation failed. Try again later.",
  "\u8BF7\u7A0D\u540E\u91CD\u8BD5": "Try again later.",
  "\u5F53\u524D\u4E8C\u7EF4\u7801\u6709\u6548\u65F6\u95F4": "QR code expires in",
  "\u4E8C\u7EF4\u7801\u6709\u6548\u65F6\u95F4": "QR code expires in",
  "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F": "QR code expired",
  "\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548": "QR code expired",
  "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F\n\u8BF7\u91CD\u65B0\u751F\u6210": "QR code expired\nGenerate a new one",
  "\u4E8C\u7EF4\u7801\u56FE\u7247\u6B63\u5728\u751F\u6210\u2026": "Generating QR code\u2026",
  "\u4E8C\u7EF4\u7801\u6B63\u5728\u751F\u6210\u2026": "Generating QR code\u2026",
  "\u4E8C\u7EF4\u7801\u6B63\u5728\u81EA\u52A8\u5237\u65B0\u2026": "Refreshing QR code\u2026",
  "\u4E8C\u7EF4\u7801\u672A\u5C31\u7EEA\uFF0C\u8BF7\u6253\u5F00\u6388\u6743\u94FE\u63A5": "The QR code is not ready. Open the authorization link.",
  "\u4E8C\u7EF4\u7801\u56FE\u7247\u672A\u5C31\u7EEA\uFF0C\u8BF7\u4F7F\u7528\u5907\u7528\u94FE\u63A5\u3002": "The QR code is not ready. Use the alternate link.",
  "\u4E8C\u7EF4\u7801\u56FE\u7247\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210\u3002": "The QR code is not ready. Generate a new one.",
  "\u7B49\u5F85\u5237\u65B0": "Waiting to refresh",
  "\u6B63\u5728\u5237\u65B0\u4E8C\u7EF4\u7801": "Refreshing QR code",
  "\u6253\u5F00\u5907\u7528\u94FE\u63A5": "Open alternate link",
  "\u751F\u6210\u4E8C\u7EF4\u7801": "Generate QR code",
  "\u751F\u6210\u5FAE\u4FE1\u4E8C\u7EF4\u7801": "Generate WeChat QR code",
  "\u751F\u6210\u98DE\u4E66\u4E8C\u7EF4\u7801": "Generate Feishu QR code",
  "\u751F\u6210\u9489\u9489\u4E8C\u7EF4\u7801": "Generate DingTalk QR code",
  "\u751F\u6210\u4F01\u4E1A\u5FAE\u4FE1\u4E8C\u7EF4\u7801": "Generate WeCom QR code",
  "\u751F\u6210 QQ \u4E8C\u7EF4\u7801": "Generate QQ QR code",
  "\u6B63\u5728\u751F\u6210\u4E8C\u7EF4\u7801\u2026": "Generating QR code\u2026",
  "\u6B63\u5728\u51C6\u5907\u6388\u6743\u4E8C\u7EF4\u7801": "Preparing authorization QR code",
  "\u6B63\u5728\u51C6\u5907\u5FAE\u4FE1\u4E8C\u7EF4\u7801": "Preparing WeChat QR code",
  "\u6B63\u5728\u6DFB\u52A0\u65B0\u673A\u5668\u4EBA": "Adding a new bot",
  "\u6B63\u5728\u7533\u8BF7\u9489\u9489\u6388\u6743\u4E8C\u7EF4\u7801\u2026": "Requesting DingTalk authorization QR code\u2026",
  "\u6B63\u5728\u7533\u8BF7\u4F01\u4E1A\u5FAE\u4FE1\u4E8C\u7EF4\u7801\u2026": "Requesting WeCom QR code\u2026",
  "\u6B63\u5728\u7533\u8BF7 QQ \u4E8C\u7EF4\u7801\u2026": "Requesting QQ QR code\u2026",
  "\u6B63\u5728\u751F\u6210 WhatsApp \u4E8C\u7EF4\u7801": "Generating WhatsApp QR code",
  "\u626B\u7801\uFF0C\u521B\u5EFA\u7B2C\u4E00\u4E2A\u98DE\u4E66\u5165\u53E3": "Scan to create your first Feishu bot",
  "\u626B\u7801\u53EA\u4F1A\u65B0\u589E\u4E00\u4E2A\u673A\u5668\u4EBA\uFF0C\u5DF2\u63A5\u5165\u7684\u673A\u5668\u4EBA\u4F1A\u7EE7\u7EED\u6B63\u5E38\u6536\u53D1\u6D88\u606F\u3002": "Scanning adds one bot. Existing bots will continue to send and receive messages.",
  "\u65E0\u9700\u624B\u52A8\u586B\u5199 App ID\u3002\u4EE5\u540E\u8FD8\u53EF\u4EE5\u7EE7\u7EED\u6DFB\u52A0\u673A\u5668\u4EBA\uFF0C\u5206\u522B\u670D\u52A1\u4E0D\u540C\u56E2\u961F\u6216\u98DE\u4E66\u79DF\u6237\u3002": "No App ID is required. You can add more bots later for different teams or Feishu tenants.",
  "\u4F7F\u7528\u98DE\u4E66\u626B\u7801\u521B\u5EFA\u673A\u5668\u4EBA": "Scan with Feishu to create a bot",
  "\u5237\u65B0\u4E8C\u7EF4\u7801\u540E\u7EE7\u7EED": "Refresh the QR code to continue",
  "\u6253\u5F00\u98DE\u4E66\u79FB\u52A8\u7AEF\uFF0C\u4F7F\u7528\u626B\u4E00\u626B\u8BFB\u53D6\u4E8C\u7EF4\u7801": "Open Feishu on your phone and scan the QR code",
  "\u6838\u5BF9\u5E94\u7528\u540D\u79F0\u4E0E\u6743\u9650\u8303\u56F4\uFF0C\u5E76\u786E\u8BA4\u521B\u5EFA": "Review the app name and permissions, then confirm",
  "\u4FDD\u6301\u672C\u9875\u6253\u5F00\uFF0C\u7B49\u5F85\u65B0\u673A\u5668\u4EBA\u7684\u957F\u8FDE\u63A5\u5C31\u7EEA": "Keep this page open until the bot connection is ready",
  "\u5728\u98DE\u4E66\u4E2D\u6253\u5F00": "Open in Feishu",
  "\u53D6\u6D88\u6DFB\u52A0": "Cancel",
  "\u5DF2\u786E\u8BA4\uFF0C\u6B63\u5728\u8FDE\u63A5\u65B0\u673A\u5668\u4EBA": "Confirmed. Connecting the new bot",
  "\u6B63\u5728\u5B89\u5168\u4FDD\u5B58\u51ED\u636E\u5E76\u68C0\u67E5\u65B0\u673A\u5668\u4EBA\u7684\u6D88\u606F\u901A\u9053\uFF0C\u5176\u4ED6\u673A\u5668\u4EBA\u4E0D\u4F1A\u4E2D\u65AD\u3002": "Saving credentials and checking the new bot connection. Existing bots will not be interrupted.",
  "\u6B63\u5728\u5411\u98DE\u4E66\u7533\u8BF7\u4E00\u6B21\u6027\u6388\u6743\u4E8C\u7EF4\u7801\uFF0C\u8BF7\u7A0D\u5019\u3002": "Requesting a one-time authorization QR code from Feishu\u2026",
  "\u65B0\u673A\u5668\u4EBA\u6CA1\u6709\u6DFB\u52A0\u5B8C\u6210": "The new bot was not added",
  "\u65B0\u98DE\u4E66\u673A\u5668\u4EBA\u5DF2\u8FDE\u63A5\uFF0C\u53EF\u4EE5\u5F00\u59CB\u804A\u5929\u3002": "The new Feishu bot is connected and ready to chat.",
  "\u98DE\u4E66\u5E94\u7528\u521B\u5EFA\u5931\u8D25": "Could not create the Feishu app",
  "\u673A\u5668\u4EBA\u5DF2\u7ECF\u521B\u5EFA\uFF0C\u4F46\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u8FDE\u63A5\u72B6\u6001": "The bot was created, but its connection could not be confirmed yet",
  "\u673A\u5668\u4EBA\u4ECD\u672A\u8FDE\u63A5": "The bot is still offline",
  "\u673A\u5668\u4EBA\u5C1A\u672A\u8FDE\u63A5": "The bot is not connected yet",
  "\u957F\u8FDE\u63A5\u8FD0\u884C\u6B63\u5E38": "Persistent connection is healthy",
  "\u957F\u8FDE\u63A5": "Persistent connection",
  "\u5E94\u7528\u6807\u8BC6\u5DF2\u5B89\u5168\u4FDD\u5B58": "App identifier stored securely",
  "\u673A\u5668\u4EBA\u6807\u8BC6\u5DF2\u5B89\u5168\u4FDD\u5B58": "Bot identifier stored securely",
  "\u5DF2\u5B89\u5168\u4FDD\u5B58": "Stored securely",
  "\u5DF2\u63A5\u5165\u7684\u5FAE\u4FE1\u8D26\u53F7": "Connected WeChat accounts",
  "\u5DF2\u63A5\u5165\u7684\u673A\u5668\u4EBA": "Connected bots",
  "\u5DF2\u63A5\u5165\u7684\u9489\u9489\u673A\u5668\u4EBA": "Connected DingTalk bots",
  "\u5DF2\u7ED1\u5B9A\u7684\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA": "Connected WeCom bots",
  "\u5DF2\u7ED1\u5B9A\u7684 QQ \u673A\u5668\u4EBA": "Connected QQ bots",
  "\u5DF2\u63A5\u5165\u7684 WhatsApp \u673A\u5668\u4EBA": "Connected WhatsApp accounts",
  "\u4F7F\u7528\u624B\u673A\u5FAE\u4FE1\u626B\u63CF\u4E8C\u7EF4\u7801": "Scan with WeChat on your phone",
  "\u626B\u4E00\u6B21\u7801\uFF0C\u5C31\u80FD\u5728\u5FAE\u4FE1\u91CC\u4F7F\u7528 Harness": "Scan once to use Harness in WeChat",
  "\u6253\u5F00\u624B\u673A\u5FAE\u4FE1\u5E76\u626B\u63CF\u5DE6\u4FA7\u4E8C\u7EF4\u7801": "Open WeChat on your phone and scan the QR code",
  "\u5728\u5FAE\u4FE1\u4E2D\u786E\u8BA4\u8FDE\u63A5\u8BE5\u673A\u5668\u4EBA": "Confirm the bot connection in WeChat",
  "\u4FDD\u6301\u672C\u9875\u6253\u5F00\uFF0C\u7B49\u5F85\u673A\u5668\u4EBA\u81EA\u52A8\u8FDE\u63A5": "Keep this page open while the bot connects",
  "\u7B49\u5F85\u5FAE\u4FE1\u626B\u7801": "Waiting for WeChat scan",
  "\u9700\u8981\u914D\u5BF9\u7801": "Pairing code required",
  "\u8F93\u5165\u624B\u673A\u5FAE\u4FE1\u663E\u793A\u7684\u6570\u5B57": "Enter the number shown in WeChat",
  "\u5FAE\u4FE1\u914D\u5BF9\u7801": "WeChat pairing code",
  "\u5DF2\u626B\u7801\uFF0C\u8BF7\u5728\u624B\u673A\u4E0A\u786E\u8BA4": "Scanned. Confirm on your phone",
  "\u914D\u5BF9\u7801\u5DF2\u63D0\u4EA4\uFF0C\u6B63\u5728\u7B49\u5F85\u5FAE\u4FE1\u786E\u8BA4\u3002": "Pairing code submitted. Waiting for WeChat confirmation.",
  "\u8FD9\u662F\u5FAE\u4FE1\u9644\u52A0\u7684\u5B89\u5168\u786E\u8BA4\u6B65\u9AA4\u3002\u914D\u5BF9\u7801\u53EA\u7528\u4E8E\u672C\u6B21\u626B\u7801\u8F6E\u8BE2\uFF0C\u4E0D\u4F1A\u5199\u5165\u914D\u7F6E\u6216\u65E5\u5FD7\u3002": "This is an additional WeChat confirmation step. The pairing code is used only for this connection and is never stored.",
  "\u6B63\u5728\u4FDD\u5B58\u51ED\u636E\u5E76\u9A8C\u8BC1 Harness \u4E0E\u5FAE\u4FE1\u957F\u8F6E\u8BE2\u3002": "Saving credentials and verifying the WeChat connection.",
  "\u5FAE\u4FE1\u5DF2\u786E\u8BA4\uFF0C\u6B63\u5728\u542F\u52A8\u6D88\u606F\u8FDE\u63A5": "Confirmed in WeChat. Starting the message connection",
  "\u5FAE\u4FE1\u5DF2\u7ED1\u5B9A\uFF0C\u53EF\u4EE5\u5F00\u59CB\u5411\u5DF2\u7ED1\u5B9A\u7684\u673A\u5668\u4EBA\u53D1\u6D88\u606F\u3002": "WeChat is connected and ready for messages.",
  "\u8FD9\u4E2A\u5FAE\u4FE1\u8D26\u53F7\u5DF2\u7ECF\u7ED1\u5B9A\u5E76\u4FDD\u6301\u5728\u7EBF\u3002": "This WeChat account is connected and online.",
  "\u5FAE\u4FE1\u8D26\u53F7\u53CA\u672C\u673A\u51ED\u636E\u5DF2\u79FB\u9664\u3002": "The WeChat account and local credentials were removed.",
  "\u5DF2\u53D6\u6D88\u5FAE\u4FE1\u7ED1\u5B9A\u3002": "WeChat setup was cancelled.",
  "\u6B63\u5728\u8054\u7CFB\u817E\u8BAF\u5FAE\u4FE1 iLink \u670D\u52A1\u3002": "Contacting the WeChat iLink service.",
  "iLink \u957F\u8F6E\u8BE2": "iLink long polling",
  "\u626B\u4E00\u6B21\u7801\uFF0C\u81EA\u52A8\u521B\u5EFA\u5E76\u8FDE\u63A5\u673A\u5668\u4EBA": "Scan once to create and connect a bot",
  "\u4F7F\u7528\u9489\u9489 App \u5B8C\u6210\u673A\u5668\u4EBA\u6388\u6743": "Authorize the bot with the DingTalk app",
  "\u4F7F\u7528\u5DF2\u52A0\u5165\u4F01\u4E1A/\u7EC4\u7EC7\u7684\u9489\u9489\u8D26\u53F7\u626B\u63CF\u5DE6\u4FA7\u4E8C\u7EF4\u7801": "Scan the QR code with a DingTalk account that belongs to an organization",
  "\u5728\u6388\u6743\u9875\u70B9\u51FB\u201C\u4E00\u952E\u521B\u5EFA\u65B0\u673A\u5668\u4EBA\u201D": "Select \u201CCreate new bot\u201D on the authorization page",
  "\u8BF7\u52FF\u5173\u95ED\u672C\u9875\uFF0C\u9489\u9489\u5B8C\u6210\u6388\u6743\u540E\u5C06\u81EA\u52A8\u7EE7\u7EED\u3002": "Keep this page open. Setup will continue after DingTalk authorization.",
  "\u7B49\u5F85\u9489\u9489\u626B\u7801\u6388\u6743": "Waiting for DingTalk authorization",
  "\u6388\u6743\u5DF2\u786E\u8BA4\uFF0C\u6B63\u5728\u521B\u5EFA\u9489\u9489\u673A\u5668\u4EBA": "Authorized. Creating the DingTalk bot",
  "\u6B63\u5728\u786E\u8BA4\u9489\u9489\u6388\u6743": "Confirming DingTalk authorization",
  "\u6B63\u5728\u68C0\u67E5\u9489\u9489 Stream \u957F\u8FDE\u63A5\uFF0C\u6210\u529F\u540E\u4F1A\u81EA\u52A8\u663E\u793A\u4E3A\u5728\u7EBF\u3002": "Checking the DingTalk Stream connection. It will appear online when ready.",
  "\u9489\u9489\u673A\u5668\u4EBA\u5DF2\u63A5\u5165\uFF0C\u53EF\u4EE5\u5F00\u59CB\u53D1\u9001\u6D88\u606F\u3002": "The DingTalk bot is connected and ready for messages.",
  "\u8FD9\u4E2A\u9489\u9489\u673A\u5668\u4EBA\u5DF2\u7ECF\u63A5\u5165\u5E76\u4FDD\u6301\u5728\u7EBF\u3002": "This DingTalk bot is connected and online.",
  "Stream \u957F\u8FDE\u63A5": "Stream persistent connection",
  "\u4F7F\u7528\u4F01\u4E1A\u5FAE\u4FE1 App \u626B\u7801\u521B\u5EFA\u667A\u80FD\u673A\u5668\u4EBA": "Scan with WeCom to create an AI bot",
  "\u4F7F\u7528\u4F01\u4E1A\u5FAE\u4FE1 App \u5B8C\u6210\u667A\u80FD\u673A\u5668\u4EBA\u6388\u6743": "Authorize the AI bot with WeCom",
  "\u6253\u5F00\u4F01\u4E1A\u5FAE\u4FE1 App\uFF0C\u626B\u63CF\u5DE6\u4FA7\u4E8C\u7EF4\u7801": "Open WeCom and scan the QR code",
  "\u5728\u817E\u8BAF\u6388\u6743\u9875\u9762\u786E\u8BA4\u521B\u5EFA\u667A\u80FD\u673A\u5668\u4EBA": "Confirm bot creation on the Tencent authorization page",
  "\u8FD4\u56DE\u8FD9\u91CC\u7B49\u5F85\u8FDE\u63A5\u5B8C\u6210": "Return here and wait for the connection to complete",
  "\u7B49\u5F85\u4F01\u4E1A\u5FAE\u4FE1 App \u626B\u7801": "Waiting for WeCom scan",
  "\u4F01\u4E1A\u5FAE\u4FE1\u5DF2\u6388\u6743\uFF0C\u6B63\u5728\u8FDE\u63A5\u673A\u5668\u4EBA": "Authorized in WeCom. Connecting the bot",
  "\u51ED\u636E\u6B63\u5728\u5199\u5165\u672C\u673A\uFF0C\u5E76\u542F\u52A8\u4F01\u4E1A\u5FAE\u4FE1 WebSocket \u6D88\u606F\u8FDE\u63A5\u3002": "Saving credentials locally and starting the WeCom WebSocket connection.",
  "WebSocket \u957F\u8FDE\u63A5": "WebSocket persistent connection",
  "\u4F7F\u7528\u624B\u673A QQ \u626B\u7801\u521B\u5EFA\u5E76\u7ED1\u5B9A\u673A\u5668\u4EBA": "Scan with mobile QQ to create and connect a bot",
  "\u4F7F\u7528\u624B\u673A QQ \u5B8C\u6210\u673A\u5668\u4EBA\u7ED1\u5B9A": "Complete bot setup with mobile QQ",
  "\u6253\u5F00\u624B\u673A QQ\uFF0C\u626B\u63CF\u5DE6\u4FA7\u4E8C\u7EF4\u7801": "Open mobile QQ and scan the QR code",
  "\u5728\u817E\u8BAF\u6388\u6743\u9875\u9762\u786E\u8BA4\u521B\u5EFA\u6216\u7ED1\u5B9A\u673A\u5668\u4EBA": "Confirm bot creation or connection on the Tencent authorization page",
  "\u7B49\u5F85\u624B\u673A QQ \u626B\u7801": "Waiting for mobile QQ scan",
  "QQ \u5DF2\u6388\u6743\uFF0C\u6B63\u5728\u8FDE\u63A5\u673A\u5668\u4EBA": "Authorized in QQ. Connecting the bot",
  "\u51ED\u636E\u6B63\u5728\u5199\u5165\u672C\u673A\uFF0C\u5E76\u542F\u52A8 QQ WebSocket \u6D88\u606F\u8FDE\u63A5\u3002": "Saving credentials locally and starting the QQ WebSocket connection.",
  "\u4F7F\u7528\u624B\u673A WhatsApp \u626B\u63CF\u4E8C\u7EF4\u7801\u5373\u53EF\u63A5\u5165\u3002": "Scan the QR code with WhatsApp to connect.",
  "\u7528\u624B\u673A WhatsApp \u626B\u63CF\u4E8C\u7EF4\u7801": "Scan with WhatsApp on your phone",
  "\u6253\u5F00 WhatsApp \u2192 \u8BBE\u7F6E \u2192 \u5DF2\u5173\u8054\u8BBE\u5907": "Open WhatsApp \u2192 Settings \u2192 Linked devices",
  "\u70B9\u51FB\u201C\u5173\u8054\u8BBE\u5907\u201D\u5E76\u626B\u63CF\u5DE6\u4FA7\u4E8C\u7EF4\u7801": "Select \u201CLink a device\u201D and scan the QR code",
  "\u7B49\u5F85 WhatsApp \u626B\u7801": "Waiting for WhatsApp scan",
  "\u5DF2\u626B\u7801\uFF0C\u6B63\u5728\u8FDE\u63A5 WhatsApp": "Scanned. Connecting WhatsApp",
  "\u6B63\u5728\u5EFA\u7ACB\u5B89\u5168\u7684\u5173\u8054\u8BBE\u5907\u4F1A\u8BDD\u3002": "Creating a secure linked-device session.",
  "\u5173\u8054\u8BBE\u5907\u6B63\u5728\u63A5\u5165 DeepSeek Harness\u3002": "Linking the device to DeepSeek Harness.",
  "WhatsApp Web \u5173\u8054\u8BBE\u5907\u8FD0\u884C\u6B63\u5E38": "WhatsApp linked device is healthy",
  "Bot API \u957F\u8F6E\u8BE2": "Bot API long polling",
  " Gateway \u957F\u8FDE\u63A5": " Gateway persistent connection",
  "Gateway \u957F\u8FDE\u63A5": "Gateway persistent connection",
  " Socket Mode \u957F\u8FDE\u63A5": " Socket Mode persistent connection",
  "Socket Mode \u957F\u8FDE\u63A5": "Socket Mode persistent connection",
  "\u63A5\u5165 Telegram \u673A\u5668\u4EBA": "Connect a Telegram bot",
  "\u5148\u901A\u8FC7 @BotFather \u83B7\u53D6 Bot Token\uFF0C\u518D\u5728\u8FD9\u91CC\u5B8C\u6210\u63A5\u5165\u3002": "Get a Bot Token from @BotFather, then connect it here.",
  "\u586B\u5199 @BotFather \u751F\u6210\u7684 Bot Token": "Enter the Bot Token from @BotFather",
  "\u63A5\u5165 Discord \u673A\u5668\u4EBA": "Connect a Discord bot",
  "\u5148\u5728 Developer Portal \u521B\u5EFA Bot \u5E76\u9080\u8BF7\u5230\u670D\u52A1\u5668\uFF0C\u518D\u5728\u8FD9\u91CC\u5B8C\u6210\u63A5\u5165\u3002": "Create a bot in the Developer Portal and invite it to your server, then connect it here.",
  "\u586B\u5199 Discord Developer Portal \u7684 Bot Token": "Enter the Bot Token from the Discord Developer Portal",
  "\u63A5\u5165 Slack \u673A\u5668\u4EBA": "Connect a Slack bot",
  "\u5148\u7528 Manifest \u521B\u5EFA\u5E76\u914D\u7F6E Slack App": "Create and configure a Slack app with the manifest",
  "\u590D\u5236\u914D\u7F6E\u540E\uFF0C\u5728 Slack \u9009\u62E9 From a manifest\uFF1B\u521B\u5EFA\u5B8C\u6210\u540E\u751F\u6210 connections:write App Token\uFF0C\u5E76\u5C06\u5E94\u7528\u5B89\u88C5\u5230\u5DE5\u4F5C\u533A\u3002": "Copy the manifest and choose \u201CFrom a manifest\u201D in Slack. Then create a connections:write App Token and install the app to your workspace.",
  "\u590D\u5236 Manifest": "Copy manifest",
  "\u5DF2\u590D\u5236 Manifest": "Manifest copied",
  "\u6253\u5F00 Slack \u521B\u5EFA\u9875": "Open Slack app creation",
  "Bot Token \u6765\u81EA OAuth & Permissions\uFF1BApp Token \u6765\u81EA Basic Information\uFF0C\u5E76\u4E14\u5FC5\u987B\u5305\u542B connections:write\u3002": "Get the Bot Token from OAuth & Permissions and the App Token from Basic Information. The App Token must include connections:write.",
  "\u4F7F\u7528\u5B98\u65B9 App Manifest \u5FEB\u901F\u914D\u7F6E\u673A\u5668\u4EBA\uFF0C\u518D\u586B\u5199 Bot Token \u4E0E App Token \u5EFA\u7ACB\u672C\u5730 Socket Mode \u8FDE\u63A5\u3002": "Configure the bot with the official app manifest, then enter the Bot Token and App Token to start a local Socket Mode connection.",
  "Slack \u5DE5\u4F5C\u533A": "Slack workspace",
  "Bot Token \u4E0E App Token": "Bot Token and App Token",
  "\u586B\u5199 Bot Token": "Enter Bot Token",
  "\u624B\u52A8\u63A5\u5165\u98DE\u4E66\u673A\u5668\u4EBA": "Connect Feishu bot manually",
  "\u624B\u52A8\u63A5\u5165\u9489\u9489\u673A\u5668\u4EBA": "Connect DingTalk bot manually",
  "\u624B\u52A8\u63A5\u5165\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA": "Connect WeCom bot manually",
  "\u624B\u52A8\u63A5\u5165QQ\u673A\u5668\u4EBA": "Connect QQ bot manually",
  "\u586B\u5199\u98DE\u4E66\u5F00\u653E\u5E73\u53F0 App ID": "Enter the Feishu Open Platform App ID",
  "\u586B\u5199\u98DE\u4E66\u5F00\u653E\u5E73\u53F0 App Secret": "Enter the Feishu Open Platform App Secret",
  "\u586B\u5199\u9489\u9489\u5E94\u7528 Client ID": "Enter the DingTalk Client ID",
  "\u586B\u5199\u9489\u9489\u5E94\u7528 Client Secret": "Enter the DingTalk Client Secret",
  "\u586B\u5199\u4F01\u4E1A\u5FAE\u4FE1\u667A\u80FD\u673A\u5668\u4EBA Bot ID": "Enter the WeCom AI Bot ID",
  "\u586B\u5199\u4F01\u4E1A\u5FAE\u4FE1\u667A\u80FD\u673A\u5668\u4EBA Secret": "Enter the WeCom AI Bot Secret",
  "\u586B\u5199 QQ \u5F00\u653E\u5E73\u53F0 AppID": "Enter the QQ Open Platform AppID",
  "\u586B\u5199 QQ \u5F00\u653E\u5E73\u53F0 AppSecret": "Enter the QQ Open Platform AppSecret",
  "\u626B\u7801\u63A5\u5165\u5FAE\u4FE1\u673A\u5668\u4EBA": "Connect WeChat bot by QR code",
  "\u626B\u7801\u63A5\u5165\u98DE\u4E66\u673A\u5668\u4EBA": "Connect Feishu bot by QR code",
  "\u626B\u7801\u63A5\u5165\u9489\u9489\u673A\u5668\u4EBA": "Connect DingTalk bot by QR code",
  "\u626B\u7801\u63A5\u5165\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA": "Connect WeCom bot by QR code",
  "\u626B\u7801\u63A5\u5165 QQ \u673A\u5668\u4EBA": "Connect QQ bot by QR code",
  "\u626B\u7801\u63A5\u5165 WhatsApp \u673A\u5668\u4EBA": "Connect WhatsApp by QR code",
  "\u626B\u7801\u7ED1\u5B9A WhatsApp \u673A\u5668\u4EBA": "Connect WhatsApp by QR code",
  "\u4F7F\u7528 App ID \u548C App Secret \u7ED1\u5B9A\u98DE\u4E66\u673A\u5668\u4EBA": "Connect a Feishu bot with App ID and App Secret",
  "\u4F7F\u7528 Client ID \u548C Client Secret \u7ED1\u5B9A\u9489\u9489\u673A\u5668\u4EBA": "Connect a DingTalk bot with Client ID and Client Secret",
  "\u4F7F\u7528 Bot ID \u548C Secret \u7ED1\u5B9A\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA": "Connect a WeCom bot with Bot ID and Secret",
  "\u4F7F\u7528 AppID \u548C AppSecret \u7ED1\u5B9A QQ \u673A\u5668\u4EBA": "Connect a QQ bot with AppID and AppSecret",
  "\u4F7F\u7528 Manifest \u548C\u53CC Token \u63A5\u5165 Slack \u673A\u5668\u4EBA": "Connect a Slack bot with a manifest and two tokens",
  "\u4F7F\u7528 Bot Token \u63A5\u5165 Telegram \u673A\u5668\u4EBA": "Connect a Telegram bot with a Bot Token",
  "\u4F7F\u7528 Bot Token \u63A5\u5165 Discord \u673A\u5668\u4EBA": "Connect a Discord bot with a Bot Token",
  "\u53D6\u6D88\u7ED1\u5B9A": "Cancel setup",
  "\u53D6\u6D88\u63A5\u5165": "Cancel setup",
  "\u4E8C\u7EF4\u7801\u7531\u817E\u8BAF\u5FAE\u4FE1 iLink \u670D\u52A1\u7B7E\u53D1\u3002\u7528\u624B\u673A\u5FAE\u4FE1\u626B\u63CF\u5E76\u786E\u8BA4\u540E\uFF0C\u8D26\u53F7\u51ED\u636E\u4F1A\u76F4\u63A5\u5199\u5165 Harness Host\uFF0C\u6D4F\u89C8\u5668\u4E0D\u4F1A\u6536\u5230 bot_token\u3002": "The QR code is issued by Tencent WeChat iLink. After you scan and confirm, account credentials are written directly to the Harness Host and are never exposed to the browser.",
  "\u626B\u7801\u8D26\u53F7\u5FC5\u987B\u5DF2\u52A0\u5165\u4F01\u4E1A/\u7EC4\u7EC7\u3002\u5982\u679C\u9489\u9489\u63D0\u793A\u5C1A\u672A\u52A0\u5165\u7EC4\u7EC7\uFF0C\u8BF7\u5728\u63D0\u793A\u9875\u521B\u5EFA\u7EC4\u7EC7\uFF0C\u6216\u6362\u7528\u5DF2\u52A0\u5165\u7EC4\u7EC7\u7684\u8D26\u53F7\u3002": "The DingTalk account must belong to an organization. If prompted, create an organization or use an account that already belongs to one.",
  "\u8BF7\u5728\u624B\u673A\u4E0A\u6838\u5BF9\u5E76\u786E\u8BA4\u6388\u6743\u3002\u90E8\u5206\u8D26\u53F7\u4F1A\u989D\u5916\u663E\u793A\u4E00\u4E2A\u914D\u5BF9\u6570\u5B57\uFF0C\u9875\u9762\u4F1A\u5728\u9700\u8981\u65F6\u63D0\u793A\u8F93\u5165\u3002": "Review and confirm authorization on your phone. Some accounts may also require a pairing number.",
  "\u6388\u6743\u7531\u9489\u9489\u5B98\u65B9\u9875\u9762\u5B8C\u6210\u3002\u626B\u7801\u8D26\u53F7\u5FC5\u987B\u5DF2\u52A0\u5165\u4E00\u4E2A\u4F01\u4E1A/\u7EC4\u7EC7\u5E76\u6709\u6743\u521B\u5EFA\u673A\u5668\u4EBA\uFF1B\u521B\u5EFA\u6210\u529F\u540E\uFF0C\u5E94\u7528\u51ED\u636E\u4F1A\u76F4\u63A5\u5199\u5165 Harness Host\u3002": "Authorization is completed on DingTalk\u2019s official page. The account must belong to an organization and be allowed to create bots. Credentials are written directly to the Harness Host.",
  "\u626B\u7801\u7531\u817E\u8BAF\u5B98\u65B9\u9875\u9762\u5B8C\u6210\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u586B\u5199 AppID \u6216 AppSecret\u3002\u626B\u7801\u6210\u529F\u540E\uFF0C\u673A\u5668\u4EBA\u4F1A\u81EA\u52A8\u8FDE\u63A5 DeepSeek Harness\u3002": "Scanning is completed on Tencent\u2019s official page. No AppID or AppSecret is required, and the bot connects automatically.",
  "\u626B\u7801\u7531\u817E\u8BAF\u5B98\u65B9\u9875\u9762\u5B8C\u6210\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u586B\u5199 Bot ID \u6216 Secret\u3002\u521B\u5EFA\u6210\u529F\u540E\uFF0C\u673A\u5668\u4EBA\u4F1A\u81EA\u52A8\u8FDE\u63A5 DeepSeek Harness\u3002": "Scanning is completed on Tencent\u2019s official page. No Bot ID or Secret is required, and the bot connects automatically.",
  "\u817E\u8BAF\u9875\u9762\u4F1A\u521B\u5EFA\u6216\u7ED1\u5B9A\u4E00\u4E2A QQ \u673A\u5668\u4EBA\uFF0C\u5E76\u628A\u8FDE\u63A5\u51ED\u636E\u5B89\u5168\u4EA4\u7ED9\u672C\u673A Harness Host\u3002": "Tencent will create or connect a QQ bot and securely deliver its credentials to the local Harness Host.",
  "\u4F01\u4E1A\u5FAE\u4FE1\u5B98\u65B9\u9875\u9762\u4F1A\u521B\u5EFA\u4E00\u4E2A\u667A\u80FD\u673A\u5668\u4EBA\uFF0C\u5E76\u628A\u8FDE\u63A5\u51ED\u636E\u5B89\u5168\u4EA4\u7ED9\u672C\u673A Harness Host\u3002": "WeCom will create an AI bot and securely deliver its credentials to the local Harness Host.",
  "\u4ECE\u6B64 Harness \u79FB\u9664\u8FD9\u4E2A\u5FAE\u4FE1\u8D26\u53F7\uFF1F": "Remove this WeChat account from Harness?",
  "\u8FD9\u4F1A\u505C\u6B62\u6D88\u606F\u8FDE\u63A5\uFF0C\u5E76\u5220\u9664\u672C\u673A\u4FDD\u5B58\u7684 bot_token\u3001\u8D26\u53F7\u914D\u7F6E\u548C\u4F1A\u8BDD\u6620\u5C04\u3002\u5176\u4ED6\u5FAE\u4FE1\u8D26\u53F7\u4E0D\u53D7\u5F71\u54CD\u3002": "This stops the message connection and removes the locally stored bot_token, account configuration, and session mappings. Other WeChat accounts are not affected.",
  "\u6B64\u64CD\u4F5C\u4F1A\u505C\u6B62\u8FD9\u4E2A\u673A\u5668\u4EBA\u7684\u8FDE\u63A5\uFF0C\u5E76\u5220\u9664\u4FDD\u5B58\u5728\u672C\u673A\u7684\u63A5\u5165\u914D\u7F6E\u548C\u51ED\u636E\u3002\u98DE\u4E66\u5F00\u653E\u5E73\u53F0\u4E2D\u7684\u5E94\u7528\u4E0D\u4F1A\u88AB\u81EA\u52A8\u5220\u9664\uFF0C\u5176\u4ED6\u673A\u5668\u4EBA\u4E5F\u4E0D\u53D7\u5F71\u54CD\u3002": "This stops the bot connection and removes the locally stored configuration and credentials. The app in Feishu Open Platform is not deleted, and other bots are not affected.",
  "\u8FD9\u4F1A\u505C\u6B62\u6D88\u606F\u8FDE\u63A5\uFF0C\u5E76\u5220\u9664\u672C\u673A\u4FDD\u5B58\u7684\u5E94\u7528\u51ED\u636E\u3001\u673A\u5668\u4EBA\u914D\u7F6E\u53CA\u4F1A\u8BDD\u6620\u5C04\u3002\u9489\u9489\u5F00\u653E\u5E73\u53F0\u4E2D\u7684\u673A\u5668\u4EBA\u4E0D\u4F1A\u88AB\u81EA\u52A8\u5220\u9664\u3002": "This stops the message connection and removes the locally stored app credentials, bot configuration, and session mappings. The bot in DingTalk Open Platform is not deleted.",
  "\u8FD9\u4F1A\u505C\u6B62\u6D88\u606F\u8FDE\u63A5\uFF0C\u5E76\u5220\u9664\u672C\u673A\u4FDD\u5B58\u7684\u5E94\u7528\u51ED\u636E\u3001\u673A\u5668\u4EBA\u914D\u7F6E\u53CA\u4F1A\u8BDD\u6620\u5C04\u3002\u4F01\u4E1A\u5FAE\u4FE1\u5E73\u53F0\u4E2D\u7684\u673A\u5668\u4EBA\u4E0D\u4F1A\u88AB\u81EA\u52A8\u5220\u9664\u3002": "This stops the message connection and removes the locally stored app credentials, bot configuration, and session mappings. The bot in WeCom is not deleted.",
  "\u8FD9\u4F1A\u505C\u6B62\u6D88\u606F\u8FDE\u63A5\uFF0C\u5E76\u5220\u9664\u672C\u673A\u4FDD\u5B58\u7684\u5E94\u7528\u51ED\u636E\u3001\u673A\u5668\u4EBA\u914D\u7F6E\u53CA\u4F1A\u8BDD\u6620\u5C04\u3002\u817E\u8BAF\u5E73\u53F0\u4E2D\u7684\u673A\u5668\u4EBA\u4E0D\u4F1A\u88AB\u81EA\u52A8\u5220\u9664\u3002": "This stops the message connection and removes the locally stored app credentials, bot configuration, and session mappings. The bot on Tencent\u2019s platform is not deleted.",
  "\u8FD9\u4F1A\u505C\u6B62\u6D88\u606F\u8FDE\u63A5\uFF0C\u5E76\u5220\u9664\u672C\u673A\u4FDD\u5B58\u7684 WhatsApp \u5173\u8054\u8BBE\u5907\u548C\u4F1A\u8BDD\u6620\u5C04\u3002": "This stops the message connection and removes the locally stored WhatsApp linked device and session mappings.",
  "\u6B63\u5728\u8BFB\u53D6\u98DE\u4E66\u673A\u5668\u4EBA\u5217\u8868": "Loading Feishu bots",
  "\u6B63\u5728\u8BFB\u53D6\u98DE\u4E66\u8FDE\u63A5\u72B6\u6001\u2026": "Loading Feishu connection status\u2026",
  "\u6B63\u5728\u8BFB\u53D6\u5FAE\u4FE1\u8FDE\u63A5\u72B6\u6001\u2026": "Loading WeChat connection status\u2026",
  "\u6B63\u5728\u8BFB\u53D6\u9489\u9489\u8FDE\u63A5\u72B6\u6001\u2026": "Loading DingTalk connection status\u2026",
  "\u901A\u8FC7\u626B\u7801\u628A\u9489\u9489\u673A\u5668\u4EBA\u63A5\u5165 DeepSeek Harness": "Connect a DingTalk bot to DeepSeek Harness by QR code",
  "\u9489\u9489\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u626B\u7801\u7ED1\u5B9A\u8FDB\u5EA6": "DingTalk did not return QR setup progress",
  "\u9489\u9489\u626B\u7801\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u7ED1\u5B9A\u4EFB\u52A1": "DingTalk did not return a valid setup attempt",
  "\u9489\u9489 Stream \u957F\u8FDE\u63A5\u8FD0\u884C\u6B63\u5E38": "DingTalk Stream connection is healthy",
  "\u9489\u9489\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u673A\u5668\u4EBA\u5217\u8868": "DingTalk did not return a valid bot list",
  "${totals.connected} / ${totals.configured} \u5728\u7EBF": "${totals.connected} / ${totals.configured} online",
  "\u7528\u4E8E\u628A\u9489\u9489\u673A\u5668\u4EBA\u63A5\u5165 DeepSeek Harness \u7684\u4E00\u6B21\u6027\u4E8C\u7EF4\u7801": "One-time QR code for connecting a DingTalk bot to DeepSeek Harness",
  "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F\\n\u8BF7\u91CD\u65B0\u751F\u6210": "QR code expired\\nGenerate a new one",
  "\u673A\u5668\u4EBA\u5DF2\u521B\u5EFA\uFF0C\u6B63\u5728\u5EFA\u7ACB\u6D88\u606F\u8FDE\u63A5": "Bot created. Starting the message connection",
  "\u9489\u9489\u626B\u7801\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u5B89\u5168\u7684\u4E8C\u7EF4\u7801": "DingTalk did not return a secure QR code",
  "\u9489\u9489\u4E8C\u7EF4\u7801\u5DF2\u751F\u6210\uFF0C\u8BF7\u4F7F\u7528\u9489\u9489 App \u626B\u63CF\u3002": "DingTalk QR code generated. Scan it with the DingTalk app.",
  "\u9489\u9489\u673A\u5668\u4EBA\u51ED\u636E\u5DF2\u7ED1\u5B9A\u3002": "DingTalk bot credentials connected.",
  "\u5DF2\u53D6\u6D88\u9489\u9489\u673A\u5668\u4EBA\u63A5\u5165\u3002": "DingTalk bot setup cancelled.",
  "\u9489\u9489\u673A\u5668\u4EBA\u53CA\u672C\u673A\u51ED\u636E\u5DF2\u79FB\u9664\u3002": "DingTalk bot and local credentials removed.",
  "\u98DE\u4E66\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u4E8C\u7EF4\u7801\u4FE1\u606F": "Feishu did not return QR code information",
  "\u98DE\u4E66\u670D\u52A1\u8FD4\u56DE\u7684\u4E8C\u7EF4\u7801\u4FE1\u606F\u4E0D\u5B8C\u6574": "Feishu returned incomplete QR code information",
  "\u98DE\u4E66\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6548\u7684\u673A\u5668\u4EBA\u72B6\u6001": "Feishu returned an invalid bot status",
  "\u98DE\u4E66\u670D\u52A1\u8FD4\u56DE\u7684\u673A\u5668\u4EBA\u7F3A\u5C11 botId": "The Feishu bot is missing botId",
  "\u98DE\u4E66\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u8FDE\u63A5\u72B6\u6001": "Feishu did not return connection status",
  "\u98DE\u4E66\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u521B\u5EFA\u8FDB\u5EA6": "Feishu did not return creation progress",
  "\u98DE\u4E66\u670D\u52A1\u8FD4\u56DE\u4E86\u672A\u77E5\u7684\u521B\u5EFA\u72B6\u6001": "Feishu returned an unknown creation status",
  "\u5DF2\u63A5\u5165 ${totals.configured} \u4E2A\u673A\u5668\u4EBA\uFF0C\u5176\u4E2D ${totals.connected} \u4E2A\u5728\u7EBF": "${totals.connected} of ${totals.configured} bots online",
  "\u5C1A\u672A\u63A5\u5165\u673A\u5668\u4EBA": "No bot connected yet",
  "\u7528\u4E8E\u65B0\u589E DeepSeek Harness \u98DE\u4E66\u673A\u5668\u4EBA\u7684\u4E00\u6B21\u6027\u6388\u6743\u4E8C\u7EF4\u7801": "One-time authorization QR code for adding a Feishu bot to DeepSeek Harness",
  "\u8BF7\u5237\u65B0\u540E\u91CD\u65B0\u626B\u7801": "Refresh and scan again",
  '${connected ? "\u68C0\u67E5\u8FDE\u63A5" : "\u91CD\u8BD5\u8FDE\u63A5"}${bot.name}': '${connected ? "Check connection" : "Reconnect"} ${bot.name}',
  "\u65E0\u6CD5\u8BFB\u53D6\u98DE\u4E66\u673A\u5668\u4EBA": "Could not load Feishu bots",
  "\u6388\u6743\u4E8C\u7EF4\u7801\u5DF2\u751F\u6210\uFF0C\u8BF7\u4F7F\u7528\u98DE\u4E66\u626B\u7801\u3002": "Authorization QR code generated. Scan it with Feishu.",
  "\u98DE\u4E66\u673A\u5668\u4EBA\u51ED\u636E\u5DF2\u7ED1\u5B9A\u3002": "Feishu bot credentials connected.",
  "\u5DF2\u53D6\u6D88\u6DFB\u52A0\u673A\u5668\u4EBA\u3002": "Adding the bot was cancelled.",
  "${newBot.bot.name}\u5DF2\u8FDE\u63A5\uFF0C\u53EF\u4EE5\u5728\u98DE\u4E66\u4E2D\u5F00\u59CB\u804A\u5929\u3002": "${newBot.bot.name} is connected and ready to chat in Feishu.",
  "${bot.name}\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u673A\u5668\u4EBA\u72B6\u6001\u3002": "${bot.name} operation failed. Check the bot status.",
  "${bot.name}\u5DF2\u4ECE\u6B64 DeepSeek Harness \u79FB\u9664\uFF1B\u98DE\u4E66\u5F00\u653E\u5E73\u53F0\u4E2D\u7684\u5E94\u7528\u672A\u88AB\u5220\u9664\u3002": "${bot.name} was removed from this DeepSeek Harness. The app in Feishu Open Platform was not deleted.",
  "\u65E0\u6CD5\u8BFB\u53D6\u8FDE\u63A5\u72B6\u6001": "Could not load connection status",
  "QQ \u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u626B\u7801\u7ED1\u5B9A\u8FDB\u5EA6": "QQ did not return QR setup progress",
  "QQ \u626B\u7801\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u7ED1\u5B9A\u4EFB\u52A1": "QQ did not return a valid setup attempt",
  "QQ WebSocket \u957F\u8FDE\u63A5\u8FD0\u884C\u6B63\u5E38": "QQ WebSocket connection is healthy",
  "QQ \u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u673A\u5668\u4EBA\u5217\u8868": "QQ did not return a valid bot list",
  "\u5C1A\u672A\u7ED1\u5B9A QQ \u673A\u5668\u4EBA": "No QQ bot connected yet",
  "\u7528\u4E8E\u7ED1\u5B9A QQ \u673A\u5668\u4EBA\u7684\u4E00\u6B21\u6027\u4E8C\u7EF4\u7801": "One-time QR code for connecting a QQ bot",
  "${channel}${connectionSummary}\u8FD0\u884C\u6B63\u5E38": "${channel}${connectionSummary} is healthy",
  "${channel} \u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u673A\u5668\u4EBA\u5217\u8868": "${channel} did not return a valid bot list",
  "\u4F7F\u7528 Bot Token \u63A5\u5165 ${channel} \u673A\u5668\u4EBA": "Connect a ${channel} bot with a Bot Token",
  "${model.totals.connected} / ${model.totals.configured} \u5728\u7EBF": "${model.totals.connected}/${model.totals.configured} online",
  " Bot API \u957F\u8F6E\u8BE2": " Bot API long polling",
  "\u4F01\u4E1A\u5FAE\u4FE1\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u626B\u7801\u7ED1\u5B9A\u8FDB\u5EA6": "WeCom did not return QR setup progress",
  "\u4F01\u4E1A\u5FAE\u4FE1\u626B\u7801\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u7ED1\u5B9A\u4EFB\u52A1": "WeCom did not return a valid setup attempt",
  "\u4F01\u4E1A\u5FAE\u4FE1 WebSocket \u957F\u8FDE\u63A5\u8FD0\u884C\u6B63\u5E38": "WeCom WebSocket connection is healthy",
  "\u4F01\u4E1A\u5FAE\u4FE1\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u673A\u5668\u4EBA\u5217\u8868": "WeCom did not return a valid bot list",
  "\u5C1A\u672A\u7ED1\u5B9A\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA": "No WeCom bot connected yet",
  "\u7528\u4E8E\u7ED1\u5B9A\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u7684\u4E00\u6B21\u6027\u4E8C\u7EF4\u7801": "One-time QR code for connecting a WeCom bot",
  "\u5FAE\u4FE1\u626B\u7801\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u7ED1\u5B9A\u4EFB\u52A1": "WeChat did not return a valid setup attempt",
  "\u5FAE\u4FE1\u7ED1\u5B9A\u6CA1\u6709\u5B8C\u6210": "WeChat setup did not complete",
  "\u5FAE\u4FE1\u8FDE\u63A5\u6B63\u5E38": "WeChat connection is healthy",
  "\u5FAE\u4FE1\u8FDE\u63A5\u672A\u5C31\u7EEA": "WeChat connection is not ready",
  "\u5FAE\u4FE1\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u8D26\u53F7\u5217\u8868": "WeChat did not return a valid account list",
  "\u5C1A\u672A\u7ED1\u5B9A\u5FAE\u4FE1": "No WeChat account connected yet",
  "\u7528\u4E8E\u628A\u5FAE\u4FE1\u673A\u5668\u4EBA\u7ED1\u5B9A\u5230 DeepSeek Harness \u7684\u4E00\u6B21\u6027\u4E8C\u7EF4\u7801": "One-time QR code for connecting a WeChat bot to DeepSeek Harness",
  "\u4FDD\u6301\u672C\u9875\u6253\u5F00\uFF0C\u7B49\u5F85\u6D88\u606F\u957F\u8F6E\u8BE2\u53D8\u4E3A\u5728\u7EBF": "Keep this page open until long polling is online",
  "\u5FAE\u4FE1\u4E8C\u7EF4\u7801\u5DF2\u751F\u6210\uFF0C\u8BF7\u4F7F\u7528\u624B\u673A\u5FAE\u4FE1\u626B\u63CF\u3002": "WeChat QR code generated. Scan it with WeChat on your phone.",
  "\u79FB\u9664\u5931\u8D25\uFF1A${presentError(error).message}": "Removal failed: ${presentError(error).message}",
  "\u65E0\u6CD5\u8BFB\u53D6\u5FAE\u4FE1\u72B6\u6001": "Could not load WeChat status",
  "WhatsApp \u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u626B\u7801\u8FDB\u5EA6": "WhatsApp did not return QR setup progress",
  "WhatsApp \u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u626B\u7801\u4EFB\u52A1": "WhatsApp did not return a valid setup attempt",
  "WhatsApp \u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u673A\u5668\u4EBA\u5217\u8868": "WhatsApp did not return a valid account list",
  "\u7528\u4E8E\u5173\u8054 WhatsApp \u8BBE\u5907\u7684\u4E00\u6B21\u6027\u4E8C\u7EF4\u7801": "One-time QR code for linking a WhatsApp device"
});
var en = EN;
var zh = Object.freeze(Object.fromEntries(
  Object.keys(EN).map((key) => [key, key === "$locale" ? "zh" : key])
));
var translate = (key) => key;
function setImTranslator(next) {
  translate = typeof next === "function" ? next : (key) => key;
}
function isEnglish() {
  return translate("$locale") === "en";
}
function channelName(value) {
  return localizeText(value);
}
function translateDynamic(text3) {
  let match = /^(\d+) \/ (\d+) 在线$/.exec(text3);
  if (match) return `${match[1]}/${match[2]} online`;
  match = /^已接入 (\d+) 个机器人，其中 (\d+) 个在线$/.exec(text3);
  if (match) return `${match[2]} of ${match[1]} bots online`;
  match = /^正在读取\s*(.+?)\s*机器人状态…$/.exec(text3);
  if (match) return `Loading ${channelName(match[1])} bot status\u2026`;
  match = /^无法读取\s*(.+?)\s*机器人状态$/.exec(text3);
  if (match) return `Could not load ${channelName(match[1])} bot status`;
  match = /^尚未接入\s*(.+?)\s*机器人$/.exec(text3);
  if (match) return `No ${channelName(match[1])} bot connected yet`;
  match = /^已接入的\s*(.+?)\s*机器人$/.exec(text3);
  if (match) return `Connected ${channelName(match[1])} bots`;
  match = /^手动接入(.+)机器人$/.exec(text3);
  if (match) return `Connect ${channelName(match[1])} bot manually`;
  match = /^(.+) 设置$/.exec(text3);
  if (match) return `${channelName(match[1])} settings`;
  match = /^从 DeepSeek Harness 移除“(.+)”？$/.exec(text3);
  if (match) return `Remove \u201C${match[1]}\u201D from DeepSeek Harness?`;
  match = /^从 DeepSeek Harness 移除(.+)$/.exec(text3);
  if (match) return `Remove ${match[1]} from DeepSeek Harness`;
  match = /^(检查连接|重试连接)(.+)$/.exec(text3);
  if (match) return `${localizeText(match[1])} ${match[2]}`;
  match = /^移除(.+)$/.exec(text3);
  if (match) return `Remove ${match[1]}`;
  match = /^这会停止消息连接，并删除本机保存的 (.+)、机器人配置及会话映射。(.+)中的机器人不会被自动删除。$/.exec(text3);
  if (match) {
    return `This stops the message connection and removes the locally stored ${localizeText(match[1])}, bot configuration, and session mappings. The bot in ${localizeText(match[2])} is not deleted.`;
  }
  match = /^二维码剩余 (.+)$/.exec(text3);
  if (match) return `QR code expires in ${match[1]}`;
  match = /^状态刷新失败：(.+)$/.exec(text3);
  if (match) return `Status refresh failed: ${match[1]}`;
  match = /^状态自动刷新失败：(.+)$/.exec(text3);
  if (match) return `Automatic status refresh failed: ${match[1]}`;
  match = /^操作失败：(.+)$/.exec(text3);
  if (match) return `Operation failed: ${match[1]}`;
  match = /^连接检查失败：(.+)$/.exec(text3);
  if (match) return `Connection check failed: ${match[1]}`;
  match = /^移除失败：(.+)$/.exec(text3);
  if (match) return `Removal failed: ${match[1]}`;
  const phrases = [
    ["\u4F01\u4E1A\u5FAE\u4FE1", "WeCom"],
    ["DeepSeek Harness", "DeepSeek Harness"],
    ["WhatsApp", "WhatsApp"],
    ["Telegram", "Telegram"],
    ["Discord", "Discord"],
    ["Slack", "Slack"],
    ["\u98DE\u4E66", "Feishu"],
    ["\u9489\u9489", "DingTalk"],
    ["\u5FAE\u4FE1", "WeChat"],
    ["\u673A\u5668\u4EBA", "bot"],
    ["\u8D26\u53F7", "account"],
    ["\u5E94\u7528", "app"],
    ["\u51ED\u636E", "credentials"],
    ["\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u54CD\u5E94", "service returned an unrecognized response"],
    ["\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u673A\u5668\u4EBA\u5217\u8868", "service did not return a valid bot list"],
    ["\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5", "operation failed; try again later"],
    ["\u64CD\u4F5C\u5931\u8D25", "operation failed"],
    ["\u8FDE\u63A5\u5C1A\u672A\u5C31\u7EEA", "connection is not ready"],
    ["\u6CA1\u6709\u63A5\u5165\u5B8C\u6210", "was not connected"],
    ["\u6CA1\u6709\u7ED1\u5B9A\u5B8C\u6210", "was not connected"],
    ["\u8BBE\u7F6E\u9875\u7F3A\u5C11 RPC \u8FDE\u63A5", "settings are missing an RPC connection"],
    ["\u8BBE\u7F6E", "settings"],
    ["\u8FDE\u63A5\u68C0\u67E5\u5B8C\u6210", "connection check completed"],
    ["\u4ECD\u672A\u8FDE\u63A5\uFF0C\u63D2\u4EF6\u4F1A\u7EE7\u7EED\u81EA\u52A8\u91CD\u8BD5", "is still offline; the plugin will keep retrying"],
    ["\u5DF2\u91CD\u65B0\u8FDE\u63A5", "reconnected"],
    ["\u79FB\u9664\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5", "could not be removed; try again"],
    ["\u5DF2\u8FDE\u63A5\uFF0C\u53EF\u4EE5\u5F00\u59CB\u804A\u5929", "is connected and ready to chat"],
    ["\u5DF2\u8FDE\u63A5\uFF0C\u53EF\u4EE5\u5F00\u59CB\u53D1\u9001\u6D88\u606F", "is connected and ready for messages"],
    ["\u670D\u52A1\u8BF7\u6C42\u5931\u8D25", "service request failed"],
    ["\u8FDE\u63A5\u9047\u5230\u95EE\u9898", "connection encountered a problem"],
    ["\u6B63\u5728\u8BFB\u53D6", "Loading "],
    ["\u8FDE\u63A5\u72B6\u6001", "connection status"],
    ["\u4E8C\u7EF4\u7801", "QR code"]
  ];
  let output = text3;
  for (const [source, target] of phrases) output = output.replaceAll(source, target);
  return output;
}
function localizeText(value) {
  if (typeof value !== "string") return value;
  const exact = translate(value);
  if (exact !== value || !isEnglish()) return exact;
  return translateDynamic(value);
}
var LOCALIZED_PROPS = Object.freeze([
  "aria-label",
  "alt",
  "placeholder",
  "title"
]);
function localizeChild(child) {
  if (typeof child === "string") return localizeText(child);
  if (Array.isArray(child)) return child.map(localizeChild);
  return child;
}
function h2(type, props, ...children) {
  let localizedProps = props;
  if (props) {
    for (const key of LOCALIZED_PROPS) {
      if (typeof props[key] === "string") {
        localizedProps = localizedProps === props ? { ...props } : localizedProps;
        localizedProps[key] = localizeText(props[key]);
      }
    }
  }
  return React2.createElement(type, localizedProps, ...children.map(localizeChild));
}

// plugin-src/client/credential-binding.js
function ActionIcon({ children }) {
  return h2("svg", {
    className: "dim-actionIcon",
    width: 15,
    height: 15,
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false"
  }, children);
}
function QrActionIcon() {
  return h2(
    ActionIcon,
    null,
    h2("path", {
      d: "M2.5 2.5h5v5h-5v-5Zm10 0h5v5h-5v-5Zm-10 10h5v5h-5v-5Z",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }),
    h2("path", {
      d: "M11.5 11.5h2v2h-2v-2Zm4 0h2v3h-2v-3Zm-4 4h3v2h-3v-2Zm5 1h1v1h-1v-1Z",
      fill: "currentColor"
    })
  );
}
function CredentialActionIcon() {
  return h2(
    ActionIcon,
    null,
    h2("circle", {
      cx: "6.25",
      cy: "10",
      r: "3.5",
      stroke: "currentColor",
      strokeWidth: "1.6"
    }),
    h2("path", {
      d: "M9.75 10h7.75m-2.5 0v2m-2.5-2v2",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
}
function CredentialBindingPanel({
  channel,
  identityLabel,
  identityPlaceholder,
  secretLabel,
  secretPlaceholder,
  busy = false,
  error = null,
  onSubmit,
  onCancel
}) {
  const [identity, setIdentity] = React3.useState("");
  const [secret, setSecret] = React3.useState("");
  const headingId = React3.useId();
  const hasIdentity = Boolean(identityLabel);
  const submit = (event) => {
    event.preventDefault();
    const normalizedIdentity = identity.trim();
    const normalizedSecret = secret.trim();
    if (hasIdentity && !normalizedIdentity || !normalizedSecret || busy) return;
    void onSubmit?.({ identity: normalizedIdentity, secret: normalizedSecret });
  };
  return h2(
    "section",
    {
      className: "ddt-card dim-surfaceCard dim-credentialPanel",
      "aria-labelledby": headingId
    },
    h2("h3", { id: headingId, className: "dim-credentialTitle" }, `\u624B\u52A8\u63A5\u5165${channel}\u673A\u5668\u4EBA`),
    h2(
      "form",
      {
        className: `dim-credentialForm${hasIdentity ? "" : " dim-credentialFormSingle"}`,
        onSubmit: submit
      },
      hasIdentity ? h2(
        "label",
        { className: "dim-credentialField" },
        h2("span", null, identityLabel),
        h2("input", {
          value: identity,
          onChange: (event) => setIdentity(event.target.value),
          placeholder: identityPlaceholder,
          maxLength: 512,
          autoCapitalize: "none",
          autoCorrect: "off",
          spellCheck: false,
          autoComplete: "off",
          disabled: busy,
          required: true
        })
      ) : null,
      h2(
        "label",
        { className: "dim-credentialField" },
        h2("span", null, secretLabel),
        h2("input", {
          type: "password",
          value: secret,
          onChange: (event) => setSecret(event.target.value),
          placeholder: secretPlaceholder,
          maxLength: 1024,
          autoCapitalize: "none",
          autoCorrect: "off",
          spellCheck: false,
          autoComplete: "new-password",
          disabled: busy,
          required: true
        })
      ),
      error ? h2("p", { className: "dim-credentialError", role: "alert" }, error.message ?? String(error)) : null,
      h2(
        "div",
        { className: "ddt-actions dim-viewActions dim-credentialActions" },
        h2("button", {
          type: "submit",
          className: "ddt-button",
          "data-kind": "primary",
          disabled: busy || hasIdentity && !identity.trim() || !secret.trim()
        }, busy ? "\u6B63\u5728\u7ED1\u5B9A\u2026" : "\u7ED1\u5B9A\u5E76\u8FDE\u63A5"),
        h2("button", {
          type: "button",
          className: "ddt-button",
          onClick: onCancel,
          disabled: busy
        }, "\u53D6\u6D88")
      )
    )
  );
}

// plugin-src/client/workspace-editor.js
var React5 = __toESM(require("react"), 1);

// plugin-src/client/workspace-directory-picker.js
var React4 = __toESM(require("react"), 1);
var import_react_dom = require("react-dom");
function pickerErrorCode(error) {
  return error?.rpcError?.code ?? error?.code;
}
function pickerErrorDetails(error) {
  return error?.rpcError?.details ?? error?.details;
}
function pickerErrorMessage(error) {
  return error?.rpcError?.message ?? error?.message ?? "\u65E0\u6CD5\u8BFB\u53D6\u76EE\u5F55\uFF0C\u8BF7\u91CD\u8BD5\u3002";
}
function FolderIcon() {
  return React4.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true"
    },
    React4.createElement("path", { d: "M3.5 7.25A2.25 2.25 0 0 1 5.75 5h4.1l1.8 2h6.6a2.25 2.25 0 0 1 2.25 2.25v7A2.75 2.75 0 0 1 17.75 19h-12A2.25 2.25 0 0 1 3.5 16.75v-9.5Z" })
  );
}
function ChevronIcon() {
  return React4.createElement("svg", {
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, React4.createElement("path", { d: "m7.5 4.5 5 5.5-5 5.5" }));
}
function displayCrumbs(listing) {
  const homeIndex = listing.crumbs.findIndex((crumb) => crumb.path === listing.home);
  if (homeIndex < 0) return listing.crumbs;
  return listing.crumbs.slice(homeIndex);
}
function WorkspaceDirectoryPicker({
  open,
  startPath,
  picker,
  busy = false,
  saveError = null,
  onPicked,
  onCancel
}) {
  const [listing, setListing] = React4.useState(null);
  const [loading, setLoading] = React4.useState(false);
  const [error, setError] = React4.useState(null);
  const [showHidden, setShowHidden] = React4.useState(false);
  const [retryKey, setRetryKey] = React4.useState(0);
  const requestRef = React4.useRef(0);
  const controllerRef = React4.useRef(null);
  const dialogRef = React4.useRef(null);
  const bodyRef = React4.useRef(null);
  const titleId = React4.useId();
  const noticeId = React4.useId();
  const initialPathRef = React4.useRef(startPath);
  const onPickedRef = React4.useRef(onPicked);
  const onCancelRef = React4.useRef(onCancel);
  const busyRef = React4.useRef(busy);
  onPickedRef.current = onPicked;
  onCancelRef.current = onCancel;
  busyRef.current = busy;
  const loadDirectory = React4.useCallback(async (path, { reportError = true } = {}) => {
    const request = requestRef.current + 1;
    requestRef.current = request;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    if (reportError) setError(null);
    try {
      const next = await picker.listDirectory(path, controller.signal);
      if (request !== requestRef.current || controller.signal.aborted) return { aborted: true };
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
      setListing(next);
      setError(null);
      return { value: next };
    } catch (cause) {
      if (request !== requestRef.current || controller.signal.aborted) return { aborted: true };
      if (reportError) setError(pickerErrorMessage(cause));
      return { error: cause };
    } finally {
      if (request === requestRef.current) setLoading(false);
    }
  }, [picker]);
  React4.useEffect(() => {
    if (!open) return void 0;
    let active = true;
    setListing(null);
    setError(null);
    setShowHidden(false);
    dialogRef.current?.focus?.();
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !busyRef.current) onCancelRef.current?.();
    };
    if (typeof document !== "undefined") document.addEventListener("keydown", handleKeyDown);
    const start = async () => {
      const initialPath = initialPathRef.current;
      const initial = await loadDirectory(initialPath || void 0, { reportError: false });
      if (!active || initial.aborted || initial.value) return;
      const code = pickerErrorCode(initial.error);
      const details = pickerErrorDetails(initial.error);
      if (code === "directory-picker-unavailable" && details?.capability === "native" && typeof picker.pickDirectory === "function") {
        setLoading(true);
        try {
          const selected = await picker.pickDirectory();
          if (!active) return;
          if (selected !== null) await onPickedRef.current?.(selected);
          else onCancelRef.current?.();
        } catch (cause) {
          if (active) setError(pickerErrorMessage(cause));
        } finally {
          if (active) setLoading(false);
        }
        return;
      }
      if (initialPath && code === "directory-unreadable") {
        const home = await loadDirectory(void 0, { reportError: false });
        if (!active || home.aborted || home.value) return;
        setError(pickerErrorMessage(home.error));
        return;
      }
      setError(pickerErrorMessage(initial.error));
    };
    void start();
    return () => {
      active = false;
      if (typeof document !== "undefined") document.removeEventListener("keydown", handleKeyDown);
      requestRef.current += 1;
      controllerRef.current?.abort();
    };
  }, [loadDirectory, open, picker, retryKey]);
  if (!open) return null;
  const entries = (listing?.entries ?? []).filter((entry) => showHidden || !entry.hidden);
  const crumbs = listing ? displayCrumbs(listing) : [];
  const presentedError = saveError ?? error;
  const content = h2(
    "div",
    {
      className: "dim-directoryPickerBackdrop",
      onMouseDown: (event) => {
        if (event.target === event.currentTarget && !busy) onCancel();
      }
    },
    h2(
      "section",
      {
        ref: dialogRef,
        className: "dim-directoryPicker",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": titleId,
        "aria-describedby": noticeId,
        tabIndex: -1
      },
      h2(
        "header",
        { className: "dim-directoryPickerHeader" },
        h2("h3", { id: titleId }, "\u9009\u62E9\u673A\u5668\u4EBA\u5DE5\u4F5C\u533A\u76EE\u5F55"),
        listing ? h2(
          "nav",
          { className: "dim-directoryCrumbs", "aria-label": "\u5F53\u524D\u76EE\u5F55" },
          crumbs.map((crumb, index) => h2(
            React4.Fragment,
            { key: crumb.path },
            index > 0 ? h2("span", { className: "dim-directoryCrumbSeparator", "aria-hidden": "true" }, "\u203A") : null,
            React4.createElement("button", {
              type: "button",
              title: crumb.path,
              disabled: loading || busy,
              "aria-current": index === crumbs.length - 1 ? "page" : void 0,
              onClick: () => void loadDirectory(crumb.path)
            }, crumb.path === listing.home ? h2("span", null, "\u4E3B\u76EE\u5F55") : crumb.name || crumb.path)
          ))
        ) : h2("p", null, "\u6B63\u5728\u51C6\u5907\u76EE\u5F55\u9009\u62E9\u5668\u2026")
      ),
      h2(
        "div",
        { ref: bodyRef, className: "dim-directoryPickerBody", "aria-busy": loading },
        loading && !listing ? h2(
          "div",
          { className: "dim-directoryPickerState" },
          h2("span", { className: "dim-directoryPickerSpinner", "aria-hidden": "true" }),
          h2("p", null, "\u6B63\u5728\u8BFB\u53D6\u76EE\u5F55\u2026")
        ) : listing ? entries.length > 0 ? h2("ul", { className: "dim-directoryList" }, entries.map((entry) => h2(
          "li",
          { key: entry.path },
          React4.createElement(
            "button",
            {
              type: "button",
              title: entry.path,
              disabled: loading || busy,
              onClick: () => void loadDirectory(entry.path)
            },
            h2("span", { className: "dim-directoryFolder" }, h2(FolderIcon)),
            React4.createElement("span", { className: "dim-directoryName" }, entry.name),
            h2("span", { className: "dim-directoryChevron" }, h2(ChevronIcon))
          )
        ))) : h2(
          "div",
          { className: "dim-directoryPickerState" },
          h2("p", null, "\u8FD9\u4E2A\u76EE\u5F55\u4E2D\u6CA1\u6709\u5B50\u6587\u4EF6\u5939\u3002")
        ) : null,
        listing?.truncated ? h2("p", { className: "dim-directoryPickerTruncated" }, "\u6B64\u76EE\u5F55\u7684\u5B50\u6587\u4EF6\u5939\u8FC7\u591A\uFF0C\u4EC5\u663E\u793A\u524D\u4E00\u90E8\u5206\u3002") : null,
        presentedError ? h2(
          "div",
          { className: "dim-directoryPickerError", role: "alert" },
          h2("span", null, presentedError),
          !listing && !busy ? h2("button", {
            type: "button",
            onClick: () => setRetryKey((value) => value + 1)
          }, "\u91CD\u8BD5") : null
        ) : null
      ),
      h2(
        "footer",
        { className: "dim-directoryPickerFooter" },
        h2(
          "button",
          {
            type: "button",
            className: "dim-directoryHidden",
            "aria-pressed": showHidden,
            onClick: () => setShowHidden((value) => !value),
            disabled: busy || !listing
          },
          h2("span", { className: "dim-directoryHiddenBox", "aria-hidden": "true" }),
          h2("span", null, "\u663E\u793A\u9690\u85CF\u6587\u4EF6\u5939")
        ),
        h2("p", { id: noticeId, className: "dim-directoryPickerNotice" }, "\u5207\u6362\u540E\u4F1A\u6E05\u9664\u8FD9\u4E2A\u673A\u5668\u4EBA\u7684\u65E7\u4F1A\u8BDD\u6620\u5C04\u3002"),
        h2(
          "div",
          { className: "dim-directoryPickerActions" },
          h2("button", { type: "button", onClick: onCancel, disabled: busy }, "\u53D6\u6D88"),
          h2("button", {
            type: "button",
            className: "dim-directoryPickerPrimary",
            disabled: busy || loading || !listing,
            onClick: () => listing && void onPicked(listing.path)
          }, busy ? "\u5207\u6362\u4E2D\u2026" : "\u9009\u62E9\u6B64\u76EE\u5F55")
        )
      )
    )
  );
  return typeof document === "undefined" ? content : (0, import_react_dom.createPortal)(content, document.body);
}

// plugin-src/client/workspace-editor.js
var WorkspaceDirectoryPickerContext = React5.createContext(null);
function WorkspaceEditor({ workspace, directoryPicker, disabled = false, onSave }) {
  const sharedDirectoryPicker = React5.useContext(WorkspaceDirectoryPickerContext);
  const activeDirectoryPicker = directoryPicker ?? sharedDirectoryPicker;
  const [open, setOpen] = React5.useState(false);
  const [saving, setSaving] = React5.useState(false);
  const [error, setError] = React5.useState(null);
  const editButtonRef = React5.useRef(null);
  const savingRef = React5.useRef(false);
  const close = React5.useCallback(() => {
    setOpen(false);
    setError(null);
    queueMicrotask(() => editButtonRef.current?.focus?.());
  }, []);
  const pick = React5.useCallback(async (value) => {
    if (!value || savingRef.current || disabled) return;
    if (value === workspace) {
      close();
      return;
    }
    savingRef.current = true;
    setSaving(true);
    setError(null);
    try {
      await onSave?.(value);
      close();
    } catch (cause) {
      setError(cause?.message ?? "\u5DE5\u4F5C\u533A\u4FEE\u6539\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002");
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }, [close, disabled, onSave, workspace]);
  return h2(
    "div",
    { className: "dim-workspace" },
    h2(
      "div",
      { className: "dim-workspaceHeader" },
      h2("span", null, "\u5F53\u524D\u5DE5\u4F5C\u533A"),
      h2("button", {
        type: "button",
        ref: editButtonRef,
        className: "dim-workspaceEdit",
        onClick: () => {
          setOpen(true);
          setError(null);
        },
        disabled: disabled || !activeDirectoryPicker
      }, "\u9009\u62E9\u76EE\u5F55")
    ),
    workspace ? React5.createElement("code", {
      className: "dim-workspacePath",
      title: workspace
    }, workspace) : h2("code", { className: "dim-workspacePath" }, "\u672A\u8BBE\u7F6E"),
    open ? h2(WorkspaceDirectoryPicker, {
      open,
      startPath: workspace,
      picker: activeDirectoryPicker,
      busy: saving || disabled,
      saveError: error,
      onPicked: pick,
      onCancel: close
    }) : null
  );
}

// plugin-src/client/workspace-snapshot-fence.js
var React6 = __toESM(require("react"), 1);
function useWorkspaceSnapshotFence() {
  const state = React6.useRef({ version: 0, pendingMutations: 0 });
  return React6.useMemo(() => Object.freeze({
    beginStatus() {
      return state.current.pendingMutations === 0 ? state.current.version : null;
    },
    canCommitStatus(version) {
      return version !== null && state.current.pendingMutations === 0 && state.current.version === version;
    },
    beginMutation() {
      state.current.pendingMutations += 1;
      state.current.version += 1;
      return state.current.version;
    },
    canCommitMutation(version) {
      return state.current.version === version;
    },
    endMutation() {
      state.current.pendingMutations = Math.max(0, state.current.pendingMutations - 1);
      return state.current.pendingMutations === 0;
    }
  }), []);
}

// plugin-src/client/channels/dingtalk/styles.js
var DINGTALK_STYLE_ID = "stu-xie-dsh-message-dingtalk-settings";
var CSS = String.raw`
.ddt-page {
  --ddt-accent: #1677ff;
  --ddt-accent-deep: #0958d9;
  --ddt-accent-wash: #eaf3ff;
  --ddt-success: var(--dsw-alias-state-success-primary, #20a162);
  --ddt-warning: var(--dsw-alias-state-warn-primary, #d97706);
  --ddt-error: var(--dsw-alias-state-error-primary, #d54941);
  width: 100%;
  max-width: 880px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 2px 0 28px;
  container-type: inline-size;
  color: var(--dsw-alias-label-primary, #1f2329);
  box-sizing: border-box;
}
.ddt-page *, .ddt-page *::before, .ddt-page *::after { box-sizing: border-box; }
.ddt-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; }
.ddt-headingCopy { min-width: 0; }
.ddt-heading h2, .ddt-heading p, .ddt-card h3, .ddt-card h4, .ddt-card p { margin: 0; }
.ddt-eyebrow { margin-bottom: 3px; color: var(--dsw-alias-label-tertiary, #8f959e); font-size: 12px; font-weight: 650; letter-spacing: .08em; text-transform: uppercase; }
.ddt-heading h2 { font-size: 20px; line-height: 28px; font-weight: 680; }
.ddt-heading p { margin-top: 5px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 13px; line-height: 20px; white-space: nowrap; }
.ddt-tools, .ddt-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
.ddt-tools { width: 100%; justify-content: space-between; flex-wrap: nowrap; }
.ddt-badge { min-height: 30px; display: inline-flex; align-items: center; gap: 7px; padding: 0 11px; border-radius: 999px; color: var(--dsw-alias-label-secondary, #646a73); background: var(--dsw-alias-bg-module-platform, #f2f3f5); font-size: 12px; white-space: nowrap; }
.ddt-dot { width: 8px; height: 8px; flex: none; border-radius: 50%; background: #aeb3bb; }
.ddt-dot[data-tone="success"] { background: var(--ddt-success); box-shadow: 0 0 0 3px color-mix(in srgb, var(--ddt-success) 14%, transparent); }
.ddt-dot[data-tone="warning"] { background: var(--ddt-warning); }
.ddt-dot[data-tone="error"] { background: var(--ddt-error); }
.ddt-button { min-height: 34px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 0 13px; border: 1px solid var(--dsw-alias-border-l2, #dfe1e5); border-radius: 8px; color: var(--dsw-alias-label-primary, #1f2329); background: var(--dsw-alias-bg-layer-1, #fff); font: inherit; font-size: 13px; font-weight: 560; text-decoration: none; cursor: pointer; transition: border-color .15s ease, background .15s ease, transform .15s ease; }
.ddt-button:hover:not(:disabled) { border-color: #aeb3bb; background: var(--dsw-alias-interactive-bg-hover, #f7f8fa); }
.ddt-button:active:not(:disabled) { transform: translateY(1px); }
.ddt-button:focus-visible { outline: 2px solid color-mix(in srgb, var(--ddt-accent) 70%, white); outline-offset: 2px; }
.ddt-button:disabled { cursor: not-allowed; opacity: .55; }
.ddt-button[data-kind="primary"] { color: #fff; border-color: var(--ddt-accent); background: var(--ddt-accent); }
.ddt-button[data-kind="primary"]:hover:not(:disabled) { border-color: var(--ddt-accent-deep); background: var(--ddt-accent-deep); }
.ddt-button[data-kind="danger"] { color: var(--ddt-error); }
.ddt-button[data-kind="quiet"] { min-height: 30px; padding: 0 10px; border-color: transparent; background: transparent; }
.ddt-card { overflow: hidden; border: 1px solid var(--dsw-alias-border-l2, #e5e6eb); border-radius: 14px; background: var(--dsw-alias-bg-layer-1, #fff); box-shadow: 0 1px 2px rgb(31 35 41 / 3%); }
.ddt-cardBody { padding: 24px; }
.ddt-empty { min-height: 230px; display: grid; grid-template-columns: minmax(0, 1fr) 180px; align-items: center; gap: 30px; }
.ddt-empty h3 { margin: 8px 0; font-size: 18px; }
.ddt-empty p { max-width: 560px; color: var(--dsw-alias-label-secondary, #646a73); line-height: 1.65; }
.ddt-empty .ddt-actions { margin-top: 20px; }
.ddt-brandMark { width: 110px; height: 110px; display: grid; place-items: center; justify-self: center; border-radius: 28px; color: #fff; background: linear-gradient(145deg, #2997ff, var(--ddt-accent)); box-shadow: 0 18px 45px rgb(22 119 255 / 23%); }
.ddt-brandMark svg { filter: drop-shadow(0 3px 8px rgb(0 35 96 / 16%)); }
.ddt-qrLayout { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 34px; align-items: start; }
.ddt-qrColumn { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.ddt-qrFrame { position: relative; width: min(270px, 100%); aspect-ratio: 1; display: grid; place-items: center; overflow: hidden; padding: 10px; border: 1px solid var(--dsw-alias-border-l2, #e5e6eb); border-radius: 16px; background: #fff; }
.ddt-qrFrame::before { content: ''; position: absolute; inset: 6px; border: 1px solid rgb(22 119 255 / 10%); border-radius: 11px; pointer-events: none; }
.ddt-qrFrame img { display: block; width: 100%; height: 100%; object-fit: contain; }
.ddt-qrFallback { padding: 24px; color: #646a73; text-align: center; }
.ddt-expired { position: absolute; inset: 0; display: grid; place-items: center; padding: 30px; color: #fff; text-align: center; font-weight: 650; white-space: pre-line; background: rgb(31 35 41 / 76%); backdrop-filter: blur(3px); }
.ddt-countdown { width: min(270px, 100%); color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; }
.ddt-countdownTop { display: flex; justify-content: space-between; margin-bottom: 6px; }
.ddt-countdown strong { color: var(--dsw-alias-label-primary, #1f2329); font-variant-numeric: tabular-nums; }
.ddt-progress { height: 4px; overflow: hidden; border-radius: 99px; background: #eef0f3; }
.ddt-progress span { display: block; width: var(--ddt-progress); height: 100%; background: var(--ddt-accent); transition: width .2s linear; }
.ddt-stateLabel { display: inline-flex; align-items: center; gap: 8px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; font-weight: 600; }
.ddt-qrCopy { min-width: 0; overflow-wrap: anywhere; }
.ddt-qrCopy h3 { margin: 9px 0 8px; font-size: 18px; }
.ddt-qrCopy > p { color: var(--dsw-alias-label-secondary, #646a73); line-height: 1.65; }
.ddt-steps { margin: 18px 0 16px; padding: 0; list-style: none; counter-reset: ddt-step; }
.ddt-steps li { position: relative; min-height: 28px; padding: 3px 0 3px 36px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 13px; line-height: 22px; counter-increment: ddt-step; }
.ddt-steps li::before { content: counter(ddt-step); position: absolute; left: 0; top: 1px; width: 26px; height: 26px; display: grid; place-items: center; border-radius: 8px; color: var(--ddt-accent-deep); background: var(--ddt-accent-wash); font-size: 12px; font-weight: 700; }
.ddt-loading { padding: 38px; color: var(--dsw-alias-label-secondary, #646a73); text-align: center; }
.ddt-loading h3 { margin: 0 0 7px; color: var(--dsw-alias-label-primary, #1f2329); font-size: 17px; }
.ddt-loading p { line-height: 1.6; }
.ddt-spinner { width: 24px; height: 24px; margin: 0 auto 13px; border: 3px solid #e6e8eb; border-top-color: var(--ddt-accent); border-radius: 50%; animation: ddt-spin .8s linear infinite; }
.ddt-statusNotice, .ddt-inlineError { display: flex; align-items: flex-start; gap: 10px; padding: 13px 15px; border: 1px solid color-mix(in srgb, var(--ddt-error) 28%, transparent); border-radius: 10px; color: var(--ddt-error); background: color-mix(in srgb, var(--ddt-error) 7%, transparent); font-size: 13px; }
.ddt-inlineError { flex-direction: column; padding: 22px; }
.ddt-inlineError h3 { font-size: 17px; }
.ddt-inlineError p { line-height: 1.55; }
.ddt-errorCode { font: 11px ui-monospace, SFMono-Regular, monospace; opacity: .8; }
.ddt-listHeading { display: flex; align-items: center; justify-content: space-between; margin: 2px 0 9px; }
.ddt-listHeading h3 { margin: 0; font-size: 14px; }
.ddt-list { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.ddt-accountTop { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.ddt-accountIdentity { min-width: 0; display: flex; align-items: center; gap: 12px; }
.ddt-avatar { width: 42px; height: 42px; display: grid; place-items: center; flex: none; border-radius: 12px; color: #fff; background: linear-gradient(145deg, #2997ff, var(--ddt-accent)); }
.ddt-accountIdentity h3 { overflow: hidden; font-size: 15px; text-overflow: ellipsis; white-space: nowrap; }
.ddt-accountIdentity p { margin-top: 4px; color: var(--dsw-alias-label-secondary, #646a73); font: 12px ui-monospace, SFMono-Regular, monospace; }
.ddt-health { display: inline-flex; align-items: center; gap: 7px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; white-space: nowrap; }
.ddt-metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 20px 0; }
.ddt-metric { min-width: 0; padding: 12px; border-radius: 9px; background: var(--dsw-alias-interactive-bg-hover, #f7f8fa); }
.ddt-metric dt { color: var(--dsw-alias-label-tertiary, #8f959e); font-size: 11px; }
.ddt-metric dd { overflow: hidden; margin: 5px 0 0; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.ddt-accountFooter { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding-top: 16px; border-top: 1px solid var(--dsw-alias-border-l1, #eef0f3); }
.ddt-accountFooter .ddt-actions { flex: none; flex-wrap: nowrap; gap: 8px; margin-top: 0; }
.ddt-accountFooter .ddt-button { flex: none; white-space: nowrap; }
.ddt-summary { color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; }
.ddt-confirm { padding: 18px 24px; border-top: 1px solid color-mix(in srgb, var(--ddt-error) 25%, transparent); background: color-mix(in srgb, var(--ddt-error) 5%, transparent); }
.ddt-confirm strong { display: block; margin-bottom: 6px; font-size: 14px; }
.ddt-confirm p { color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; line-height: 1.55; }
.ddt-confirm .ddt-actions { margin-top: 13px; }
.ddt-visuallyHidden { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes ddt-spin { to { transform: rotate(360deg); } }
@container (max-width: 680px) {
  .ddt-heading { flex-direction: column; align-items: stretch; }
  .ddt-tools { width: 100%; flex-wrap: nowrap; gap: 6px; }
  .ddt-tools .ddt-badge { min-height: 34px; padding-inline: 8px; }
  .ddt-tools .ddt-button { flex: none; padding-inline: 10px; white-space: nowrap; }
  .ddt-empty { grid-template-columns: minmax(0, 1fr); }
  .ddt-brandMark { display: none; }
  .ddt-qrLayout { grid-template-columns: minmax(0, 1fr); justify-items: center; gap: 24px; }
  .ddt-qrColumn { width: 100%; min-width: 0; }
  .ddt-qrCopy { width: 100%; }
  .ddt-metrics { gap: 8px; }
  .ddt-metric { padding: 10px; }
}
@media (max-width: 720px) {
  .ddt-heading, .ddt-accountTop { flex-direction: column; align-items: stretch; }
  .ddt-heading p { white-space: normal; }
  .ddt-empty { grid-template-columns: minmax(0, 1fr); }
  .ddt-brandMark { display: none; }
  .ddt-qrLayout { grid-template-columns: minmax(0, 1fr); justify-items: center; }
  .ddt-qrCopy { width: 100%; }
  .ddt-cardBody { padding: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .ddt-page *, .ddt-page *::before, .ddt-page *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`;
function installDingtalkStyles() {
  if (typeof document === "undefined") return () => {
  };
  const existing = document.querySelector(`style[data-plugin-css="${DINGTALK_STYLE_ID}"]`);
  if (existing) return () => {
  };
  const style = document.createElement("style");
  style.dataset.plugin = "@stu-xie/dsh-message";
  style.dataset.pluginCss = DINGTALK_STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
  return () => style.remove();
}

// plugin-src/client/channels/dingtalk/index.js
var ACTIVE_PROVISION_STATES = /* @__PURE__ */ new Set(["pending", "scanned", "authorizing", "creating", "connecting"]);
function DingtalkIcon({ size = 28 }) {
  return h2("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false"
  }, h2("path", {
    fill: "currentColor",
    d: "M37.05 22.783c-6.758-5.216-14.378-12.128-22.73-19.538-.655-.585-1.242-.354-1.536.42-1.88 4.973-.058 9.386 2.889 11.932s7.368 4.912 10.058 6.155c.105.049.013.203-.093.163-4.953-2.182-8.397-3.765-13.07-7.368-.497-.388-1.01-.242-1.07.521-.384 4.748 2.657 8.483 6.058 9.745 2.1.781 4.398 1.212 6.53 1.474.109.015.084.178-.027.178-2.747.01-6.058-.654-8.935-1.751-.606-.233-.818.25-.722.633.491 2.008 2.974 5.076 6.926 5.73a12 12 0 0 0 2.228.115c.164 0 .208.089.154.217q-2.685 4.6-2.803 4.797c-.091.152-.036.275.156.275h3.543c.164 0 .264.106.18.246l-4.958 8.196c-.191.328.035.565.395.301s15.212-11.133 15.636-11.448c.195-.142.148-.327-.124-.327h-3.18c-.206 0-.252-.14-.111-.28.14-.141 3.602-3.594 4.837-4.888 1.283-1.35 1.938-3.825-.231-5.498"
  }));
}
var Button = React7.forwardRef(function Button2({ children, kind = "secondary", className = "", ...props }, ref) {
  return h2("button", {
    ...props,
    ref,
    type: "button",
    className: `ddt-button ${className}`.trim(),
    "data-kind": kind
  }, children);
});
function Heading({ totals, adding, busy, onAdd, onCredential, credentialOpen, addButtonRef }) {
  return h2(
    "div",
    { className: "ddt-heading" },
    h2(
      "div",
      { className: "ddt-headingCopy" },
      h2("div", { className: "ddt-eyebrow" }, "Channel"),
      h2("h2", null, "\u9489\u9489\u673A\u5668\u4EBA"),
      h2("p", null, "\u901A\u8FC7\u626B\u7801\u628A\u9489\u9489\u673A\u5668\u4EBA\u63A5\u5165 DeepSeek Harness")
    ),
    h2(
      "div",
      { className: "ddt-tools" },
      h2(
        "div",
        { className: "dim-bindActions" },
        h2(Button, {
          kind: "primary",
          className: "dim-scanButton",
          onClick: onAdd,
          disabled: adding || busy,
          ref: addButtonRef,
          "aria-label": "\u626B\u7801\u63A5\u5165\u9489\u9489\u673A\u5668\u4EBA"
        }, h2(QrActionIcon), adding ? "\u6B63\u5728\u63A5\u5165" : "\u626B\u7801\u63A5\u5165\u673A\u5668\u4EBA"),
        h2(Button, {
          kind: "credential",
          className: "dim-credentialButton",
          onClick: onCredential,
          disabled: adding || busy,
          "aria-pressed": credentialOpen,
          "aria-label": "\u4F7F\u7528 Client ID \u548C Client Secret \u7ED1\u5B9A\u9489\u9489\u673A\u5668\u4EBA"
        }, h2(CredentialActionIcon), credentialOpen ? "\u6536\u8D77\u51ED\u636E" : "\u624B\u52A8\u63A5\u5165")
      ),
      totals.configured > 0 ? h2(
        "div",
        { className: "ddt-badge dim-onlineBadge" },
        h2("span", null, `${totals.connected} / ${totals.configured} \u5728\u7EBF`)
      ) : null
    )
  );
}
function LoadingView() {
  return h2(
    "div",
    { className: "ddt-card ddt-loading dim-surfaceCard dim-loadingView", "aria-busy": "true" },
    h2("div", { className: "ddt-spinner dim-spinner" }),
    h2("span", null, "\u6B63\u5728\u8BFB\u53D6\u9489\u9489\u8FDE\u63A5\u72B6\u6001\u2026")
  );
}
function EmptyView({ busy, onStart }) {
  return h2(
    "div",
    { className: "ddt-card dim-surfaceCard" },
    h2(
      "div",
      { className: "ddt-cardBody ddt-empty dim-surfaceBody dim-emptyView" },
      h2(
        "div",
        { className: "dim-emptyCopy" },
        h2(
          "div",
          { className: "ddt-stateLabel dim-stateLabel" },
          h2("span", { className: "ddt-dot dim-stateDot" }),
          h2("span", null, "\u5C1A\u672A\u63A5\u5165\u9489\u9489\u673A\u5668\u4EBA")
        ),
        h2("h3", null, "\u626B\u4E00\u6B21\u7801\uFF0C\u81EA\u52A8\u521B\u5EFA\u5E76\u8FDE\u63A5\u673A\u5668\u4EBA"),
        h2("p", null, "\u6388\u6743\u7531\u9489\u9489\u5B98\u65B9\u9875\u9762\u5B8C\u6210\u3002\u626B\u7801\u8D26\u53F7\u5FC5\u987B\u5DF2\u52A0\u5165\u4E00\u4E2A\u4F01\u4E1A/\u7EC4\u7EC7\u5E76\u6709\u6743\u521B\u5EFA\u673A\u5668\u4EBA\uFF1B\u521B\u5EFA\u6210\u529F\u540E\uFF0C\u5E94\u7528\u51ED\u636E\u4F1A\u76F4\u63A5\u5199\u5165 Harness Host\u3002"),
        h2(
          "div",
          { className: "ddt-actions dim-viewActions" },
          h2(
            Button,
            { kind: "primary", onClick: onStart, disabled: busy },
            busy ? "\u6B63\u5728\u751F\u6210\u4E8C\u7EF4\u7801\u2026" : "\u751F\u6210\u9489\u9489\u4E8C\u7EF4\u7801"
          )
        )
      ),
      h2(
        "div",
        { className: "ddt-brandMark dim-emptyBrand", "aria-hidden": "true" },
        h2(DingtalkIcon, { size: 68 })
      )
    )
  );
}
function QrPanel({ provision, now, busy, onRefresh, onCancel }) {
  const [imageFailed, setImageFailed] = React7.useState(false);
  const source = safeQrSource(provision.qrCodeDataUrl);
  const remaining = Math.max(0, provision.expiresAt - now);
  const expired = remaining === 0 || provision.status === "expired";
  const duration = Math.max(1, provision.durationMs ?? 10 * 6e4);
  const progress = Math.round(Math.min(1, remaining / duration) * 100);
  React7.useEffect(() => setImageFailed(false), [source]);
  return h2(
    "div",
    { className: "ddt-card dim-surfaceCard" },
    h2(
      "div",
      { className: "ddt-cardBody ddt-qrLayout dim-surfaceBody dim-qrLayout" },
      h2(
        "div",
        { className: "ddt-qrColumn dim-qrColumn" },
        h2(
          "div",
          { className: "ddt-qrFrame dim-qrFrame" },
          source && !imageFailed ? h2("img", {
            src: source,
            alt: "\u7528\u4E8E\u628A\u9489\u9489\u673A\u5668\u4EBA\u63A5\u5165 DeepSeek Harness \u7684\u4E00\u6B21\u6027\u4E8C\u7EF4\u7801",
            onError: () => setImageFailed(true)
          }) : h2("div", { className: "ddt-qrFallback dim-qrFallback" }, "\u4E8C\u7EF4\u7801\u56FE\u7247\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210\u3002"),
          expired ? h2("div", { className: "ddt-expired dim-qrExpired" }, "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F\n\u8BF7\u91CD\u65B0\u751F\u6210") : null
        ),
        h2(
          "div",
          { className: "ddt-countdown dim-countdown" },
          h2(
            "div",
            { className: "ddt-countdownTop dim-countdownTop" },
            h2("span", null, "\u4E8C\u7EF4\u7801\u6709\u6548\u65F6\u95F4"),
            h2("strong", null, formatRemaining(remaining))
          ),
          h2(
            "div",
            { className: "ddt-progress dim-progress", "aria-hidden": "true" },
            h2("span", { style: { "--ddt-progress": `${progress}%` } })
          )
        )
      ),
      h2(
        "div",
        { className: "ddt-qrCopy dim-qrCopy" },
        h2(
          "div",
          { className: "ddt-stateLabel dim-stateLabel" },
          h2("span", { className: "ddt-dot dim-stateDot", "data-tone": expired ? "error" : "warning" }),
          h2("span", null, expired ? "\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548" : "\u7B49\u5F85\u9489\u9489\u626B\u7801\u6388\u6743")
        ),
        h2("h3", null, expired ? "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801\u540E\u7EE7\u7EED" : "\u4F7F\u7528\u9489\u9489 App \u5B8C\u6210\u673A\u5668\u4EBA\u6388\u6743"),
        h2("p", null, "\u626B\u7801\u8D26\u53F7\u5FC5\u987B\u5DF2\u52A0\u5165\u4F01\u4E1A/\u7EC4\u7EC7\u3002\u5982\u679C\u9489\u9489\u63D0\u793A\u5C1A\u672A\u52A0\u5165\u7EC4\u7EC7\uFF0C\u8BF7\u5728\u63D0\u793A\u9875\u521B\u5EFA\u7EC4\u7EC7\uFF0C\u6216\u6362\u7528\u5DF2\u52A0\u5165\u7EC4\u7EC7\u7684\u8D26\u53F7\u3002"),
        h2(
          "ol",
          { className: "ddt-steps dim-steps" },
          h2("li", null, "\u4F7F\u7528\u5DF2\u52A0\u5165\u4F01\u4E1A/\u7EC4\u7EC7\u7684\u9489\u9489\u8D26\u53F7\u626B\u63CF\u5DE6\u4FA7\u4E8C\u7EF4\u7801"),
          h2("li", null, "\u5728\u6388\u6743\u9875\u70B9\u51FB\u201C\u4E00\u952E\u521B\u5EFA\u65B0\u673A\u5668\u4EBA\u201D"),
          h2("li", null, "\u4FDD\u6301\u672C\u9875\u6253\u5F00\uFF0C\u7B49\u5F85\u673A\u5668\u4EBA\u81EA\u52A8\u8FDE\u63A5")
        ),
        h2(
          "div",
          { className: "ddt-actions dim-viewActions" },
          expired ? h2(Button, { kind: "primary", onClick: onRefresh, disabled: busy }, "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801") : null,
          !expired ? h2(Button, { onClick: onRefresh, disabled: busy }, "\u6362\u4E00\u4E2A\u4E8C\u7EF4\u7801") : null,
          h2(Button, { onClick: onCancel, disabled: busy }, "\u53D6\u6D88")
        )
      )
    )
  );
}
function ProgressPanel({ status, busy, onCancel }) {
  const connecting = status === "connecting";
  const creating = status === "creating";
  return h2(
    "div",
    { className: "ddt-card ddt-loading dim-surfaceCard dim-loadingView", "aria-busy": "true" },
    h2("div", { className: "ddt-spinner dim-spinner" }),
    h2("h3", null, connecting ? "\u673A\u5668\u4EBA\u5DF2\u521B\u5EFA\uFF0C\u6B63\u5728\u5EFA\u7ACB\u6D88\u606F\u8FDE\u63A5" : creating ? "\u6388\u6743\u5DF2\u786E\u8BA4\uFF0C\u6B63\u5728\u521B\u5EFA\u9489\u9489\u673A\u5668\u4EBA" : "\u6B63\u5728\u786E\u8BA4\u9489\u9489\u6388\u6743"),
    h2("p", null, connecting ? "\u6B63\u5728\u68C0\u67E5\u9489\u9489 Stream \u957F\u8FDE\u63A5\uFF0C\u6210\u529F\u540E\u4F1A\u81EA\u52A8\u663E\u793A\u4E3A\u5728\u7EBF\u3002" : "\u8BF7\u52FF\u5173\u95ED\u672C\u9875\uFF0C\u9489\u9489\u5B8C\u6210\u6388\u6743\u540E\u5C06\u81EA\u52A8\u7EE7\u7EED\u3002"),
    h2(
      "div",
      { className: "ddt-actions dim-viewActions", style: { justifyContent: "center", marginTop: 14 } },
      h2(Button, { onClick: onCancel, disabled: busy }, "\u53D6\u6D88\u63A5\u5165")
    )
  );
}
function ProvisionError({ provision, busy, onRetry, onClose }) {
  const error = provision.error ?? {
    code: "DINGTALK_PROVISION_FAILED",
    message: "\u9489\u9489\u673A\u5668\u4EBA\u6CA1\u6709\u63A5\u5165\u5B8C\u6210"
  };
  return h2(
    "div",
    { className: "ddt-card dim-surfaceCard" },
    h2(
      "div",
      { className: "ddt-inlineError dim-inlineError", role: "alert" },
      h2("h3", null, provision.status === "expired" ? "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F" : "\u9489\u9489\u673A\u5668\u4EBA\u6CA1\u6709\u63A5\u5165\u5B8C\u6210"),
      h2("p", null, error.message),
      h2("span", { className: "ddt-errorCode" }, error.code),
      h2(
        "div",
        { className: "ddt-actions dim-viewActions" },
        h2(Button, { kind: "primary", onClick: onRetry, disabled: busy }, "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801"),
        h2(Button, { onClick: onClose, disabled: busy }, "\u5173\u95ED")
      )
    )
  );
}
function checkedTime(value) {
  if (!value) return "\u5C1A\u672A\u68C0\u67E5";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(value));
  } catch {
    return "\u521A\u521A";
  }
}
function RemoveConfirmation({ account, busy, onConfirm, onCancel }) {
  const cancelRef = React7.useRef(null);
  React7.useEffect(() => cancelRef.current?.focus(), []);
  return h2(
    "div",
    {
      className: "ddt-confirm dim-confirm",
      role: "alertdialog",
      "aria-label": `\u79FB\u9664${account.bot.name}`,
      onKeyDown: (event) => {
        if (event.key === "Escape" && !busy) onCancel();
      }
    },
    h2("strong", null, `\u4ECE DeepSeek Harness \u79FB\u9664\u201C${account.bot.name}\u201D\uFF1F`),
    h2("p", null, "\u8FD9\u4F1A\u505C\u6B62\u6D88\u606F\u8FDE\u63A5\uFF0C\u5E76\u5220\u9664\u672C\u673A\u4FDD\u5B58\u7684\u5E94\u7528\u51ED\u636E\u3001\u673A\u5668\u4EBA\u914D\u7F6E\u53CA\u4F1A\u8BDD\u6620\u5C04\u3002\u9489\u9489\u5F00\u653E\u5E73\u53F0\u4E2D\u7684\u673A\u5668\u4EBA\u4E0D\u4F1A\u88AB\u81EA\u52A8\u5220\u9664\u3002"),
    h2(
      "div",
      { className: "ddt-actions dim-viewActions" },
      h2(Button, { ref: cancelRef, onClick: onCancel, disabled: busy }, "\u4FDD\u7559\u673A\u5668\u4EBA"),
      h2(
        Button,
        { kind: "danger", onClick: onConfirm, disabled: busy },
        busy ? "\u6B63\u5728\u79FB\u9664\u2026" : "\u786E\u8BA4\u79FB\u9664\u63A5\u5165"
      )
    )
  );
}
function AccountCard({
  account,
  busy,
  removing,
  onReconnect,
  onWorkspaceSave,
  onRequestRemove,
  onConfirmRemove,
  onCancelRemove
}) {
  const state = busy === "reconnect" ? "connecting" : account.state;
  const tone = account.connected ? "success" : state === "error" ? "error" : "warning";
  const stateLabel = account.connected ? "\u8FD0\u884C\u6B63\u5E38" : state === "connecting" ? "\u6B63\u5728\u8FDE\u63A5" : "\u8FDE\u63A5\u672A\u5C31\u7EEA";
  const summary = account.error?.message ?? (account.connected ? null : account.health.summary);
  return h2(
    "article",
    { className: "ddt-card dim-botCard", tabIndex: -1, "data-bot-id": account.botId },
    h2(
      "div",
      { className: "ddt-cardBody dim-botCardBody" },
      h2(
        "div",
        { className: "ddt-accountTop dim-botCardTop" },
        h2(
          "div",
          { className: "ddt-accountIdentity dim-botIdentity" },
          h2("div", { className: "ddt-avatar dim-botAvatar", "aria-hidden": "true" }, h2(DingtalkIcon, { size: 29 })),
          h2(
            "div",
            { className: "dim-botName" },
            h2("h3", { title: account.bot.name }, account.bot.name),
            h2("p", { title: account.bot.clientIdMasked }, account.bot.clientIdMasked)
          )
        ),
        h2(
          "div",
          { className: "ddt-health dim-botHealth" },
          h2("span", { className: "ddt-dot dim-healthDot", "data-tone": tone }),
          h2("span", null, stateLabel)
        )
      ),
      h2(
        "dl",
        { className: "ddt-metrics dim-botMetrics" },
        h2(
          "div",
          { className: "ddt-metric dim-botMetric" },
          h2("dt", null, "\u6D88\u606F\u901A\u9053"),
          h2("dd", null, account.connected ? "Stream \u957F\u8FDE\u63A5" : "\u79BB\u7EBF")
        ),
        h2(
          "div",
          { className: "ddt-metric dim-botMetric" },
          h2("dt", null, "\u6700\u8FD1\u68C0\u67E5"),
          h2("dd", null, checkedTime(account.health.lastCheckedAt))
        )
      ),
      h2(WorkspaceEditor, {
        workspace: account.workspace,
        disabled: Boolean(busy),
        onSave: onWorkspaceSave
      }),
      h2(
        "div",
        { className: "ddt-accountFooter dim-cardFooter" },
        summary ? h2("div", { className: "ddt-summary dim-cardSummary" }, summary) : null,
        h2(
          "div",
          { className: "ddt-actions dim-cardActions" },
          h2(
            Button,
            { className: "dim-cardAction", onClick: onReconnect, disabled: Boolean(busy) },
            busy === "reconnect" ? "\u68C0\u67E5\u4E2D\u2026" : account.connected ? "\u68C0\u67E5\u8FDE\u63A5" : "\u91CD\u8BD5\u8FDE\u63A5"
          ),
          h2(
            Button,
            { className: "dim-cardAction", kind: "danger", onClick: onRequestRemove, disabled: Boolean(busy) },
            "\u79FB\u9664\u63A5\u5165"
          )
        )
      )
    ),
    removing ? h2(RemoveConfirmation, {
      account,
      busy: busy === "delete",
      onConfirm: onConfirmRemove,
      onCancel: onCancelRemove
    }) : null
  );
}
function AccountList(props) {
  return h2(
    "section",
    { className: "dim-listSection" },
    h2(
      "div",
      { className: "ddt-listHeading dim-listHeading" },
      h2("h3", null, "\u5DF2\u63A5\u5165\u7684\u9489\u9489\u673A\u5668\u4EBA")
    ),
    h2("ul", { className: "ddt-list dim-botList" }, props.bots.map((account) => h2(
      "li",
      { key: account.botId },
      h2(AccountCard, {
        account,
        busy: props.busyByBot[account.botId],
        removing: props.removeTarget === account.botId,
        onReconnect: () => props.onReconnect(account),
        onWorkspaceSave: (workspace) => props.onWorkspaceSave(account, workspace),
        onRequestRemove: () => props.onRequestRemove(account),
        onConfirmRemove: () => props.onConfirmRemove(account),
        onCancelRemove: props.onCancelRemove
      })
    )))
  );
}
var EMPTY_TOTALS = Object.freeze({ configured: 0, connected: 0 });
function DingtalkSettingsTab({ rpcCall }) {
  const [model, setModel] = React7.useState({
    phase: "loading",
    bots: [],
    totals: EMPTY_TOTALS,
    revision: 0,
    error: null
  });
  const [provision, setProvision] = React7.useState(null);
  const [busy, setBusy] = React7.useState(false);
  const [busyByBot, setBusyByBot] = React7.useState({});
  const [removeTarget, setRemoveTarget] = React7.useState(null);
  const [credentialOpen, setCredentialOpen] = React7.useState(false);
  const [credentialError, setCredentialError] = React7.useState(null);
  const [notice, setNotice] = React7.useState("");
  const [now, setNow] = React7.useState(() => Date.now());
  const addButtonRef = React7.useRef(null);
  const mountedRef = React7.useRef(true);
  const statusRequestRef = React7.useRef(0);
  const workspaceFence = useWorkspaceSnapshotFence();
  const noticeFrameRef = React7.useRef(null);
  const focusFrameRef = React7.useRef(null);
  React7.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      statusRequestRef.current += 1;
      if (noticeFrameRef.current !== null) {
        window.cancelAnimationFrame(noticeFrameRef.current);
        noticeFrameRef.current = null;
      }
      if (focusFrameRef.current !== null) {
        window.cancelAnimationFrame(focusFrameRef.current);
        focusFrameRef.current = null;
      }
    };
  }, []);
  React7.useEffect(() => installDingtalkStyles(), []);
  const announce = React7.useCallback((message) => {
    if (!mountedRef.current) return;
    if (noticeFrameRef.current !== null) {
      window.cancelAnimationFrame(noticeFrameRef.current);
      noticeFrameRef.current = null;
    }
    setNotice("");
    if (message) {
      noticeFrameRef.current = window.requestAnimationFrame(() => {
        noticeFrameRef.current = null;
        if (mountedRef.current) setNotice(message);
      });
    }
  }, []);
  const focusAddButton = React7.useCallback(() => {
    if (!mountedRef.current) return;
    if (focusFrameRef.current !== null) window.cancelAnimationFrame(focusFrameRef.current);
    focusFrameRef.current = window.requestAnimationFrame(() => {
      focusFrameRef.current = null;
      if (mountedRef.current) addButtonRef.current?.focus();
    });
  }, []);
  const invoke = React7.useCallback(async (endpoint, payload = {}, signal) => {
    if (typeof rpcCall !== "function") throw new TypeError("\u9489\u9489\u8BBE\u7F6E\u9875\u7F3A\u5C11 RPC \u8FDE\u63A5");
    return unwrapRpcResult(await rpcCall(endpoint, payload, signal));
  }, [rpcCall]);
  const loadStatus = React7.useCallback(async ({
    signal,
    silent = false,
    restoreProvisioning = false
  } = {}) => {
    if (!mountedRef.current || signal?.aborted) return void 0;
    const workspaceVersion = workspaceFence.beginStatus();
    if (workspaceVersion === null) return void 0;
    const requestId = statusRequestRef.current + 1;
    statusRequestRef.current = requestId;
    const canCommit = () => mountedRef.current && !signal?.aborted && statusRequestRef.current === requestId && workspaceFence.canCommitStatus(workspaceVersion);
    if (!silent && canCommit()) {
      setModel((current) => ({ ...current, phase: "loading", error: null }));
    }
    try {
      const snapshot = normalizeSnapshot(await invoke(DINGTALK_ENDPOINTS.status, {}, signal));
      if (!canCommit()) return void 0;
      setModel({
        phase: "ready",
        bots: snapshot.bots,
        totals: snapshot.totals,
        revision: snapshot.revision,
        error: null
      });
      if (restoreProvisioning && snapshot.provisioning) {
        setProvision((current) => !current || current.attemptId === snapshot.provisioning.attemptId ? {
          ...current,
          ...snapshot.provisioning,
          durationMs: current?.durationMs ?? Math.max(1, snapshot.provisioning.expiresAt - Date.now())
        } : current);
      }
      return snapshot;
    } catch (error) {
      if (error?.name === "AbortError" || !canCommit()) return void 0;
      setModel((current) => ({
        ...current,
        phase: silent && current.phase === "ready" ? "ready" : "error",
        error: presentError(error)
      }));
      return void 0;
    }
  }, [invoke, workspaceFence]);
  React7.useEffect(() => {
    const controller = new AbortController();
    void loadStatus({ signal: controller.signal, restoreProvisioning: true });
    return () => controller.abort();
  }, [loadStatus]);
  React7.useEffect(() => {
    if (model.phase !== "ready") return void 0;
    const controller = new AbortController();
    let running = false;
    const timer = window.setInterval(async () => {
      if (running || controller.signal.aborted || !mountedRef.current) return;
      running = true;
      await loadStatus({
        signal: controller.signal,
        silent: true,
        restoreProvisioning: false
      });
      running = false;
    }, 15e3);
    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, [loadStatus, model.phase]);
  React7.useEffect(() => {
    if (!provision || !ACTIVE_PROVISION_STATES.has(provision.status)) return void 0;
    const timer = window.setInterval(() => {
      if (mountedRef.current) setNow(Date.now());
    }, 1e3);
    return () => window.clearInterval(timer);
  }, [provision?.attemptId, provision?.status]);
  const startProvisioning = React7.useCallback(async ({ replace = false } = {}) => {
    if (!mountedRef.current) return;
    setCredentialOpen(false);
    setCredentialError(null);
    setBusy(true);
    try {
      if (replace && provision?.attemptId) {
        await invoke(DINGTALK_ENDPOINTS.cancelProvisioning, {
          attemptId: provision.attemptId
        });
        if (!mountedRef.current) return;
      }
      setProvision({ status: "starting" });
      const started = normalizeProvisioning(await invoke(
        DINGTALK_ENDPOINTS.beginProvisioning,
        { locale: "zh-CN" }
      ));
      if (!mountedRef.current) return;
      if (!started.qrCodeDataUrl) {
        throw new Error("\u9489\u9489\u626B\u7801\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u5B89\u5168\u7684\u4E8C\u7EF4\u7801");
      }
      setNow(Date.now());
      setProvision({
        ...started,
        durationMs: Math.max(1, started.expiresAt - Date.now())
      });
      announce("\u9489\u9489\u4E8C\u7EF4\u7801\u5DF2\u751F\u6210\uFF0C\u8BF7\u4F7F\u7528\u9489\u9489 App \u626B\u63CF\u3002");
    } catch (error) {
      if (!mountedRef.current) return;
      setProvision({
        attemptId: provision?.attemptId,
        status: "failed",
        error: presentError(error)
      });
    } finally {
      if (mountedRef.current) setBusy(false);
    }
  }, [announce, invoke, provision?.attemptId]);
  const bindCredentials = React7.useCallback(async ({ identity, secret }) => {
    if (!mountedRef.current) return;
    const snapshotVersion = workspaceFence.beginMutation();
    setBusy(true);
    setCredentialError(null);
    try {
      const snapshot = normalizeSnapshot(await invoke(
        DINGTALK_ENDPOINTS.bindCredentials,
        { clientId: identity, clientSecret: secret }
      ));
      if (!mountedRef.current) return;
      if (workspaceFence.canCommitMutation(snapshotVersion)) {
        setModel({
          phase: "ready",
          bots: snapshot.bots,
          totals: snapshot.totals,
          revision: snapshot.revision,
          error: null
        });
      }
      setCredentialOpen(false);
      announce("\u9489\u9489\u673A\u5668\u4EBA\u51ED\u636E\u5DF2\u7ED1\u5B9A\u3002");
    } catch (error) {
      if (mountedRef.current) setCredentialError(presentError(error));
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mountedRef.current) void loadStatus({ silent: true });
      if (mountedRef.current) setBusy(false);
    }
  }, [announce, invoke, loadStatus, workspaceFence]);
  const cancelProvisioning = React7.useCallback(async () => {
    if (!mountedRef.current) return;
    setBusy(true);
    try {
      if (provision?.attemptId && !["failed", "expired", "cancelled"].includes(provision.status)) {
        await invoke(DINGTALK_ENDPOINTS.cancelProvisioning, { attemptId: provision.attemptId });
        if (!mountedRef.current) return;
      }
      setProvision(null);
      announce("\u5DF2\u53D6\u6D88\u9489\u9489\u673A\u5668\u4EBA\u63A5\u5165\u3002");
      focusAddButton();
    } catch (error) {
      if (!mountedRef.current) return;
      setProvision((current) => ({ ...current, status: "failed", error: presentError(error) }));
    } finally {
      if (mountedRef.current) setBusy(false);
    }
  }, [announce, focusAddButton, invoke, provision?.attemptId, provision?.status]);
  React7.useEffect(() => {
    const attemptId = provision?.attemptId;
    if (!attemptId || !ACTIVE_PROVISION_STATES.has(provision.status)) return void 0;
    const controller = new AbortController();
    let disposed = false;
    let timer = null;
    const canCommit = () => !disposed && !controller.signal.aborted && mountedRef.current;
    const schedule = (delay) => {
      if (!canCommit()) return;
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = null;
        if (canCommit()) void poll();
      }, delay);
    };
    const poll = async () => {
      try {
        const response = await invoke(
          DINGTALK_ENDPOINTS.pollProvisioning,
          { attemptId },
          controller.signal
        );
        if (!canCommit()) return;
        const result = normalizeProvisioning(response);
        if (result.status === "connected") {
          const snapshot = await loadStatus({
            signal: controller.signal,
            silent: true,
            restoreProvisioning: false
          });
          if (!canCommit()) return;
          const account = result.botId ? snapshot?.bots.find((bot) => bot.botId === result.botId) : snapshot?.bots.find((bot) => bot.connected);
          if (!account?.connected) {
            setProvision((current) => current?.attemptId === attemptId ? { ...current, ...result, status: "connecting" } : current);
            schedule(result.pollIntervalMs);
            return;
          }
          setProvision(null);
          announce(result.alreadyConnected ? "\u8FD9\u4E2A\u9489\u9489\u673A\u5668\u4EBA\u5DF2\u7ECF\u63A5\u5165\u5E76\u4FDD\u6301\u5728\u7EBF\u3002" : "\u9489\u9489\u673A\u5668\u4EBA\u5DF2\u63A5\u5165\uFF0C\u53EF\u4EE5\u5F00\u59CB\u53D1\u9001\u6D88\u606F\u3002");
          return;
        }
        if (!canCommit()) return;
        setProvision((current) => current?.attemptId === attemptId ? { ...current, ...result, durationMs: current.durationMs } : current);
        if (ACTIVE_PROVISION_STATES.has(result.status)) {
          schedule(result.pollIntervalMs);
        }
      } catch (error) {
        if (error?.name === "AbortError" || !canCommit()) return;
        setProvision((current) => current?.attemptId === attemptId ? { ...current, status: "failed", error: presentError(error) } : current);
      }
    };
    schedule(provision.pollIntervalMs ?? 3e3);
    return () => {
      disposed = true;
      controller.abort();
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
    };
  }, [announce, invoke, loadStatus, provision?.attemptId, provision?.pollIntervalMs, provision?.status]);
  const setBotBusy = React7.useCallback((botId, operation) => {
    if (!mountedRef.current) return;
    setBusyByBot((current) => {
      const next = { ...current };
      if (operation) next[botId] = operation;
      else delete next[botId];
      return next;
    });
  }, []);
  const runBotAction = React7.useCallback(async ({ account, operation, endpoint, payload, success }) => {
    if (!mountedRef.current) return void 0;
    const snapshotVersion = workspaceFence.beginMutation();
    setBotBusy(account.botId, operation);
    try {
      const snapshot = normalizeSnapshot(await invoke(endpoint, payload));
      if (!mountedRef.current) return void 0;
      if (workspaceFence.canCommitMutation(snapshotVersion)) {
        setModel({
          phase: "ready",
          bots: snapshot.bots,
          totals: snapshot.totals,
          revision: snapshot.revision,
          error: null
        });
      }
      announce(typeof success === "function" ? success(snapshot) : success);
      return snapshot;
    } catch (error) {
      if (!mountedRef.current) return void 0;
      announce(`\u64CD\u4F5C\u5931\u8D25\uFF1A${presentError(error).message}`);
      return void 0;
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mountedRef.current) void loadStatus({ silent: true, restoreProvisioning: false });
      if (mountedRef.current) setBotBusy(account.botId, null);
    }
  }, [announce, invoke, loadStatus, setBotBusy, workspaceFence]);
  const reconnect = React7.useCallback((account) => runBotAction({
    account,
    operation: "reconnect",
    endpoint: DINGTALK_ENDPOINTS.reconnectBot,
    payload: { botId: account.botId },
    success: (snapshot) => snapshot?.bots.find((bot) => bot.botId === account.botId)?.connected ? "\u9489\u9489\u8FDE\u63A5\u68C0\u67E5\u5B8C\u6210\u3002" : "\u9489\u9489\u4ECD\u672A\u8FDE\u63A5\uFF0C\u63D2\u4EF6\u4F1A\u7EE7\u7EED\u81EA\u52A8\u91CD\u8BD5\u3002"
  }), [runBotAction]);
  const saveWorkspace = React7.useCallback(async (account, workspace) => {
    const workspaceVersion = workspaceFence.beginMutation();
    setBotBusy(account.botId, "workspace");
    try {
      const snapshot = normalizeSnapshot(await invoke(
        DINGTALK_ENDPOINTS.setWorkspace,
        { botId: account.botId, workspace }
      ));
      if (mountedRef.current && workspaceFence.canCommitMutation(workspaceVersion)) {
        setModel({
          phase: "ready",
          bots: snapshot.bots,
          totals: snapshot.totals,
          revision: snapshot.revision,
          error: null
        });
      }
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mountedRef.current) void loadStatus({ silent: true });
      if (mountedRef.current) setBotBusy(account.botId, null);
    }
  }, [invoke, loadStatus, setBotBusy, workspaceFence]);
  const remove = React7.useCallback(async (account) => {
    const snapshot = await runBotAction({
      account,
      operation: "delete",
      endpoint: DINGTALK_ENDPOINTS.deleteBot,
      payload: { botId: account.botId, confirm: true },
      success: "\u9489\u9489\u673A\u5668\u4EBA\u53CA\u672C\u673A\u51ED\u636E\u5DF2\u79FB\u9664\u3002"
    });
    if (snapshot && mountedRef.current) setRemoveTarget(null);
  }, [runBotAction]);
  let provisionView = null;
  if (provision?.status === "starting") {
    provisionView = h2(
      "div",
      { className: "ddt-card ddt-loading", "aria-busy": "true" },
      h2("div", { className: "ddt-spinner" }),
      h2("span", null, "\u6B63\u5728\u7533\u8BF7\u9489\u9489\u6388\u6743\u4E8C\u7EF4\u7801\u2026")
    );
  } else if (provision?.status === "pending") {
    provisionView = h2(QrPanel, {
      provision,
      now,
      busy,
      onRefresh: () => void startProvisioning({ replace: true }),
      onCancel: () => void cancelProvisioning()
    });
  } else if (["scanned", "authorizing", "creating", "connecting"].includes(provision?.status)) {
    provisionView = h2(ProgressPanel, {
      status: provision.status,
      busy,
      onCancel: () => void cancelProvisioning()
    });
  } else if (provision && ["failed", "expired", "cancelled"].includes(provision.status)) {
    provisionView = h2(ProvisionError, {
      provision,
      busy,
      onRetry: () => void startProvisioning({ replace: Boolean(provision.attemptId) }),
      onClose: () => void cancelProvisioning()
    });
  }
  const credentialView = credentialOpen ? h2(CredentialBindingPanel, {
    channel: "\u9489\u9489",
    identityLabel: "Client ID",
    identityPlaceholder: "\u586B\u5199\u9489\u9489\u5E94\u7528 Client ID",
    secretLabel: "Client Secret",
    secretPlaceholder: "\u586B\u5199\u9489\u9489\u5E94\u7528 Client Secret",
    busy,
    error: credentialError,
    onSubmit: bindCredentials,
    onCancel: () => {
      setCredentialOpen(false);
      setCredentialError(null);
    }
  }) : null;
  return h2(
    "section",
    { className: "ddt-page dim-channelPage", "aria-label": "\u9489\u9489\u8BBE\u7F6E" },
    h2(Heading, {
      totals: model.totals,
      adding: Boolean(provision),
      busy,
      onAdd: () => void startProvisioning(),
      onCredential: () => {
        setCredentialOpen((value) => !value);
        setCredentialError(null);
      },
      credentialOpen,
      addButtonRef
    }),
    h2("div", { className: "ddt-visuallyHidden", role: "status", "aria-live": "polite" }, notice),
    model.error && model.phase === "ready" ? h2("div", { className: "ddt-statusNotice dim-statusNotice", role: "alert" }, `\u72B6\u6001\u5237\u65B0\u5931\u8D25\uFF1A${model.error.message}`) : null,
    model.phase === "loading" ? h2(LoadingView) : model.phase === "error" ? h2(
      "div",
      { className: "ddt-card dim-surfaceCard" },
      h2(
        "div",
        { className: "ddt-inlineError dim-inlineError", role: "alert" },
        h2("h3", null, "\u65E0\u6CD5\u8BFB\u53D6\u9489\u9489\u673A\u5668\u4EBA\u72B6\u6001"),
        h2("p", null, model.error?.message ?? "\u8BF7\u7A0D\u540E\u91CD\u8BD5"),
        h2(Button, { onClick: () => void loadStatus() }, "\u91CD\u65B0\u8BFB\u53D6")
      )
    ) : h2(
      React7.Fragment,
      null,
      credentialView,
      provisionView,
      model.bots.length === 0 && !provision && !credentialOpen ? h2(EmptyView, { busy, onStart: () => void startProvisioning() }) : null,
      model.bots.length > 0 ? h2(AccountList, {
        bots: model.bots,
        busyByBot,
        removeTarget,
        onReconnect: (account) => void reconnect(account),
        onWorkspaceSave: saveWorkspace,
        onRequestRemove: (account) => setRemoveTarget(account.botId),
        onConfirmRemove: (account) => void remove(account),
        onCancelRemove: () => setRemoveTarget(null)
      }) : null
    )
  );
}

// plugin-src/client/channels/feishu/index.js
var React9 = __toESM(require("react"), 1);

// plugin-src/client/channels/feishu/api.js
var FEISHU_RPC_CHANNEL = "/feishu";
var FEISHU_ENDPOINTS = Object.freeze({
  status: "connection.status",
  beginProvisioning: "provision.begin",
  pollProvisioning: "provision.poll",
  cancelProvisioning: "provision.cancel",
  bindCredentials: "bot.bind-credentials",
  reconnectBot: "bot.reconnect",
  disconnectBot: "bot.disconnect",
  deleteBot: "bot.delete",
  setWorkspace: "bot.workspace.set",
  // Kept for rolling upgrades. The multi-bot UI never calls these endpoints.
  testConnection: "connection.test",
  disconnect: "connection.disconnect"
});
var CONNECTION_STATES = /* @__PURE__ */ new Set([
  "disconnected",
  "offline",
  "provisioning",
  "connecting",
  "reconnecting",
  "connected",
  "error"
]);
var POLL_STATES = /* @__PURE__ */ new Set([
  "pending",
  "scanned",
  "connecting",
  "connected",
  "expired",
  "failed"
]);
function isRecord2(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function optionalString2(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : void 0;
}
function optionalTimestamp(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.length > 0) {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? void 0 : parsed;
  }
  return void 0;
}
function clamp2(value, min, max, fallback) {
  return typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
}
function unwrapRpcResult2(result) {
  if (!isRecord2(result) || typeof result.ok !== "boolean") {
    throw new Error("\u98DE\u4E66\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u54CD\u5E94");
  }
  if (!result.ok) {
    const message = optionalString2(result.error?.message) ?? "\u98DE\u4E66\u670D\u52A1\u8BF7\u6C42\u5931\u8D25";
    const error = new Error(message);
    error.code = optionalString2(result.error?.code) ?? "FEISHU_RPC_ERROR";
    throw error;
  }
  return result.value;
}
function normalizeProvisioning2(value, now = Date.now()) {
  const source = isRecord2(value?.provisioning) ? value.provisioning : value;
  if (!isRecord2(source)) throw new Error("\u98DE\u4E66\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u4E8C\u7EF4\u7801\u4FE1\u606F");
  const attemptId = optionalString2(source.attemptId) ?? optionalString2(source.provisioningId);
  const verificationUrl = optionalString2(source.verificationUrl);
  const qrCodeDataUrl = optionalString2(source.qrCodeDataUrl);
  if (!attemptId || !verificationUrl && !qrCodeDataUrl) {
    throw new Error("\u98DE\u4E66\u670D\u52A1\u8FD4\u56DE\u7684\u4E8C\u7EF4\u7801\u4FE1\u606F\u4E0D\u5B8C\u6574");
  }
  const explicitExpiry = optionalTimestamp(source.expiresAt);
  const expireIn = clamp2(source.expireIn, 1, 60 * 60, 5 * 60);
  return {
    attemptId,
    verificationUrl,
    qrCodeDataUrl,
    expiresAt: explicitExpiry ?? now + expireIn * 1e3,
    pollIntervalMs: clamp2(source.pollIntervalMs, 800, 1e4, 1800)
  };
}
function normalizeBot2(value) {
  const source = isRecord2(value) ? value : {};
  return {
    name: optionalString2(source.name) ?? "\u98DE\u4E66\u673A\u5668\u4EBA",
    avatarUrl: optionalString2(source.avatarUrl),
    appIdMasked: optionalString2(source.appIdMasked),
    tenantName: optionalString2(source.tenantName),
    domain: source.domain === "lark" ? "lark" : "feishu",
    activated: typeof source.activated === "boolean" || typeof source.activated === "number" ? source.activated : void 0
  };
}
function normalizeHealth(value, connected = false) {
  const source = isRecord2(value) ? value : {};
  const fallbackStatus = connected ? "healthy" : "offline";
  const status = ["healthy", "degraded", "offline", "checking"].includes(source.status) ? source.status : fallbackStatus;
  return {
    status,
    summary: optionalString2(source.summary) ?? (connected ? "\u957F\u8FDE\u63A5\u8FD0\u884C\u6B63\u5E38" : "\u673A\u5668\u4EBA\u5C1A\u672A\u8FDE\u63A5"),
    lastCheckedAt: optionalTimestamp(source.lastCheckedAt),
    lastConnectedAt: optionalTimestamp(source.lastConnectedAt)
  };
}
function normalizeError2(value) {
  if (!isRecord2(value)) return void 0;
  const message = optionalString2(value.message);
  if (!message) return void 0;
  return { message, code: optionalString2(value.code) };
}
function authoritativeState(value, connected) {
  if (connected) return "connected";
  const reported = CONNECTION_STATES.has(value) ? value : "disconnected";
  if (reported === "connected" || reported === "connecting" || reported === "reconnecting") {
    return "connecting";
  }
  if (reported === "error") return "error";
  return "offline";
}
function normalizeBotConnection(value, fallbackBotId) {
  if (!isRecord2(value)) throw new Error("\u98DE\u4E66\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6548\u7684\u673A\u5668\u4EBA\u72B6\u6001");
  const botId = optionalString2(value.botId) ?? optionalString2(fallbackBotId);
  if (!botId) throw new Error("\u98DE\u4E66\u670D\u52A1\u8FD4\u56DE\u7684\u673A\u5668\u4EBA\u7F3A\u5C11 botId");
  const connected = value.connected === true;
  return {
    botId,
    state: authoritativeState(value.state, connected),
    connected,
    configured: value.configured !== false,
    workspace: optionalString2(value.workspace)?.slice(0, 4096) ?? "",
    bot: normalizeBot2(value.bot),
    health: normalizeHealth(value.health, connected),
    error: normalizeError2(value.error)
  };
}
function normalizeBotsSnapshot(value) {
  if (!isRecord2(value)) throw new Error("\u98DE\u4E66\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u8FDE\u63A5\u72B6\u6001");
  let sourceBots = Array.isArray(value.bots) ? value.bots : [];
  if (sourceBots.length === 0 && value.configured === true) {
    sourceBots = [{
      botId: optionalString2(value.botId) ?? "legacy-default",
      state: value.state,
      connected: value.connected,
      configured: true,
      bot: value.bot,
      health: value.health,
      error: value.error
    }];
  }
  const seen = /* @__PURE__ */ new Set();
  const bots = [];
  for (const source of sourceBots) {
    const bot = normalizeBotConnection(source);
    if (seen.has(bot.botId)) continue;
    seen.add(bot.botId);
    bots.push(bot);
  }
  const configured = bots.filter((bot) => bot.configured).length;
  const connected = bots.filter((bot) => bot.connected).length;
  const revision = Number.isSafeInteger(value.revision) && value.revision >= 0 ? value.revision : 0;
  const state = CONNECTION_STATES.has(value.state) ? value.state : "disconnected";
  return {
    schemaVersion: value.schemaVersion === 2 ? 2 : 1,
    revision,
    state,
    bots,
    // Derive counts from the authoritative list so stale summary fields never
    // make the UI claim that an unavailable bot is online.
    totals: { configured, connected },
    provisioning: value.provisioning ? normalizeProvisioning2(value.provisioning) : void 0,
    error: normalizeError2(value.error)
  };
}
function normalizeConnectionSnapshot(value) {
  if (!isRecord2(value)) throw new Error("\u98DE\u4E66\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u8FDE\u63A5\u72B6\u6001");
  const connected = value.connected === true;
  const reportedState = CONNECTION_STATES.has(value.state) ? value.state : "disconnected";
  const state = connected ? "connected" : reportedState === "connected" ? "connecting" : reportedState;
  const snapshot = {
    state,
    configured: value.configured === true,
    bot: normalizeBot2(value.bot),
    health: normalizeHealth(value.health, connected),
    provisioning: void 0,
    errorMessage: optionalString2(value.error?.message) ?? optionalString2(value.message)
  };
  if (value.provisioning) snapshot.provisioning = normalizeProvisioning2(value.provisioning);
  return snapshot;
}
function normalizePollResult(value) {
  if (!isRecord2(value)) throw new Error("\u98DE\u4E66\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u521B\u5EFA\u8FDB\u5EA6");
  const status = POLL_STATES.has(value.status) ? value.status : POLL_STATES.has(value.state) ? value.state : void 0;
  if (!status) throw new Error("\u98DE\u4E66\u670D\u52A1\u8FD4\u56DE\u4E86\u672A\u77E5\u7684\u521B\u5EFA\u72B6\u6001");
  const normalized = {
    status,
    botId: optionalString2(value.botId),
    message: optionalString2(value.error?.message) ?? optionalString2(value.message),
    connection: void 0,
    provisioning: void 0
  };
  if (value.provisioning) normalized.provisioning = normalizeProvisioning2(value.provisioning);
  if (status === "connected" && isRecord2(value.connection)) {
    normalized.connection = value.connection.botId ? normalizeBotConnection(value.connection) : normalizeConnectionSnapshot(value.connection);
  }
  return normalized;
}
function presentError2(error) {
  const raw = optionalString2(error?.message) ?? "\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";
  const message = raw.replace(/(client[_-]?secret|app[_-]?secret|secret|token)\s*[:=]\s*[^\s,;]+/gi, "$1=\u2022\u2022\u2022\u2022\u2022\u2022").slice(0, 240);
  return { message, code: optionalString2(error?.code) };
}
function formatRemaining2(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1e3));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// plugin-src/client/lifecycle.js
var React8 = __toESM(require("react"), 1);
function createPollScheduler({ setTimeoutFn, clearTimeoutFn }) {
  let disposed = false;
  let timer;
  return {
    get disposed() {
      return disposed;
    },
    schedule(callback, delayMs) {
      if (disposed) return false;
      if (timer !== void 0) clearTimeoutFn(timer);
      timer = setTimeoutFn(() => {
        timer = void 0;
        if (!disposed) void callback();
      }, delayMs);
      return true;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      if (timer !== void 0) clearTimeoutFn(timer);
      timer = void 0;
    }
  };
}
function createAnimationFrameScheduler({ requestFrame, cancelFrame }) {
  let disposed = false;
  const frames = /* @__PURE__ */ new Set();
  const keyedFrames = /* @__PURE__ */ new Map();
  return {
    schedule(callback, key) {
      if (disposed) return false;
      const previous = key === void 0 ? void 0 : keyedFrames.get(key);
      if (previous !== void 0) {
        keyedFrames.delete(key);
        frames.delete(previous);
        cancelFrame(previous);
      }
      let frame;
      let completed = false;
      frame = requestFrame(() => {
        completed = true;
        if (frame !== void 0) frames.delete(frame);
        if (key !== void 0 && keyedFrames.get(key) === frame) keyedFrames.delete(key);
        if (!disposed) callback();
      });
      if (!completed) {
        frames.add(frame);
        if (key !== void 0) keyedFrames.set(key, frame);
      }
      return true;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const frame of frames) cancelFrame(frame);
      frames.clear();
      keyedFrames.clear();
    }
  };
}
function useAnimationFrameScheduler() {
  const schedulerRef = React8.useRef(null);
  React8.useEffect(() => {
    const scheduler = createAnimationFrameScheduler({
      requestFrame: (callback) => window.requestAnimationFrame(callback),
      cancelFrame: (frame) => window.cancelAnimationFrame(frame)
    });
    schedulerRef.current = scheduler;
    return () => {
      scheduler.dispose();
      if (schedulerRef.current === scheduler) schedulerRef.current = null;
    };
  }, []);
  return React8.useCallback(
    (callback, key) => schedulerRef.current?.schedule(callback, key) ?? false,
    []
  );
}

// plugin-src/client/channels/feishu/styles.js
var FEISHU_STYLE_ID = "stu-xie-dsh-message-feishu-settings";
var CSS2 = String.raw`
.bxf-page {
  --bxf-accent: var(--dsw-alias-state-business-primary, #3370ff);
  --bxf-success: var(--dsw-alias-state-success-primary, #20a162);
  --bxf-warning: var(--dsw-alias-state-warn-primary, #d97706);
  --bxf-error: var(--dsw-alias-state-error-primary, #d54941);
  box-sizing: border-box;
  width: 100%;
  max-width: 860px;
  color: var(--dsw-alias-label-primary, #1f2329);
  display: flex;
  flex-direction: column;
  container-type: inline-size;
  gap: 18px;
  padding: 2px 0 24px;
}

.bxf-page *, .bxf-page *::before, .bxf-page *::after { box-sizing: border-box; }

.bxf-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.bxf-headingCopy { min-width: 0; }
.bxf-heading h2, .bxf-heading p, .bxf-card h3, .bxf-card p { margin: 0; }

.bxf-eyebrow {
  color: var(--dsw-alias-label-tertiary, #8f959e);
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: .08em;
  text-transform: uppercase;
  margin-bottom: 3px;
}

.bxf-heading h2 {
  font-size: 20px;
  line-height: 28px;
  font-weight: 650;
  letter-spacing: -.015em;
}

.bxf-heading p {
  max-width: 540px;
  color: var(--dsw-alias-label-secondary, #646a73);
  font-size: 13px;
  line-height: 20px;
  margin-top: 5px;
  white-space: nowrap;
}

.bxf-headingTools {
  width: 100%;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 8px;
}

.bxf-totalBadge {
  min-height: 28px;
  display: inline-flex;
  align-items: baseline;
  gap: 3px;
  border-radius: 999px;
  padding: 4px 10px;
  color: var(--dsw-alias-label-secondary, #646a73);
  background: var(--dsw-alias-bg-module-platform, #f2f3f5);
  font-size: 11px;
  line-height: 16px;
  white-space: nowrap;
}

.bxf-totalBadge strong { color: var(--bxf-success); font-size: 13px; }

.bxf-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l2, #dee0e3);
  border-radius: 14px;
  background: var(--dsw-alias-bg-layer-3, #fff);
  box-shadow: var(--dsw-shadow-lv1, 0 3px 12px rgba(31, 35, 41, .05));
}

.bxf-card::before {
  content: "";
  pointer-events: none;
  position: absolute;
  inset: 0 0 auto;
  height: 88px;
  background:
    radial-gradient(circle at 86% -35%, color-mix(in srgb, var(--bxf-accent) 18%, transparent), transparent 68%);
  opacity: .85;
}

.bxf-cardBody { position: relative; padding: 24px; }

.bxf-intro {
  min-height: 250px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 172px;
  gap: 32px;
  align-items: center;
}

.bxf-introCopy { max-width: 500px; }

.bxf-stateLabel {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--dsw-alias-label-secondary, #646a73);
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  margin-bottom: 13px;
}

.bxf-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--dsw-alias-label-tertiary, #8f959e);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--dsw-alias-label-tertiary, #8f959e) 12%, transparent);
}

.bxf-dot[data-tone="success"] {
  background: var(--bxf-success);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--bxf-success) 13%, transparent);
}

.bxf-dot[data-tone="warning"] {
  background: var(--bxf-warning);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--bxf-warning) 13%, transparent);
}

.bxf-dot[data-tone="error"] {
  background: var(--bxf-error);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--bxf-error) 13%, transparent);
}

.bxf-intro h3 {
  font-size: 24px;
  line-height: 34px;
  font-weight: 650;
  letter-spacing: -.02em;
}

.bxf-introCopy > p {
  max-width: 490px;
  color: var(--dsw-alias-label-secondary, #646a73);
  font-size: 14px;
  line-height: 23px;
  margin-top: 8px;
}

.bxf-note {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  color: var(--dsw-alias-label-tertiary, #8f959e);
  font-size: 12px;
  line-height: 18px;
  margin-top: 16px;
}

.bxf-note svg { flex: none; margin-top: 1px; }

.bxf-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.bxf-button {
  appearance: none;
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid var(--dsw-alias-border-l2, #dee0e3);
  border-radius: 8px;
  padding: 7px 13px;
  color: var(--dsw-alias-label-primary, #1f2329);
  background: var(--dsw-alias-bg-layer-1, #fff);
  font: inherit;
  font-size: 13px;
  font-weight: 550;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  transition: background .15s var(--ds-ease-in-out, ease), border-color .15s var(--ds-ease-in-out, ease), transform .15s var(--ds-ease-in-out, ease);
}

.bxf-button:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, #f2f3f5);
  border-color: var(--dsw-alias-border-l1, #c9cdd4);
}

.bxf-button:active:not(:disabled) { transform: translateY(1px); }

.bxf-button:focus-visible, .bxf-link:focus-visible {
  outline: 2px solid var(--bxf-accent);
  outline-offset: 2px;
}

.bxf-button:disabled { cursor: not-allowed; opacity: .55; }

.bxf-button[data-kind="primary"] {
  border-color: var(--bxf-accent);
  color: #fff;
  background: var(--bxf-accent);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--bxf-accent) 24%, transparent);
}

.bxf-button[data-kind="primary"]:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--bxf-accent) 86%, #000);
  background: color-mix(in srgb, var(--bxf-accent) 90%, #000);
}

.bxf-button[data-kind="danger"] { color: var(--bxf-error); }
.bxf-button[data-size="small"] { min-height: 32px; padding: 5px 10px; font-size: 12px; }
.bxf-bindButton { flex: none; white-space: nowrap; }

.bxf-provisionCard {
  border-color: color-mix(in srgb, var(--bxf-accent) 32%, var(--dsw-alias-border-l2, #dee0e3));
}

.bxf-markStage {
  position: relative;
  width: 156px;
  height: 156px;
  display: grid;
  place-items: center;
  justify-self: end;
}

.bxf-markStage::before, .bxf-markStage::after {
  content: "";
  position: absolute;
  border-radius: 50%;
}

.bxf-markStage::before {
  inset: 12px;
  border: 1px solid color-mix(in srgb, var(--bxf-accent) 18%, var(--dsw-alias-border-l2, #dee0e3));
  background: color-mix(in srgb, var(--bxf-accent) 4%, var(--dsw-alias-bg-layer-1, #fff));
}

.bxf-markStage::after {
  inset: 0;
  border: 1px dashed color-mix(in srgb, var(--bxf-accent) 16%, transparent);
  animation: bxf-rotate 18s linear infinite;
}

.bxf-brandMark {
  position: relative;
  z-index: 1;
  width: 68px;
  height: 68px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  color: #fff;
  background: var(--bxf-accent);
  box-shadow: 0 12px 28px color-mix(in srgb, var(--bxf-accent) 28%, transparent);
}

.bxf-qrLayout {
  display: grid;
  grid-template-columns: 236px minmax(0, 1fr);
  align-items: center;
  gap: 32px;
}

.bxf-qrColumn { min-width: 0; }

.bxf-qrFrame {
  position: relative;
  width: 222px;
  height: 222px;
  display: grid;
  place-items: center;
  border: 1px solid var(--dsw-alias-border-l2, #dee0e3);
  border-radius: 14px;
  padding: 13px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(31, 35, 41, .07);
}

.bxf-qrFrame::before, .bxf-qrFrame::after {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: var(--bxf-accent);
  border-style: solid;
}

.bxf-qrFrame::before { inset: -3px auto auto -3px; border-width: 2px 0 0 2px; border-radius: 5px 0 0; }
.bxf-qrFrame::after { inset: auto -3px -3px auto; border-width: 0 2px 2px 0; border-radius: 0 0 5px; }
.bxf-qrFrame img { width: 100%; height: 100%; display: block; object-fit: contain; }

.bxf-qrFallback {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: var(--bxf-accent);
  background: #f7f9ff;
  text-align: center;
  padding: 20px;
}

.bxf-qrFallback span { display: block; color: #646a73; font-size: 12px; line-height: 18px; margin-top: 8px; }

.bxf-expiredOverlay {
  position: absolute;
  inset: 10px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  color: #1f2329;
  background: rgba(255, 255, 255, .94);
  backdrop-filter: blur(3px);
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}

.bxf-countdown {
  width: 222px;
  color: var(--dsw-alias-label-tertiary, #8f959e);
  font-variant-numeric: tabular-nums;
  font-size: 11px;
  line-height: 17px;
  margin-top: 11px;
}

.bxf-countdownTop { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.bxf-progress { height: 3px; overflow: hidden; border-radius: 99px; background: var(--dsw-alias-bg-module-platform, #f2f3f5); margin-top: 6px; }
.bxf-progress > span { display: block; width: var(--bxf-progress, 100%); height: 100%; border-radius: inherit; background: var(--bxf-accent); transition: width 1s linear; }

.bxf-qrCopy h3 { font-size: 20px; line-height: 29px; font-weight: 650; }
.bxf-qrCopy > p { color: var(--dsw-alias-label-secondary, #646a73); font-size: 13px; line-height: 21px; margin-top: 7px; }

.bxf-steps { counter-reset: bxf-step; display: flex; flex-direction: column; gap: 11px; margin: 20px 0 0; padding: 0; list-style: none; }
.bxf-steps li { counter-increment: bxf-step; display: grid; grid-template-columns: 23px minmax(0, 1fr); align-items: start; gap: 9px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; line-height: 19px; }
.bxf-steps li::before { content: counter(bxf-step); width: 21px; height: 21px; display: grid; place-items: center; border: 1px solid var(--dsw-alias-border-l2, #dee0e3); border-radius: 50%; color: var(--dsw-alias-label-primary, #1f2329); background: var(--dsw-alias-bg-layer-1, #fff); font-size: 10px; font-weight: 650; }

.bxf-connecting { min-height: 292px; display: grid; place-items: center; text-align: center; padding: 36px 24px; }
.bxf-connectingCopy { max-width: 430px; }
.bxf-orbit { position: relative; width: 86px; height: 86px; display: grid; place-items: center; margin: 0 auto 22px; }
.bxf-orbit::before, .bxf-orbit::after { content: ""; position: absolute; border-radius: 50%; }
.bxf-orbit::before { inset: 3px; border: 1px solid color-mix(in srgb, var(--bxf-accent) 24%, transparent); animation: bxf-pulse 1.8s var(--ds-ease-in-out, ease) infinite; }
.bxf-orbit::after { inset: 0; border: 2px solid transparent; border-top-color: var(--bxf-accent); animation: bxf-rotate 1.2s linear infinite; }
.bxf-orbitCore { width: 50px; height: 50px; display: grid; place-items: center; border-radius: 16px; color: var(--bxf-accent); background: color-mix(in srgb, var(--bxf-accent) 9%, var(--dsw-alias-bg-layer-1, #fff)); }
.bxf-connecting h3 { font-size: 20px; line-height: 29px; }
.bxf-connecting p { color: var(--dsw-alias-label-secondary, #646a73); font-size: 13px; line-height: 21px; margin-top: 7px; }
.bxf-connectingCompact { min-height: 248px; }

.bxf-inlineError {
  min-height: 190px;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  align-content: center;
  gap: 15px;
  padding: 28px;
}

.bxf-inlineError h3 { font-size: 17px; line-height: 25px; margin: 0; }
.bxf-inlineError p { color: var(--dsw-alias-label-secondary, #646a73); font-size: 13px; line-height: 21px; margin-top: 5px; overflow-wrap: anywhere; }

.bxf-listSection { display: flex; flex-direction: column; gap: 10px; }
.bxf-listHeading { min-height: 28px; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 0 2px; }
.bxf-listHeading h3 { font-size: 14px; line-height: 22px; font-weight: 650; margin: 0; }
.bxf-botList { display: flex; flex-direction: column; gap: 12px; margin: 0; padding: 0; list-style: none; }
.bxf-botList > li { min-width: 0; }
.bxf-botCard:focus { outline: none; }
.bxf-botCard:focus-visible { outline: 2px solid var(--bxf-accent); outline-offset: 2px; }

.bxf-connectedTop { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.bxf-botIdentity { min-width: 0; display: flex; align-items: center; gap: 13px; }
.bxf-avatar { flex: none; width: 48px; height: 48px; display: grid; place-items: center; overflow: hidden; border: 1px solid var(--dsw-alias-border-l2, #e5e6eb); border-radius: 14px; background: var(--dsw-alias-bg-layer-1, #fff); box-shadow: 0 1px 3px rgb(31 35 41 / 7%); }
.bxf-botName { min-width: 0; }
.bxf-botName h3 { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 17px; line-height: 24px; font-weight: 650; }
.bxf-botName p { overflow: hidden; color: var(--dsw-alias-label-tertiary, #8f959e); font-family: var(--ds-font-family-code, monospace); font-size: 12px; line-height: 18px; text-overflow: ellipsis; white-space: nowrap; margin-top: 2px; }

.bxf-healthPill { flex: none; display: inline-flex; align-items: center; gap: 7px; min-height: 28px; border-radius: 999px; padding: 4px 10px; color: var(--bxf-success); background: color-mix(in srgb, var(--bxf-success) 10%, transparent); font-size: 12px; font-weight: 600; line-height: 18px; }
.bxf-healthPill[data-health="degraded"], .bxf-healthPill[data-health="checking"], .bxf-healthPill[data-health="connecting"] { color: var(--bxf-warning); background: color-mix(in srgb, var(--bxf-warning) 10%, transparent); }
.bxf-healthPill[data-health="offline"], .bxf-healthPill[data-health="error"] { color: var(--bxf-error); background: color-mix(in srgb, var(--bxf-error) 10%, transparent); }

.bxf-statusGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 22px; }
.bxf-metric { min-width: 0; border: 1px solid var(--dsw-alias-border-l2, #dee0e3); border-radius: 9px; padding: 12px 13px; background: var(--dsw-alias-bg-module-platform, #f7f8fa); }
.bxf-metric dt { color: var(--dsw-alias-label-tertiary, #8f959e); font-size: 11px; line-height: 17px; }
.bxf-metric dd { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-primary, #1f2329); font-size: 12px; line-height: 18px; font-weight: 550; margin: 3px 0 0; }

.bxf-connectedFooter { display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--dsw-alias-border-l1, #eef0f3); }
.bxf-healthSummary { min-width: 0; color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; line-height: 18px; }
.bxf-healthSummary[data-error="true"] { color: var(--bxf-error); }
.bxf-botActions { flex: none; flex-wrap: nowrap; gap: 8px; margin-top: 0; justify-content: flex-end; }
.bxf-botActions .bxf-button { flex: none; white-space: nowrap; }

.bxf-confirm {
  border-top: 1px solid var(--dsw-alias-border-l2, #dee0e3);
  background: color-mix(in srgb, var(--bxf-error) 4%, var(--dsw-alias-bg-module-platform, #f7f8fa));
  padding: 17px 24px 20px;
}
.bxf-confirm:focus { outline: none; }
.bxf-confirm h4 { font-size: 13px; line-height: 20px; margin: 0; }
.bxf-confirm p { color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; line-height: 19px; margin: 4px 0 0; }
.bxf-confirm .bxf-actions { margin-top: 12px; }

.bxf-error { min-height: 252px; display: grid; grid-template-columns: 44px minmax(0, 1fr); align-content: center; gap: 15px; padding: 30px; }
.bxf-errorIcon { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 13px; color: var(--bxf-error); background: color-mix(in srgb, var(--bxf-error) 9%, transparent); }
.bxf-error h3 { font-size: 17px; line-height: 25px; }
.bxf-error p { color: var(--dsw-alias-label-secondary, #646a73); font-size: 13px; line-height: 21px; margin-top: 5px; overflow-wrap: anywhere; }
.bxf-errorCode { display: inline-block; color: var(--dsw-alias-label-tertiary, #8f959e); font-family: var(--ds-font-family-code, monospace); font-size: 11px; margin-top: 7px; }

.bxf-statusNotice {
  display: flex;
  align-items: center;
  gap: 9px;
  border: 1px solid color-mix(in srgb, var(--bxf-warning) 28%, var(--dsw-alias-border-l2, #dee0e3));
  border-radius: 10px;
  padding: 9px 11px;
  color: var(--dsw-alias-label-secondary, #646a73);
  background: color-mix(in srgb, var(--bxf-warning) 5%, var(--dsw-alias-bg-layer-1, #fff));
  font-size: 12px;
  line-height: 18px;
}
.bxf-statusNotice > svg { flex: none; color: var(--bxf-warning); }
.bxf-statusNotice > span { min-width: 0; flex: 1; overflow-wrap: anywhere; }

.bxf-skeleton { min-height: 260px; padding: 28px; }
.bxf-skeletonLine { height: 12px; border-radius: 999px; background: linear-gradient(90deg, var(--dsw-alias-bg-module-platform, #f2f3f5), color-mix(in srgb, var(--dsw-alias-label-tertiary, #8f959e) 10%, transparent), var(--dsw-alias-bg-module-platform, #f2f3f5)); background-size: 220% 100%; animation: bxf-shimmer 1.5s linear infinite; }
.bxf-skeletonLine:nth-child(1) { width: 92px; }
.bxf-skeletonLine:nth-child(2) { width: 44%; height: 22px; margin-top: 23px; }
.bxf-skeletonLine:nth-child(3) { width: 72%; margin-top: 14px; }
.bxf-skeletonLine:nth-child(4) { width: 58%; margin-top: 9px; }
.bxf-skeletonBox { width: 138px; height: 38px; border-radius: 8px; background: var(--dsw-alias-bg-module-platform, #f2f3f5); margin-top: 28px; }

.bxf-visuallyHidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

@keyframes bxf-rotate { to { transform: rotate(360deg); } }
@keyframes bxf-pulse { 0%, 100% { transform: scale(.9); opacity: .45; } 50% { transform: scale(1.08); opacity: 1; } }
@keyframes bxf-shimmer { to { background-position: -220% 0; } }

@container (max-width: 620px) {
  .bxf-headingTools { gap: 6px; }
  .bxf-headingTools .bxf-totalBadge { padding-inline: 8px; }
  .bxf-headingTools .bxf-bindButton { padding-inline: 10px; }
}

@media (max-width: 680px) {
  .bxf-intro { grid-template-columns: minmax(0, 1fr); }
  .bxf-markStage { display: none; }
  .bxf-qrLayout { grid-template-columns: minmax(0, 1fr); justify-items: center; }
  .bxf-qrCopy { width: 100%; }
  .bxf-statusGrid { grid-template-columns: minmax(0, 1fr); }
  .bxf-connectedTop { align-items: flex-start; flex-direction: column; }
  .bxf-inlineError { grid-template-columns: minmax(0, 1fr); padding: 20px; }
  .bxf-statusNotice { align-items: flex-start; flex-wrap: wrap; }
  .bxf-cardBody { padding: 20px; }
}

@media (prefers-reduced-motion: reduce) {
  .bxf-page *, .bxf-page *::before, .bxf-page *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; }
}
`;
function installFeishuStyles() {
  if (typeof document === "undefined") {
    return () => {
    };
  }
  const existing = document.querySelector(
    `style[data-plugin-css="${FEISHU_STYLE_ID}"]`
  );
  if (existing) {
    return () => {
    };
  }
  const style = document.createElement("style");
  style.dataset.plugin = "@stu-xie/dsh-message";
  style.dataset.pluginCss = FEISHU_STYLE_ID;
  style.textContent = CSS2;
  document.head.appendChild(style);
  return () => {
    style.remove();
  };
}

// plugin-src/client/channels/feishu/index.js
function SvgIcon({ children, size = 18, className, viewBox = "0 0 24 24" }) {
  return h2("svg", {
    width: size,
    height: size,
    viewBox,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    className
  }, children);
}
function RobotIcon({ size = 26 }) {
  return h2(
    SvgIcon,
    { size },
    h2("rect", {
      x: "5",
      y: "7.5",
      width: "14",
      height: "11",
      rx: "4",
      stroke: "currentColor",
      strokeWidth: "1.7"
    }),
    h2("path", {
      d: "M12 4.5v3M8.7 12h.01M15.3 12h.01M9.2 15.3c1.67 1.08 3.93 1.08 5.6 0M3.5 11.5v3M20.5 11.5v3",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round"
    })
  );
}
function AlertIcon({ size = 22 }) {
  return h2(
    SvgIcon,
    { size },
    h2("path", {
      d: "M12 3.4 21 19H3L12 3.4Z",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinejoin: "round"
    }),
    h2("path", {
      d: "M12 9v4.4M12 16.6v.01",
      stroke: "currentColor",
      strokeWidth: "1.9",
      strokeLinecap: "round"
    })
  );
}
function QrIcon({ size = 58 }) {
  return h2(SvgIcon, { size }, h2("path", {
    d: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h2v2h-2v-2Zm4 0h2v4h-2v-4Zm-4 4h4v2h-4v-2Z",
    fill: "currentColor"
  }));
}
var Button3 = React9.forwardRef(function Button4({ children, kind = "secondary", size, icon, className = "", ...props }, ref) {
  return h2("button", {
    ...props,
    ref,
    type: "button",
    className: `bxf-button ${className}`.trim(),
    "data-kind": kind,
    "data-size": size
  }, icon, h2("span", null, children));
});
function BrandMark() {
  return h2("div", { className: "bxf-brandMark" }, h2(RobotIcon, { size: 34 }));
}
function Heading2({ totals, onAdd, onCredential, credentialOpen, adding, busy, addButtonRef }) {
  const hasBots = totals.configured > 0;
  return h2(
    "div",
    { className: "bxf-heading" },
    h2(
      "div",
      { className: "bxf-headingTools" },
      h2(
        "div",
        { className: "dim-bindActions" },
        h2(Button3, {
          kind: "primary",
          size: "small",
          className: "bxf-bindButton dim-scanButton",
          onClick: onAdd,
          disabled: adding || busy,
          ref: addButtonRef,
          "aria-busy": busy ? "true" : void 0,
          "aria-label": "\u626B\u7801\u63A5\u5165\u98DE\u4E66\u673A\u5668\u4EBA",
          icon: h2(QrActionIcon)
        }, adding ? "\u6B63\u5728\u63A5\u5165" : "\u626B\u7801\u63A5\u5165\u673A\u5668\u4EBA"),
        h2(Button3, {
          kind: "credential",
          size: "small",
          className: "dim-credentialButton",
          onClick: onCredential,
          disabled: adding || busy,
          "aria-pressed": credentialOpen,
          "aria-label": "\u4F7F\u7528 App ID \u548C App Secret \u7ED1\u5B9A\u98DE\u4E66\u673A\u5668\u4EBA",
          icon: h2(CredentialActionIcon)
        }, credentialOpen ? "\u6536\u8D77\u51ED\u636E" : "\u624B\u52A8\u63A5\u5165")
      ),
      hasBots ? h2("div", {
        className: "bxf-totalBadge dim-onlineBadge",
        "aria-label": `\u5DF2\u63A5\u5165 ${totals.configured} \u4E2A\u673A\u5668\u4EBA\uFF0C\u5176\u4E2D ${totals.connected} \u4E2A\u5728\u7EBF`
      }, h2("span", null, `${totals.connected} / ${totals.configured} \u5728\u7EBF`)) : null
    )
  );
}
function LoadingView2() {
  return h2(
    "div",
    {
      className: "bxf-card dim-surfaceCard dim-loadingView",
      "aria-busy": "true",
      "aria-label": "\u6B63\u5728\u8BFB\u53D6\u98DE\u4E66\u673A\u5668\u4EBA\u5217\u8868"
    },
    h2("div", { className: "dim-spinner", "aria-hidden": "true" }),
    h2("span", null, "\u6B63\u5728\u8BFB\u53D6\u98DE\u4E66\u8FDE\u63A5\u72B6\u6001\u2026")
  );
}
function EmptyView2({ onStart, busy }) {
  return h2(
    "div",
    { className: "bxf-card dim-surfaceCard" },
    h2(
      "div",
      { className: "bxf-cardBody bxf-intro dim-surfaceBody dim-emptyView" },
      h2(
        "div",
        { className: "bxf-introCopy dim-emptyCopy" },
        h2(
          "div",
          { className: "bxf-stateLabel dim-stateLabel" },
          h2("span", { className: "bxf-dot dim-stateDot" }),
          h2("span", null, "\u5C1A\u672A\u63A5\u5165\u673A\u5668\u4EBA")
        ),
        h2("h3", null, "\u626B\u7801\uFF0C\u521B\u5EFA\u7B2C\u4E00\u4E2A\u98DE\u4E66\u5165\u53E3"),
        h2("p", null, "\u65E0\u9700\u624B\u52A8\u586B\u5199 App ID\u3002\u4EE5\u540E\u8FD8\u53EF\u4EE5\u7EE7\u7EED\u6DFB\u52A0\u673A\u5668\u4EBA\uFF0C\u5206\u522B\u670D\u52A1\u4E0D\u540C\u56E2\u961F\u6216\u98DE\u4E66\u79DF\u6237\u3002"),
        h2(
          "div",
          { className: "bxf-actions dim-viewActions" },
          h2(Button3, {
            kind: "primary",
            onClick: onStart,
            disabled: busy,
            "aria-busy": busy ? "true" : void 0
          }, busy ? "\u6B63\u5728\u751F\u6210\u4E8C\u7EF4\u7801\u2026" : "\u751F\u6210\u98DE\u4E66\u4E8C\u7EF4\u7801")
        )
      ),
      h2("div", { className: "bxf-markStage dim-emptyBrand", "aria-hidden": "true" }, h2(BrandMark))
    )
  );
}
function safeVerificationHref(value) {
  if (!value) return void 0;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : void 0;
  } catch {
    return void 0;
  }
}
function safeQrSource2(value) {
  if (!value) return void 0;
  return /^data:image\/(?:png|webp|svg\+xml)(?:;charset=[^;,]+)?;base64,/i.test(value) ? value : void 0;
}
function QrPane({ provision, now, onRefresh, onCancel, busy }) {
  const [imageFailed, setImageFailed] = React9.useState(false);
  const qrSource = safeQrSource2(provision.qrCodeDataUrl);
  const href = safeVerificationHref(provision.verificationUrl);
  const remaining = Math.max(0, provision.expiresAt - now);
  const expired = provision.expired === true || remaining === 0;
  const progress = Math.min(1, remaining / Math.max(1, provision.durationMs ?? remaining));
  React9.useEffect(() => setImageFailed(false), [qrSource]);
  return h2(
    "div",
    { className: "bxf-card bxf-provisionCard dim-surfaceCard" },
    h2(
      "div",
      { className: "bxf-cardBody bxf-qrLayout dim-surfaceBody dim-qrLayout" },
      h2(
        "div",
        { className: "bxf-qrColumn dim-qrColumn" },
        h2(
          "div",
          { className: "bxf-qrFrame dim-qrFrame" },
          qrSource && !imageFailed ? h2("img", {
            src: qrSource,
            alt: "\u7528\u4E8E\u65B0\u589E DeepSeek Harness \u98DE\u4E66\u673A\u5668\u4EBA\u7684\u4E00\u6B21\u6027\u6388\u6743\u4E8C\u7EF4\u7801",
            onError: () => setImageFailed(true)
          }) : h2(
            "div",
            { className: "bxf-qrFallback dim-qrFallback" },
            h2("div", null, h2(QrIcon), h2("span", null, "\u4E8C\u7EF4\u7801\u672A\u5C31\u7EEA\uFF0C\u8BF7\u6253\u5F00\u6388\u6743\u94FE\u63A5"))
          ),
          expired ? h2(
            "div",
            { className: "bxf-expiredOverlay dim-qrExpired", role: "status" },
            h2("div", null, "\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548", h2("br"), "\u8BF7\u5237\u65B0\u540E\u91CD\u65B0\u626B\u7801")
          ) : null
        ),
        h2(
          "div",
          {
            className: "bxf-countdown dim-countdown",
            "aria-label": expired ? "\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548" : `\u4E8C\u7EF4\u7801\u5269\u4F59 ${formatRemaining2(remaining)}`
          },
          h2(
            "div",
            { className: "bxf-countdownTop dim-countdownTop", "aria-hidden": "true" },
            h2("span", null, expired ? "\u7B49\u5F85\u5237\u65B0" : "\u4E8C\u7EF4\u7801\u6709\u6548\u65F6\u95F4"),
            h2("strong", null, formatRemaining2(remaining))
          ),
          h2(
            "div",
            { className: "bxf-progress dim-progress", "aria-hidden": "true" },
            h2("span", { style: { "--bxf-progress": `${Math.round(progress * 100)}%` } })
          )
        )
      ),
      h2(
        "div",
        { className: "bxf-qrCopy dim-qrCopy" },
        h2(
          "div",
          { className: "bxf-stateLabel dim-stateLabel" },
          h2("span", { className: "bxf-dot dim-stateDot", "data-tone": "warning" }),
          h2("span", null, "\u6B63\u5728\u6DFB\u52A0\u65B0\u673A\u5668\u4EBA")
        ),
        h2("h3", null, expired ? "\u5237\u65B0\u4E8C\u7EF4\u7801\u540E\u7EE7\u7EED" : "\u4F7F\u7528\u98DE\u4E66\u626B\u7801\u521B\u5EFA\u673A\u5668\u4EBA"),
        h2("p", null, "\u626B\u7801\u53EA\u4F1A\u65B0\u589E\u4E00\u4E2A\u673A\u5668\u4EBA\uFF0C\u5DF2\u63A5\u5165\u7684\u673A\u5668\u4EBA\u4F1A\u7EE7\u7EED\u6B63\u5E38\u6536\u53D1\u6D88\u606F\u3002"),
        h2(
          "ol",
          { className: "bxf-steps dim-steps" },
          h2("li", null, "\u6253\u5F00\u98DE\u4E66\u79FB\u52A8\u7AEF\uFF0C\u4F7F\u7528\u626B\u4E00\u626B\u8BFB\u53D6\u4E8C\u7EF4\u7801"),
          h2("li", null, "\u6838\u5BF9\u5E94\u7528\u540D\u79F0\u4E0E\u6743\u9650\u8303\u56F4\uFF0C\u5E76\u786E\u8BA4\u521B\u5EFA"),
          h2("li", null, "\u4FDD\u6301\u672C\u9875\u6253\u5F00\uFF0C\u7B49\u5F85\u65B0\u673A\u5668\u4EBA\u7684\u957F\u8FDE\u63A5\u5C31\u7EEA")
        ),
        h2(
          "div",
          { className: "bxf-actions dim-viewActions" },
          expired ? h2(Button3, {
            kind: "primary",
            onClick: onRefresh,
            disabled: busy
          }, busy ? "\u5237\u65B0\u4E2D\u2026" : "\u5237\u65B0\u4E8C\u7EF4\u7801") : href ? h2("a", {
            className: "bxf-button bxf-link",
            "data-kind": "secondary",
            href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, h2("span", null, "\u5728\u98DE\u4E66\u4E2D\u6253\u5F00")) : null,
          !expired ? h2(Button3, { onClick: onRefresh, disabled: busy }, "\u6362\u4E00\u4E2A\u4E8C\u7EF4\u7801") : null,
          h2(Button3, { onClick: onCancel, disabled: busy }, "\u53D6\u6D88\u6DFB\u52A0")
        )
      )
    )
  );
}
function ProvisionProgress({ phase, onCancel, busy }) {
  const connecting = phase === "connecting";
  return h2(
    "div",
    {
      className: "bxf-card bxf-provisionCard dim-surfaceCard dim-loadingView",
      "aria-busy": "true"
    },
    h2("div", { className: "dim-spinner", "aria-hidden": "true" }),
    h2("h3", null, connecting ? "\u5DF2\u786E\u8BA4\uFF0C\u6B63\u5728\u8FDE\u63A5\u65B0\u673A\u5668\u4EBA" : "\u6B63\u5728\u51C6\u5907\u6388\u6743\u4E8C\u7EF4\u7801"),
    h2("p", null, connecting ? "\u6B63\u5728\u5B89\u5168\u4FDD\u5B58\u51ED\u636E\u5E76\u68C0\u67E5\u65B0\u673A\u5668\u4EBA\u7684\u6D88\u606F\u901A\u9053\uFF0C\u5176\u4ED6\u673A\u5668\u4EBA\u4E0D\u4F1A\u4E2D\u65AD\u3002" : "\u6B63\u5728\u5411\u98DE\u4E66\u7533\u8BF7\u4E00\u6B21\u6027\u6388\u6743\u4E8C\u7EF4\u7801\uFF0C\u8BF7\u7A0D\u5019\u3002"),
    connecting ? h2(
      "div",
      { className: "bxf-actions dim-viewActions", style: { justifyContent: "center" } },
      h2(Button3, { onClick: onCancel, disabled: busy }, "\u53D6\u6D88\u6DFB\u52A0")
    ) : null
  );
}
function ProvisionError2({ error, onRetry, onCancel, busy }) {
  return h2(
    "div",
    { className: "bxf-card bxf-provisionCard dim-surfaceCard" },
    h2(
      "div",
      { className: "bxf-inlineError dim-inlineError", role: "alert" },
      h2(
        "div",
        null,
        h2("h3", null, "\u65B0\u673A\u5668\u4EBA\u6CA1\u6709\u6DFB\u52A0\u5B8C\u6210"),
        h2("p", null, error.message),
        error.code ? h2("span", { className: "bxf-errorCode" }, error.code) : null,
        h2(
          "div",
          { className: "bxf-actions dim-viewActions" },
          h2(
            Button3,
            { kind: "primary", onClick: onRetry, disabled: busy },
            busy ? "\u91CD\u8BD5\u4E2D\u2026" : "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801"
          ),
          h2(Button3, { onClick: onCancel, disabled: busy }, "\u5173\u95ED")
        )
      )
    )
  );
}
var HEALTH_LABELS = {
  connected: "\u8FD0\u884C\u6B63\u5E38",
  connecting: "\u6B63\u5728\u8FDE\u63A5",
  offline: "\u8FDE\u63A5\u4E2D\u65AD",
  error: "\u9700\u8981\u5904\u7406"
};
function formatCheckedTime(timestamp5) {
  if (!timestamp5) return "\u5C1A\u672A\u68C0\u67E5";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(timestamp5));
  } catch {
    return "\u521A\u521A";
  }
}
function RemoveConfirmation2({ bot, busy, onConfirm, onCancel }) {
  const cancelRef = React9.useRef(null);
  const idPart = bot.botId.replace(/[^a-zA-Z0-9_-]/g, "-");
  const titleId = `bxf-remove-title-${idPart}`;
  const descriptionId = `bxf-remove-description-${idPart}`;
  React9.useEffect(() => cancelRef.current?.focus(), []);
  return h2(
    "div",
    {
      className: "bxf-confirm dim-confirm",
      role: "alertdialog",
      "aria-labelledby": titleId,
      "aria-describedby": descriptionId,
      onKeyDown: (event) => {
        if (event.key === "Escape" && !busy) {
          event.preventDefault();
          onCancel();
        }
      }
    },
    h2("h4", { id: titleId }, `\u4ECE DeepSeek Harness \u79FB\u9664\u201C${bot.bot.name}\u201D\uFF1F`),
    h2(
      "p",
      { id: descriptionId },
      "\u6B64\u64CD\u4F5C\u4F1A\u505C\u6B62\u8FD9\u4E2A\u673A\u5668\u4EBA\u7684\u8FDE\u63A5\uFF0C\u5E76\u5220\u9664\u4FDD\u5B58\u5728\u672C\u673A\u7684\u63A5\u5165\u914D\u7F6E\u548C\u51ED\u636E\u3002\u98DE\u4E66\u5F00\u653E\u5E73\u53F0\u4E2D\u7684\u5E94\u7528\u4E0D\u4F1A\u88AB\u81EA\u52A8\u5220\u9664\uFF0C\u5176\u4ED6\u673A\u5668\u4EBA\u4E5F\u4E0D\u53D7\u5F71\u54CD\u3002"
    ),
    h2(
      "div",
      { className: "bxf-actions dim-viewActions" },
      h2(Button3, { ref: cancelRef, onClick: onCancel, disabled: busy }, "\u4FDD\u7559\u673A\u5668\u4EBA"),
      h2(
        Button3,
        { kind: "danger", onClick: onConfirm, disabled: busy },
        busy ? "\u6B63\u5728\u79FB\u9664\u2026" : "\u786E\u8BA4\u79FB\u9664\u63A5\u5165"
      )
    )
  );
}
function BotCard({
  connection,
  busy,
  actionError,
  removing,
  onReconnect,
  onWorkspaceSave,
  onRequestRemove,
  onConfirmRemove,
  onCancelRemove,
  cardRef,
  removeButtonRef
}) {
  const { bot, health, state, connected } = connection;
  const stateForDisplay = busy === "reconnect" ? "connecting" : state;
  const tone = stateForDisplay === "connected" ? "success" : stateForDisplay === "connecting" ? "warning" : "error";
  const summary = actionError?.message ?? connection.error?.message ?? (connected ? null : health.summary);
  const titleId = `bxf-bot-${connection.botId.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  return h2(
    "article",
    {
      className: "bxf-card bxf-botCard dim-botCard",
      "aria-labelledby": titleId,
      "data-bot-id": connection.botId,
      tabIndex: -1,
      ref: cardRef
    },
    h2(
      "div",
      { className: "bxf-cardBody dim-botCardBody" },
      h2(
        "div",
        { className: "bxf-connectedTop dim-botCardTop" },
        h2(
          "div",
          { className: "bxf-botIdentity dim-botIdentity" },
          h2(
            "div",
            { className: "bxf-avatar dim-botAvatar", "aria-hidden": "true" },
            h2(FeishuLogoGlyph, { size: 34 })
          ),
          h2(
            "div",
            { className: "bxf-botName dim-botName" },
            h2("h3", { id: titleId, title: bot.name }, bot.name),
            h2("p", { title: bot.appIdMasked }, bot.appIdMasked ?? "\u5E94\u7528\u6807\u8BC6\u5DF2\u5B89\u5168\u4FDD\u5B58")
          )
        ),
        h2(
          "div",
          { className: "bxf-healthPill dim-botHealth", "data-health": stateForDisplay },
          h2("span", { className: "bxf-dot dim-healthDot", "data-tone": tone }),
          h2("span", null, HEALTH_LABELS[stateForDisplay] ?? "\u72B6\u6001\u672A\u77E5")
        )
      ),
      h2(
        "dl",
        { className: "bxf-statusGrid dim-botMetrics" },
        h2(
          "div",
          { className: "bxf-metric dim-botMetric" },
          h2("dt", null, "\u6D88\u606F\u901A\u9053"),
          h2("dd", null, connected ? "\u957F\u8FDE\u63A5" : stateForDisplay === "connecting" ? "\u8FDE\u63A5\u4E2D" : "\u5DF2\u65AD\u5F00")
        ),
        h2(
          "div",
          { className: "bxf-metric dim-botMetric" },
          h2("dt", null, "\u6700\u8FD1\u68C0\u67E5"),
          h2("dd", null, formatCheckedTime(health.lastCheckedAt))
        )
      ),
      h2(WorkspaceEditor, {
        workspace: connection.workspace,
        disabled: Boolean(busy),
        onSave: onWorkspaceSave
      }),
      h2(
        "div",
        { className: "bxf-connectedFooter dim-cardFooter" },
        summary ? h2(
          "div",
          { className: "bxf-healthSummary dim-cardSummary", "data-error": actionError || connection.error ? "true" : void 0 },
          summary
        ) : null,
        h2(
          "div",
          { className: "bxf-actions bxf-botActions dim-cardActions" },
          h2(Button3, {
            className: "dim-cardAction",
            onClick: onReconnect,
            disabled: Boolean(busy),
            "aria-busy": busy === "reconnect" ? "true" : void 0,
            "aria-label": `${connected ? "\u68C0\u67E5\u8FDE\u63A5" : "\u91CD\u8BD5\u8FDE\u63A5"}${bot.name}`
          }, busy === "reconnect" ? connected ? "\u68C0\u67E5\u4E2D\u2026" : "\u6B63\u5728\u8FDE\u63A5\u2026" : connected ? "\u68C0\u67E5\u8FDE\u63A5" : "\u91CD\u8BD5\u8FDE\u63A5"),
          h2(Button3, {
            className: "dim-cardAction",
            kind: "danger",
            onClick: onRequestRemove,
            disabled: Boolean(busy),
            ref: removeButtonRef,
            "aria-label": `\u4ECE DeepSeek Harness \u79FB\u9664${bot.name}`
          }, "\u79FB\u9664\u63A5\u5165")
        )
      )
    ),
    removing ? h2(RemoveConfirmation2, {
      bot: connection,
      busy: busy === "delete",
      onConfirm: onConfirmRemove,
      onCancel: onCancelRemove
    }) : null
  );
}
function BotList(props) {
  return h2(
    "section",
    { className: "bxf-listSection dim-listSection", "aria-labelledby": "bxf-bot-list-title" },
    h2(
      "div",
      { className: "bxf-listHeading dim-listHeading" },
      h2("h3", { id: "bxf-bot-list-title" }, "\u5DF2\u63A5\u5165\u7684\u673A\u5668\u4EBA")
    ),
    h2(
      "ul",
      { className: "bxf-botList dim-botList", role: "list" },
      props.bots.map((bot) => h2(
        "li",
        { key: bot.botId },
        h2(BotCard, {
          connection: bot,
          busy: props.busyByBot[bot.botId],
          actionError: props.errorsByBot[bot.botId],
          removing: props.removeTargetId === bot.botId,
          onReconnect: () => props.onReconnect(bot),
          onWorkspaceSave: (workspace) => props.onWorkspaceSave(bot, workspace),
          onRequestRemove: () => props.onRequestRemove(bot),
          onConfirmRemove: () => props.onConfirmRemove(bot),
          onCancelRemove: props.onCancelRemove,
          cardRef: (node) => props.setCardRef(bot.botId, node),
          removeButtonRef: (node) => props.setRemoveButtonRef(bot.botId, node)
        })
      ))
    )
  );
}
function PageError({ error, onRetry, busy }) {
  return h2(
    "div",
    { className: "bxf-card dim-surfaceCard" },
    h2(
      "div",
      { className: "bxf-error dim-inlineError", role: "alert" },
      h2(
        "div",
        null,
        h2("h3", null, "\u65E0\u6CD5\u8BFB\u53D6\u98DE\u4E66\u673A\u5668\u4EBA"),
        h2("p", null, error.message),
        error.code ? h2("span", { className: "bxf-errorCode" }, error.code) : null,
        h2(
          "div",
          { className: "bxf-actions dim-viewActions" },
          h2(
            Button3,
            { kind: "primary", onClick: onRetry, disabled: busy },
            busy ? "\u91CD\u8BD5\u4E2D\u2026" : "\u91CD\u65B0\u8BFB\u53D6"
          )
        )
      )
    )
  );
}
var EMPTY_TOTALS2 = Object.freeze({ configured: 0, connected: 0 });
function mergeFeishuSnapshotState(current, snapshot, { restoreProvisioning = false, now = Date.now() } = {}) {
  if (snapshot.revision > 0 && current.revision > snapshot.revision) return current;
  let provisioning = current.provisioning;
  if (!provisioning && restoreProvisioning && snapshot.provisioning) {
    provisioning = {
      phase: snapshot.state === "connecting" ? "connecting" : "qr",
      ...snapshot.provisioning,
      durationMs: Math.max(1, snapshot.provisioning.expiresAt - now),
      expired: snapshot.provisioning.expiresAt <= now
    };
  }
  return {
    ...current,
    phase: "ready",
    revision: snapshot.revision,
    bots: snapshot.bots,
    totals: snapshot.totals,
    provisioning,
    pageError: null,
    statusError: null
  };
}
function FeishuSettingsTab({ rpcCall }) {
  const [model, setModel] = React9.useState({
    phase: "loading",
    revision: 0,
    bots: [],
    totals: EMPTY_TOTALS2,
    provisioning: null,
    pageError: null,
    statusError: null
  });
  const [pageBusy, setPageBusy] = React9.useState(false);
  const [provisionBusy, setProvisionBusy] = React9.useState(false);
  const [credentialOpen, setCredentialOpen] = React9.useState(false);
  const [credentialBusy, setCredentialBusy] = React9.useState(false);
  const [credentialError, setCredentialError] = React9.useState(null);
  const [busyByBot, setBusyByBot] = React9.useState({});
  const [errorsByBot, setErrorsByBot] = React9.useState({});
  const [removeTargetId, setRemoveTargetId] = React9.useState(null);
  const [announcement, setAnnouncement] = React9.useState("");
  const [now, setNow] = React9.useState(() => Date.now());
  const [focusBotId, setFocusBotId] = React9.useState(null);
  const cardRefs = React9.useRef(/* @__PURE__ */ new Map());
  const removeButtonRefs = React9.useRef(/* @__PURE__ */ new Map());
  const addButtonRef = React9.useRef(null);
  const mountedRef = React9.useRef(true);
  const workspaceFence = useWorkspaceSnapshotFence();
  const scheduleAnimationFrame = useAnimationFrameScheduler();
  React9.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const announce = React9.useCallback((message) => {
    setAnnouncement("");
    scheduleAnimationFrame(() => {
      if (message) setAnnouncement(message);
    }, "announcement");
  }, [scheduleAnimationFrame]);
  const invoke = React9.useCallback(async (endpoint, payload = {}, signal) => {
    return unwrapRpcResult2(await rpcCall(endpoint, payload, signal));
  }, [rpcCall]);
  const mergeSnapshot = React9.useCallback((snapshot, { restoreProvisioning = false } = {}) => {
    const now2 = Date.now();
    setModel((current) => mergeFeishuSnapshotState(
      current,
      snapshot,
      { restoreProvisioning, now: now2 }
    ));
  }, []);
  const loadStatus = React9.useCallback(async ({ signal, silent = false, restoreProvisioning = false } = {}) => {
    const workspaceVersion = workspaceFence.beginStatus();
    if (workspaceVersion === null || !mountedRef.current) return void 0;
    if (!silent) setPageBusy(true);
    try {
      const snapshot = normalizeBotsSnapshot(await invoke(FEISHU_ENDPOINTS.status, {}, signal));
      if (signal?.aborted || !mountedRef.current || !workspaceFence.canCommitStatus(workspaceVersion)) return void 0;
      mergeSnapshot(snapshot, { restoreProvisioning });
      return snapshot;
    } catch (error) {
      if (signal?.aborted || error?.name === "AbortError" || !mountedRef.current || !workspaceFence.canCommitStatus(workspaceVersion)) return void 0;
      const presented = presentError2(error);
      setModel((current) => current.phase === "loading" || !silent ? { ...current, phase: "error", pageError: presented } : { ...current, statusError: presented });
      return void 0;
    } finally {
      if (!silent && !signal?.aborted && mountedRef.current) setPageBusy(false);
    }
  }, [invoke, mergeSnapshot, workspaceFence]);
  React9.useEffect(() => {
    const controller = new AbortController();
    void loadStatus({ signal: controller.signal, restoreProvisioning: true });
    return () => controller.abort();
  }, [loadStatus]);
  React9.useEffect(() => {
    if (model.phase !== "ready") return void 0;
    const controller = new AbortController();
    let inFlight = false;
    const timer = window.setInterval(async () => {
      if (inFlight) return;
      inFlight = true;
      await loadStatus({
        signal: controller.signal,
        silent: true,
        restoreProvisioning: false
      });
      inFlight = false;
    }, 15e3);
    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, [loadStatus, model.phase]);
  React9.useEffect(() => {
    if (!focusBotId) return;
    const node = cardRefs.current.get(focusBotId);
    if (!node) return;
    node.scrollIntoView?.({ block: "nearest", behavior: "smooth" });
    node.focus({ preventScroll: true });
    setFocusBotId(null);
  }, [focusBotId, model.bots]);
  const startProvisioning = React9.useCallback(async ({ replace = false } = {}) => {
    setCredentialOpen(false);
    setCredentialError(null);
    setProvisionBusy(true);
    announce("");
    const previousAttemptId = model.provisioning?.attemptId;
    setModel((current) => ({
      ...current,
      phase: current.phase === "loading" ? "ready" : current.phase,
      provisioning: { phase: "creating" }
    }));
    try {
      if (replace && previousAttemptId) {
        await invoke(FEISHU_ENDPOINTS.cancelProvisioning, { attemptId: previousAttemptId });
      }
      const provision2 = normalizeProvisioning2(await invoke(
        FEISHU_ENDPOINTS.beginProvisioning,
        { locale: "zh-CN" }
      ));
      const timestamp5 = Date.now();
      setNow(timestamp5);
      setModel((current) => ({
        ...current,
        provisioning: {
          phase: "qr",
          ...provision2,
          durationMs: Math.max(1, provision2.expiresAt - timestamp5),
          expired: false
        }
      }));
      announce("\u6388\u6743\u4E8C\u7EF4\u7801\u5DF2\u751F\u6210\uFF0C\u8BF7\u4F7F\u7528\u98DE\u4E66\u626B\u7801\u3002");
    } catch (error) {
      setModel((current) => ({
        ...current,
        provisioning: { phase: "error", error: presentError2(error) }
      }));
    } finally {
      setProvisionBusy(false);
    }
  }, [announce, invoke, model.provisioning?.attemptId]);
  const bindCredentials = React9.useCallback(async ({ identity, secret }) => {
    const snapshotVersion = workspaceFence.beginMutation();
    setCredentialBusy(true);
    setCredentialError(null);
    try {
      const snapshot = normalizeBotsSnapshot(await invoke(
        FEISHU_ENDPOINTS.bindCredentials,
        { appId: identity, appSecret: secret }
      ));
      if (mountedRef.current && workspaceFence.canCommitMutation(snapshotVersion)) {
        mergeSnapshot(snapshot);
      }
      setCredentialOpen(false);
      announce("\u98DE\u4E66\u673A\u5668\u4EBA\u51ED\u636E\u5DF2\u7ED1\u5B9A\u3002");
    } catch (error) {
      setCredentialError(presentError2(error));
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mountedRef.current) void loadStatus({ silent: true });
      setCredentialBusy(false);
    }
  }, [announce, invoke, loadStatus, mergeSnapshot, workspaceFence]);
  const cancelProvisioning = React9.useCallback(async () => {
    const attemptId = model.provisioning?.attemptId;
    setProvisionBusy(true);
    try {
      if (attemptId) await invoke(FEISHU_ENDPOINTS.cancelProvisioning, { attemptId });
      setModel((current) => ({ ...current, provisioning: null }));
      announce("\u5DF2\u53D6\u6D88\u6DFB\u52A0\u673A\u5668\u4EBA\u3002");
      await loadStatus({ silent: true, restoreProvisioning: false });
      scheduleAnimationFrame(() => addButtonRef.current?.focus(), "focus");
    } catch (error) {
      setModel((current) => ({
        ...current,
        provisioning: { phase: "error", attemptId, error: presentError2(error) }
      }));
    } finally {
      setProvisionBusy(false);
    }
  }, [announce, invoke, loadStatus, model.provisioning?.attemptId, scheduleAnimationFrame]);
  const countdownAttemptId = model.provisioning?.attemptId;
  const countdownPhase = model.provisioning?.phase;
  const countdownExpiresAt = model.provisioning?.expiresAt;
  const countdownExpired = model.provisioning?.expired;
  React9.useEffect(() => {
    if (!countdownAttemptId || countdownPhase !== "qr" || countdownExpired) return void 0;
    const tick = () => {
      const timestamp5 = Date.now();
      setNow(timestamp5);
      if (timestamp5 >= countdownExpiresAt) {
        setModel((current) => current.provisioning?.attemptId === countdownAttemptId ? { ...current, provisioning: { ...current.provisioning, expired: true } } : current);
      }
    };
    tick();
    const timer = window.setInterval(tick, 1e3);
    return () => window.clearInterval(timer);
  }, [countdownAttemptId, countdownPhase, countdownExpiresAt, countdownExpired]);
  React9.useEffect(() => {
    const provision2 = model.provisioning;
    if (!provision2 || !["qr", "connecting"].includes(provision2.phase) || !provision2.attemptId || provision2.expired) return void 0;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const result = normalizePollResult(await invoke(
          FEISHU_ENDPOINTS.pollProvisioning,
          { attemptId: provision2.attemptId },
          controller.signal
        ));
        if (result.status === "connected") {
          const snapshot = await loadStatus({ signal: controller.signal, silent: true, restoreProvisioning: false });
          const newBot = snapshot?.bots.find((bot) => bot.botId === result.botId);
          if (!snapshot) {
            throw new Error("\u673A\u5668\u4EBA\u5DF2\u7ECF\u521B\u5EFA\uFF0C\u4F46\u6682\u65F6\u65E0\u6CD5\u786E\u8BA4\u8FDE\u63A5\u72B6\u6001");
          }
          if (!newBot?.connected) {
            setModel((current) => current.provisioning?.attemptId === provision2.attemptId ? { ...current, provisioning: { ...current.provisioning, phase: "connecting" } } : current);
            return;
          }
          setModel((current) => ({ ...current, provisioning: null }));
          announce(newBot ? `${newBot.bot.name}\u5DF2\u8FDE\u63A5\uFF0C\u53EF\u4EE5\u5728\u98DE\u4E66\u4E2D\u5F00\u59CB\u804A\u5929\u3002` : "\u65B0\u98DE\u4E66\u673A\u5668\u4EBA\u5DF2\u8FDE\u63A5\uFF0C\u53EF\u4EE5\u5F00\u59CB\u804A\u5929\u3002");
          if (result.botId) setFocusBotId(result.botId);
          return;
        }
        if (result.status === "failed") {
          const error = new Error(result.message ?? "\u98DE\u4E66\u5E94\u7528\u521B\u5EFA\u5931\u8D25");
          error.code = "FEISHU_PROVISION_FAILED";
          throw error;
        }
        if (result.status === "expired") {
          setModel((current) => current.provisioning?.attemptId === provision2.attemptId ? { ...current, provisioning: { ...current.provisioning, phase: "qr", expired: true } } : current);
          return;
        }
        setModel((current) => {
          if (current.provisioning?.attemptId !== provision2.attemptId) return current;
          const next = result.provisioning ?? current.provisioning;
          return {
            ...current,
            provisioning: {
              ...current.provisioning,
              ...next,
              phase: ["scanned", "connecting"].includes(result.status) ? "connecting" : "qr"
            }
          };
        });
      } catch (error) {
        if (error?.name === "AbortError") return;
        setModel((current) => current.provisioning?.attemptId === provision2.attemptId ? {
          ...current,
          provisioning: {
            phase: "error",
            attemptId: provision2.attemptId,
            error: presentError2(error)
          }
        } : current);
      }
    }, provision2.pollIntervalMs);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [announce, invoke, loadStatus, model.provisioning]);
  const setBotBusy = React9.useCallback((botId, value) => {
    setBusyByBot((current) => {
      const next = { ...current };
      if (value) next[botId] = value;
      else delete next[botId];
      return next;
    });
  }, []);
  const setBotError = React9.useCallback((botId, error) => {
    setErrorsByBot((current) => {
      const next = { ...current };
      if (error) next[botId] = presentError2(error);
      else delete next[botId];
      return next;
    });
  }, []);
  const reconnectOneBot = React9.useCallback(async (connection) => {
    const { botId, bot } = connection;
    const snapshotVersion = workspaceFence.beginMutation();
    setBotBusy(botId, "reconnect");
    setBotError(botId, null);
    try {
      const snapshot = normalizeBotsSnapshot(await invoke(FEISHU_ENDPOINTS.reconnectBot, { botId }));
      if (mountedRef.current && workspaceFence.canCommitMutation(snapshotVersion)) {
        mergeSnapshot(snapshot);
      }
      const refreshed = snapshot.bots.find((item) => item.botId === botId);
      if (!refreshed?.connected) {
        const error = new Error(
          refreshed?.error?.message ?? refreshed?.health.summary ?? "\u673A\u5668\u4EBA\u4ECD\u672A\u8FDE\u63A5"
        );
        error.code = refreshed?.error?.code ?? "FEISHU_BOT_OFFLINE";
        throw error;
      }
      announce(connection.connected ? `${bot.name}\u8FDE\u63A5\u68C0\u67E5\u5B8C\u6210\u3002` : `${bot.name}\u5DF2\u91CD\u65B0\u8FDE\u63A5\u3002`);
    } catch (error) {
      setBotError(botId, error);
      announce(`${bot.name}\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u673A\u5668\u4EBA\u72B6\u6001\u3002`);
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mountedRef.current) void loadStatus({ silent: true });
      setBotBusy(botId, null);
    }
  }, [announce, invoke, loadStatus, mergeSnapshot, setBotBusy, setBotError, workspaceFence]);
  const saveWorkspace = React9.useCallback(async (connection, workspace) => {
    const { botId } = connection;
    const workspaceVersion = workspaceFence.beginMutation();
    setBotBusy(botId, "workspace");
    setBotError(botId, null);
    try {
      const snapshot = normalizeBotsSnapshot(await invoke(
        FEISHU_ENDPOINTS.setWorkspace,
        { botId, workspace }
      ));
      if (mountedRef.current && workspaceFence.canCommitMutation(workspaceVersion)) {
        mergeSnapshot(snapshot);
      }
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mountedRef.current) void loadStatus({ silent: true });
      if (mountedRef.current) setBotBusy(botId, null);
    }
  }, [invoke, loadStatus, mergeSnapshot, setBotBusy, setBotError, workspaceFence]);
  const requestRemove = React9.useCallback((connection) => {
    setRemoveTargetId(connection.botId);
  }, []);
  const cancelRemove = React9.useCallback(() => {
    const botId = removeTargetId;
    setRemoveTargetId(null);
    scheduleAnimationFrame(() => removeButtonRefs.current.get(botId)?.focus(), "focus");
  }, [removeTargetId, scheduleAnimationFrame]);
  const confirmRemove = React9.useCallback(async (connection) => {
    const { botId, bot } = connection;
    const snapshotVersion = workspaceFence.beginMutation();
    setBotBusy(botId, "delete");
    setBotError(botId, null);
    try {
      const snapshot = normalizeBotsSnapshot(await invoke(
        FEISHU_ENDPOINTS.deleteBot,
        { botId, confirm: true }
      ));
      setRemoveTargetId(null);
      if (mountedRef.current && workspaceFence.canCommitMutation(snapshotVersion)) {
        mergeSnapshot(snapshot);
      }
      announce(`${bot.name}\u5DF2\u4ECE\u6B64 DeepSeek Harness \u79FB\u9664\uFF1B\u98DE\u4E66\u5F00\u653E\u5E73\u53F0\u4E2D\u7684\u5E94\u7528\u672A\u88AB\u5220\u9664\u3002`);
      scheduleAnimationFrame(() => addButtonRef.current?.focus(), "focus");
    } catch (error) {
      setBotError(botId, error);
      announce(`${bot.name}\u79FB\u9664\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002`);
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mountedRef.current) void loadStatus({ silent: true });
      setBotBusy(botId, null);
    }
  }, [announce, invoke, loadStatus, mergeSnapshot, scheduleAnimationFrame, setBotBusy, setBotError, workspaceFence]);
  const provision = model.provisioning;
  let provisionContent = null;
  if (provision?.phase === "creating") {
    provisionContent = h2(ProvisionProgress, { phase: "creating", busy: provisionBusy });
  } else if (provision?.phase === "qr") {
    provisionContent = h2(QrPane, {
      provision,
      now,
      onRefresh: () => void startProvisioning({ replace: true }),
      onCancel: () => void cancelProvisioning(),
      busy: provisionBusy || model.phase !== "ready"
    });
  } else if (provision?.phase === "connecting") {
    provisionContent = h2(ProvisionProgress, {
      phase: "connecting",
      onCancel: () => void cancelProvisioning(),
      busy: provisionBusy
    });
  } else if (provision?.phase === "error") {
    provisionContent = h2(ProvisionError2, {
      error: provision.error,
      onRetry: () => void startProvisioning({ replace: Boolean(provision.attemptId) }),
      onCancel: () => void cancelProvisioning(),
      busy: provisionBusy
    });
  }
  const credentialContent = credentialOpen ? h2(CredentialBindingPanel, {
    channel: "\u98DE\u4E66",
    identityLabel: "App ID",
    identityPlaceholder: "\u586B\u5199\u98DE\u4E66\u5F00\u653E\u5E73\u53F0 App ID",
    secretLabel: "App Secret",
    secretPlaceholder: "\u586B\u5199\u98DE\u4E66\u5F00\u653E\u5E73\u53F0 App Secret",
    busy: credentialBusy,
    error: credentialError,
    onSubmit: bindCredentials,
    onCancel: () => {
      setCredentialOpen(false);
      setCredentialError(null);
    }
  }) : null;
  const setCardRef = React9.useCallback((botId, node) => {
    if (node) cardRefs.current.set(botId, node);
    else cardRefs.current.delete(botId);
  }, []);
  const setRemoveButtonRef = React9.useCallback((botId, node) => {
    if (node) removeButtonRefs.current.set(botId, node);
    else removeButtonRefs.current.delete(botId);
  }, []);
  return h2(
    "section",
    { className: "bxf-page dim-channelPage", "aria-label": "\u98DE\u4E66\u673A\u5668\u4EBA\u8BBE\u7F6E" },
    h2(Heading2, {
      totals: model.totals,
      onAdd: () => void startProvisioning(),
      onCredential: () => {
        setCredentialOpen((value) => !value);
        setCredentialError(null);
      },
      credentialOpen,
      adding: Boolean(provision),
      busy: provisionBusy || credentialBusy,
      addButtonRef
    }),
    h2("div", {
      className: "bxf-visuallyHidden",
      role: "status",
      "aria-live": "polite",
      "aria-atomic": "true"
    }, announcement),
    model.statusError ? h2(
      "div",
      { className: "bxf-statusNotice dim-statusNotice", role: "status" },
      h2(AlertIcon, { size: 16 }),
      h2("span", null, `\u72B6\u6001\u81EA\u52A8\u5237\u65B0\u5931\u8D25\uFF1A${model.statusError.message}`),
      h2(Button3, { size: "small", onClick: () => void loadStatus({ silent: true }), disabled: pageBusy }, "\u7ACB\u5373\u91CD\u8BD5")
    ) : null,
    model.phase === "loading" ? h2(LoadingView2) : model.phase === "error" ? h2(PageError, {
      error: model.pageError ?? { message: "\u65E0\u6CD5\u8BFB\u53D6\u8FDE\u63A5\u72B6\u6001" },
      onRetry: () => void loadStatus(),
      busy: pageBusy
    }) : h2(
      React9.Fragment,
      null,
      credentialContent,
      provisionContent,
      model.bots.length === 0 && !provision && !credentialOpen ? h2(EmptyView2, { onStart: () => void startProvisioning(), busy: provisionBusy }) : null,
      model.bots.length > 0 ? h2(BotList, {
        bots: model.bots,
        busyByBot,
        errorsByBot,
        removeTargetId,
        onReconnect: (bot) => void reconnectOneBot(bot),
        onWorkspaceSave: saveWorkspace,
        onRequestRemove: requestRemove,
        onConfirmRemove: (bot) => void confirmRemove(bot),
        onCancelRemove: cancelRemove,
        setCardRef,
        setRemoveButtonRef
      }) : null
    )
  );
}

// plugin-src/client/channels/qq/api.js
var QQ_RPC_CHANNEL = "/qq";
var QQ_ENDPOINTS = Object.freeze({
  status: "connection.status",
  beginProvisioning: "provision.begin",
  pollProvisioning: "provision.poll",
  cancelProvisioning: "provision.cancel",
  bindCredentials: "bot.bind-credentials",
  reconnectBot: "bot.reconnect",
  deleteBot: "bot.delete",
  setWorkspace: "bot.workspace.set"
});
var PROVISION_STATES2 = /* @__PURE__ */ new Set(["starting", "pending", "refreshing", "connecting", "connected", "failed", "cancelled"]);
var ACCOUNT_STATES2 = /* @__PURE__ */ new Set(["connected", "connecting", "offline", "error"]);
var QR_DATA_URL2 = /^data:image\/(?:png|webp);base64,[a-z\d+/]+={0,2}$/i;
function isRecord3(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function text(value, fallback, max = 240) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, max) : fallback;
}
function id(value) {
  const result = text(value, "", 128);
  return /^[a-z\d_-]+$/i.test(result) ? result : void 0;
}
function timestamp2(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = typeof value === "string" ? Date.parse(value) : Number.NaN;
  return Number.isNaN(parsed) ? void 0 : parsed;
}
function unwrapRpcResult3(result) {
  if (!isRecord3(result) || typeof result.ok !== "boolean") throw new Error("QQ \u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u54CD\u5E94");
  if (!result.ok) {
    const error = new Error(text(result.error?.message, "QQ \u64CD\u4F5C\u5931\u8D25"));
    error.code = text(result.error?.code, "QQ_RPC_ERROR", 80);
    throw error;
  }
  return result.value;
}
function safeQrSource3(value) {
  return typeof value === "string" && value.length <= 2 * 1024 * 1024 && QR_DATA_URL2.test(value) ? value : void 0;
}
function normalizeProvisioning3(value, now = Date.now()) {
  const source = isRecord3(value?.provisioning) ? value.provisioning : value;
  if (!isRecord3(source)) throw new Error("QQ \u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u626B\u7801\u7ED1\u5B9A\u8FDB\u5EA6");
  const attemptId = id(source.attemptId);
  if (!attemptId) throw new Error("QQ \u626B\u7801\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u7ED1\u5B9A\u4EFB\u52A1");
  const reported = text(source.status, "failed", 32);
  const result = {
    attemptId,
    status: PROVISION_STATES2.has(reported) ? reported : "failed",
    expiresAt: timestamp2(source.expiresAt) ?? now + 5 * 6e4,
    pollIntervalMs: Math.min(1e4, Math.max(500, Number(source.pollIntervalMs) || 1e3)),
    qrRevision: Number.isSafeInteger(source.qrRevision) ? source.qrRevision : 0
  };
  const qrCodeDataUrl = safeQrSource3(source.qrCodeDataUrl);
  if (qrCodeDataUrl) result.qrCodeDataUrl = qrCodeDataUrl;
  if (id(source.botId)) result.botId = id(source.botId);
  if (isRecord3(source.error)) result.error = {
    code: text(source.error.code, "QQ_PROVISION_FAILED", 80),
    message: text(source.error.message, "QQ \u673A\u5668\u4EBA\u6CA1\u6709\u63A5\u5165\u5B8C\u6210")
  };
  return result;
}
function normalizeBot3(value) {
  if (!isRecord3(value) || !id(value.botId)) return void 0;
  const connected = value.connected === true;
  const state = ACCOUNT_STATES2.has(value.state) ? value.state : "offline";
  return {
    botId: id(value.botId),
    connected,
    state: connected ? "connected" : state,
    workspace: text(value.workspace, "", 4096),
    bot: {
      name: text(value.bot?.name, "QQ\u673A\u5668\u4EBA", 100),
      appIdMasked: text(value.bot?.appIdMasked, "\u5E94\u7528\u6807\u8BC6\u5DF2\u5B89\u5168\u4FDD\u5B58", 140)
    },
    health: {
      summary: text(value.health?.summary, connected ? "QQ WebSocket \u957F\u8FDE\u63A5\u8FD0\u884C\u6B63\u5E38" : "QQ \u8FDE\u63A5\u5C1A\u672A\u5C31\u7EEA"),
      lastCheckedAt: timestamp2(value.health?.lastCheckedAt)
    },
    error: isRecord3(value.error) ? {
      code: text(value.error.code, "QQ_ACCOUNT_ERROR", 80),
      message: text(value.error.message, "QQ \u8FDE\u63A5\u5C1A\u672A\u5C31\u7EEA")
    } : null
  };
}
function normalizeSnapshot2(value) {
  const source = isRecord3(value?.snapshot) ? value.snapshot : value;
  if (!isRecord3(source) || !Array.isArray(source.bots)) throw new Error("QQ \u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u673A\u5668\u4EBA\u5217\u8868");
  const bots = source.bots.map(normalizeBot3).filter(Boolean);
  return {
    revision: Number.isSafeInteger(source.revision) ? source.revision : 0,
    bots,
    totals: { configured: bots.length, connected: bots.filter((bot) => bot.connected).length },
    provisioning: source.provisioning ? normalizeProvisioning3(source.provisioning) : null
  };
}
function presentError3(error) {
  return {
    code: text(error?.code, "QQ_ERROR", 80),
    message: text(error?.message, "QQ \u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5")
  };
}
function formatRemaining3(milliseconds) {
  const seconds = Math.max(0, Math.ceil(Number(milliseconds) / 1e3) || 0);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

// plugin-src/client/channels/qq/index.js
var React10 = __toESM(require("react"), 1);

// plugin-src/client/channels/qq/styles.js
var QQ_STYLE_ID = "stu-xie-dsh-message-qq-settings";
var CSS3 = String.raw`
.dqq-page { --ddt-accent: #1677ff; --ddt-accent-deep: #0958d9; --ddt-accent-wash: #eaf3ff; }
.dqq-avatar, .dqq-brand { color: #fff; background: #1677ff; }
.dqq-avatar svg, .dqq-brand svg { display: block; }
`;
function installQqStyles() {
  if (typeof document === "undefined") return () => {
  };
  const existing = document.querySelector(`style[data-plugin-css="${QQ_STYLE_ID}"]`);
  if (existing) return () => {
  };
  const style = document.createElement("style");
  style.dataset.plugin = "@stu-xie/dsh-message";
  style.dataset.pluginCss = QQ_STYLE_ID;
  style.textContent = CSS3;
  document.head.appendChild(style);
  return () => style.remove();
}

// plugin-src/client/channels/qq/index.js
var ACTIVE_STATES = /* @__PURE__ */ new Set(["pending", "refreshing", "connecting"]);
var Button5 = React10.forwardRef(function Button6({ children, kind = "secondary", className = "", ...props }, ref) {
  return h2("button", {
    ...props,
    ref,
    type: "button",
    className: `ddt-button ${className}`.trim(),
    "data-kind": kind
  }, children);
});
function checkedTime2(value) {
  if (!value) return "\u5C1A\u672A\u68C0\u67E5";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(value));
  } catch {
    return "\u521A\u521A";
  }
}
function Heading3({ totals, adding, busy, onAdd, onCredential, credentialOpen, addButtonRef }) {
  return h2(
    "div",
    { className: "ddt-heading" },
    h2(
      "div",
      { className: "ddt-tools" },
      h2(
        "div",
        { className: "dim-bindActions" },
        h2(Button5, {
          kind: "primary",
          className: "dim-scanButton",
          onClick: onAdd,
          disabled: adding || busy,
          ref: addButtonRef,
          "aria-label": "\u626B\u7801\u63A5\u5165 QQ \u673A\u5668\u4EBA"
        }, h2(QrActionIcon), adding ? "\u6B63\u5728\u63A5\u5165" : "\u626B\u7801\u63A5\u5165\u673A\u5668\u4EBA"),
        h2(Button5, {
          kind: "credential",
          className: "dim-credentialButton",
          onClick: onCredential,
          disabled: adding || busy,
          "aria-pressed": credentialOpen,
          "aria-label": "\u4F7F\u7528 AppID \u548C AppSecret \u7ED1\u5B9A QQ \u673A\u5668\u4EBA"
        }, h2(CredentialActionIcon), credentialOpen ? "\u6536\u8D77\u51ED\u636E" : "\u624B\u52A8\u63A5\u5165")
      ),
      totals.configured > 0 ? h2(
        "div",
        { className: "ddt-badge dim-onlineBadge" },
        h2("span", null, `${totals.connected} / ${totals.configured} \u5728\u7EBF`)
      ) : null
    )
  );
}
function LoadingView3() {
  return h2(
    "div",
    { className: "ddt-card ddt-loading dim-surfaceCard dim-loadingView", "aria-busy": "true" },
    h2("div", { className: "ddt-spinner dim-spinner" }),
    h2("span", null, "\u6B63\u5728\u8BFB\u53D6 QQ \u673A\u5668\u4EBA\u72B6\u6001\u2026")
  );
}
function EmptyView3({ busy, onStart }) {
  return h2(
    "div",
    { className: "ddt-card dim-surfaceCard" },
    h2(
      "div",
      { className: "ddt-cardBody ddt-empty dim-surfaceBody dim-emptyView" },
      h2(
        "div",
        { className: "dim-emptyCopy" },
        h2(
          "div",
          { className: "ddt-stateLabel dim-stateLabel" },
          h2("span", { className: "ddt-dot dim-stateDot" }),
          h2("span", null, "\u5C1A\u672A\u7ED1\u5B9A QQ \u673A\u5668\u4EBA")
        ),
        h2("h3", null, "\u4F7F\u7528\u624B\u673A QQ \u626B\u7801\u521B\u5EFA\u5E76\u7ED1\u5B9A\u673A\u5668\u4EBA"),
        h2("p", null, "\u626B\u7801\u7531\u817E\u8BAF\u5B98\u65B9\u9875\u9762\u5B8C\u6210\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u586B\u5199 AppID \u6216 AppSecret\u3002\u626B\u7801\u6210\u529F\u540E\uFF0C\u673A\u5668\u4EBA\u4F1A\u81EA\u52A8\u8FDE\u63A5 DeepSeek Harness\u3002"),
        h2(
          "div",
          { className: "ddt-actions dim-viewActions" },
          h2(
            Button5,
            { kind: "primary", onClick: onStart, disabled: busy },
            busy ? "\u6B63\u5728\u751F\u6210\u4E8C\u7EF4\u7801\u2026" : "\u751F\u6210 QQ \u4E8C\u7EF4\u7801"
          )
        )
      ),
      h2(
        "div",
        { className: "ddt-brandMark dim-emptyBrand dqq-brand", "aria-hidden": "true" },
        h2(QqLogoGlyph, { size: 64 })
      )
    )
  );
}
function QrPanel2({ provision, now, busy, onRefresh, onCancel }) {
  const source = safeQrSource3(provision.qrCodeDataUrl);
  const remaining = Math.max(0, provision.expiresAt - now);
  const duration = Math.max(1, provision.durationMs ?? 5 * 6e4);
  const progress = Math.round(Math.min(1, remaining / duration) * 100);
  const refreshing = provision.status === "refreshing";
  return h2(
    "div",
    { className: "ddt-card dim-surfaceCard" },
    h2(
      "div",
      { className: "ddt-cardBody ddt-qrLayout dim-surfaceBody dim-qrLayout" },
      h2(
        "div",
        { className: "ddt-qrColumn dim-qrColumn" },
        h2(
          "div",
          { className: "ddt-qrFrame dim-qrFrame" },
          source ? h2("img", { src: source, alt: "\u7528\u4E8E\u7ED1\u5B9A QQ \u673A\u5668\u4EBA\u7684\u4E00\u6B21\u6027\u4E8C\u7EF4\u7801" }) : h2(
            "div",
            { className: "ddt-qrFallback dim-qrFallback" },
            refreshing ? "\u4E8C\u7EF4\u7801\u6B63\u5728\u81EA\u52A8\u5237\u65B0\u2026" : "\u4E8C\u7EF4\u7801\u56FE\u7247\u6B63\u5728\u751F\u6210\u2026"
          )
        ),
        h2(
          "div",
          { className: "ddt-countdown dim-countdown" },
          h2(
            "div",
            { className: "ddt-countdownTop dim-countdownTop" },
            h2("span", null, "\u5F53\u524D\u4E8C\u7EF4\u7801\u6709\u6548\u65F6\u95F4"),
            h2("strong", null, refreshing ? "--:--" : formatRemaining3(remaining))
          ),
          h2("div", { className: "ddt-progress dim-progress", style: { "--ddt-progress": `${progress}%` } }, h2("span"))
        )
      ),
      h2(
        "div",
        { className: "ddt-qrCopy dim-qrCopy" },
        h2(
          "div",
          { className: "ddt-stateLabel dim-stateLabel" },
          h2("span", { className: "ddt-dot dim-stateDot", "data-tone": "warning" }),
          h2("span", null, refreshing ? "\u6B63\u5728\u5237\u65B0\u4E8C\u7EF4\u7801" : "\u7B49\u5F85\u624B\u673A QQ \u626B\u7801")
        ),
        h2("h3", null, "\u4F7F\u7528\u624B\u673A QQ \u5B8C\u6210\u673A\u5668\u4EBA\u7ED1\u5B9A"),
        h2("p", null, "\u817E\u8BAF\u9875\u9762\u4F1A\u521B\u5EFA\u6216\u7ED1\u5B9A\u4E00\u4E2A QQ \u673A\u5668\u4EBA\uFF0C\u5E76\u628A\u8FDE\u63A5\u51ED\u636E\u5B89\u5168\u4EA4\u7ED9\u672C\u673A Harness Host\u3002"),
        h2(
          "ol",
          { className: "ddt-steps dim-steps" },
          h2("li", null, "\u6253\u5F00\u624B\u673A QQ\uFF0C\u626B\u63CF\u5DE6\u4FA7\u4E8C\u7EF4\u7801"),
          h2("li", null, "\u5728\u817E\u8BAF\u6388\u6743\u9875\u9762\u786E\u8BA4\u521B\u5EFA\u6216\u7ED1\u5B9A\u673A\u5668\u4EBA"),
          h2("li", null, "\u8FD4\u56DE\u8FD9\u91CC\u7B49\u5F85\u8FDE\u63A5\u5B8C\u6210")
        ),
        h2(
          "div",
          { className: "ddt-actions dim-viewActions" },
          h2(Button5, { onClick: onRefresh, disabled: busy }, "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801"),
          h2(Button5, { kind: "quiet", onClick: onCancel, disabled: busy }, "\u53D6\u6D88")
        )
      )
    )
  );
}
function ProvisionView({ provision, busy, onRetry, onClose }) {
  if (provision.status === "connecting") {
    return h2(
      "div",
      { className: "ddt-card ddt-loading dim-surfaceCard dim-specialView", "aria-busy": "true" },
      h2("div", { className: "ddt-spinner dim-spinner" }),
      h2("h3", null, "QQ \u5DF2\u6388\u6743\uFF0C\u6B63\u5728\u8FDE\u63A5\u673A\u5668\u4EBA"),
      h2("p", null, "\u51ED\u636E\u6B63\u5728\u5199\u5165\u672C\u673A\uFF0C\u5E76\u542F\u52A8 QQ WebSocket \u6D88\u606F\u8FDE\u63A5\u3002")
    );
  }
  const error = provision.error ?? { code: "QQ_PROVISION_FAILED", message: "QQ \u673A\u5668\u4EBA\u6CA1\u6709\u7ED1\u5B9A\u5B8C\u6210" };
  return h2(
    "div",
    { className: "ddt-card dim-surfaceCard" },
    h2(
      "div",
      { className: "ddt-inlineError dim-inlineError", role: "alert" },
      h2("h3", null, "QQ \u673A\u5668\u4EBA\u6CA1\u6709\u7ED1\u5B9A\u5B8C\u6210"),
      h2("p", null, error.message),
      h2("span", { className: "ddt-errorCode" }, error.code),
      h2(
        "div",
        { className: "ddt-actions dim-viewActions" },
        h2(Button5, { kind: "primary", onClick: onRetry, disabled: busy }, "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801"),
        h2(Button5, { onClick: onClose, disabled: busy }, "\u5173\u95ED")
      )
    )
  );
}
function RemoveConfirmation3({ account, busy, onConfirm, onCancel }) {
  return h2(
    "div",
    { className: "ddt-confirm dim-confirm", role: "alertdialog" },
    h2("strong", null, `\u4ECE DeepSeek Harness \u79FB\u9664\u201C${account.bot.name}\u201D\uFF1F`),
    h2("p", null, "\u8FD9\u4F1A\u505C\u6B62\u6D88\u606F\u8FDE\u63A5\uFF0C\u5E76\u5220\u9664\u672C\u673A\u4FDD\u5B58\u7684\u5E94\u7528\u51ED\u636E\u3001\u673A\u5668\u4EBA\u914D\u7F6E\u53CA\u4F1A\u8BDD\u6620\u5C04\u3002\u817E\u8BAF\u5E73\u53F0\u4E2D\u7684\u673A\u5668\u4EBA\u4E0D\u4F1A\u88AB\u81EA\u52A8\u5220\u9664\u3002"),
    h2(
      "div",
      { className: "ddt-actions dim-viewActions" },
      h2(Button5, { onClick: onCancel, disabled: busy }, "\u4FDD\u7559\u673A\u5668\u4EBA"),
      h2(Button5, { kind: "danger", onClick: onConfirm, disabled: busy }, busy ? "\u6B63\u5728\u79FB\u9664\u2026" : "\u786E\u8BA4\u79FB\u9664\u63A5\u5165")
    )
  );
}
function AccountCard2({
  account,
  busy,
  removing,
  onReconnect,
  onWorkspaceSave,
  onRequestRemove,
  onConfirmRemove,
  onCancelRemove
}) {
  const tone = account.connected ? "success" : account.state === "error" ? "error" : "warning";
  const stateLabel = account.connected ? "\u8FD0\u884C\u6B63\u5E38" : account.state === "connecting" ? "\u6B63\u5728\u8FDE\u63A5" : "\u8FDE\u63A5\u672A\u5C31\u7EEA";
  const summary = account.error?.message ?? (account.connected ? null : account.health.summary);
  return h2(
    "article",
    { className: "ddt-card dim-botCard", "data-bot-id": account.botId },
    h2(
      "div",
      { className: "ddt-cardBody dim-botCardBody" },
      h2(
        "div",
        { className: "ddt-accountTop dim-botCardTop" },
        h2(
          "div",
          { className: "ddt-accountIdentity dim-botIdentity" },
          h2("div", { className: "ddt-avatar dim-botAvatar dqq-avatar", "aria-hidden": "true" }, h2(QqLogoGlyph, { size: 29 })),
          h2(
            "div",
            { className: "dim-botName" },
            h2("h3", null, account.bot.name),
            h2("p", null, account.bot.appIdMasked)
          )
        ),
        h2(
          "div",
          { className: "ddt-health dim-botHealth" },
          h2("span", { className: "ddt-dot dim-healthDot", "data-tone": tone }),
          h2("span", null, stateLabel)
        )
      ),
      h2(
        "dl",
        { className: "ddt-metrics dim-botMetrics" },
        h2("div", { className: "ddt-metric dim-botMetric" }, h2("dt", null, "\u6D88\u606F\u901A\u9053"), h2("dd", null, account.connected ? "WebSocket \u957F\u8FDE\u63A5" : "\u79BB\u7EBF")),
        h2("div", { className: "ddt-metric dim-botMetric" }, h2("dt", null, "\u6700\u8FD1\u68C0\u67E5"), h2("dd", null, checkedTime2(account.health.lastCheckedAt)))
      ),
      h2(WorkspaceEditor, {
        workspace: account.workspace,
        disabled: Boolean(busy),
        onSave: onWorkspaceSave
      }),
      h2(
        "div",
        { className: "ddt-accountFooter dim-cardFooter" },
        summary ? h2("div", { className: "ddt-summary dim-cardSummary" }, summary) : null,
        h2(
          "div",
          { className: "ddt-actions dim-cardActions" },
          h2(Button5, { className: "dim-cardAction", onClick: onReconnect, disabled: Boolean(busy) }, busy === "reconnect" ? "\u68C0\u67E5\u4E2D\u2026" : account.connected ? "\u68C0\u67E5\u8FDE\u63A5" : "\u91CD\u8BD5\u8FDE\u63A5"),
          h2(Button5, { className: "dim-cardAction", kind: "danger", onClick: onRequestRemove, disabled: Boolean(busy) }, "\u79FB\u9664\u63A5\u5165")
        )
      )
    ),
    removing ? h2(RemoveConfirmation3, {
      account,
      busy: busy === "delete",
      onConfirm: onConfirmRemove,
      onCancel: onCancelRemove
    }) : null
  );
}
function QqSettingsTab({ rpcCall }) {
  const [model, setModel] = React10.useState({ phase: "loading", bots: [], totals: { configured: 0, connected: 0 }, error: null });
  const [provision, setProvision] = React10.useState(null);
  const [busy, setBusy] = React10.useState(false);
  const [busyByBot, setBusyByBot] = React10.useState({});
  const [removeTarget, setRemoveTarget] = React10.useState(null);
  const [credentialOpen, setCredentialOpen] = React10.useState(false);
  const [credentialError, setCredentialError] = React10.useState(null);
  const [now, setNow] = React10.useState(Date.now());
  const mounted = React10.useRef(true);
  const workspaceFence = useWorkspaceSnapshotFence();
  const addButtonRef = React10.useRef(null);
  React10.useEffect(() => {
    const disposeDingtalk = installDingtalkStyles();
    const disposeQq = installQqStyles();
    mounted.current = true;
    return () => {
      mounted.current = false;
      disposeQq();
      disposeDingtalk();
    };
  }, []);
  const invoke = React10.useCallback(async (endpoint, payload = {}, signal) => {
    if (typeof rpcCall !== "function") throw new TypeError("QQ \u8BBE\u7F6E\u9875\u7F3A\u5C11 RPC \u8FDE\u63A5");
    return unwrapRpcResult3(await rpcCall(endpoint, payload, signal));
  }, [rpcCall]);
  const loadStatus = React10.useCallback(async ({ signal, silent = false, restore = false } = {}) => {
    const workspaceVersion = workspaceFence.beginStatus();
    if (workspaceVersion === null) return void 0;
    if (!silent && mounted.current) setModel((current) => ({ ...current, phase: "loading", error: null }));
    try {
      const snapshot = normalizeSnapshot2(await invoke(QQ_ENDPOINTS.status, {}, signal));
      if (!mounted.current || signal?.aborted || !workspaceFence.canCommitStatus(workspaceVersion)) return void 0;
      setModel({ phase: "ready", bots: snapshot.bots, totals: snapshot.totals, error: null });
      if (restore && snapshot.provisioning) setProvision({
        ...snapshot.provisioning,
        durationMs: Math.max(1, snapshot.provisioning.expiresAt - Date.now())
      });
      return snapshot;
    } catch (error) {
      if (error?.name !== "AbortError" && mounted.current && !signal?.aborted && workspaceFence.canCommitStatus(workspaceVersion)) {
        setModel((current) => ({ ...current, phase: silent ? current.phase : "error", error: presentError3(error) }));
      }
      return void 0;
    }
  }, [invoke, workspaceFence]);
  React10.useEffect(() => {
    const controller = new AbortController();
    void loadStatus({ signal: controller.signal, restore: true });
    return () => controller.abort();
  }, [loadStatus]);
  React10.useEffect(() => {
    if (model.phase !== "ready") return void 0;
    const controller = new AbortController();
    const timer = window.setInterval(() => void loadStatus({ signal: controller.signal, silent: true }), 15e3);
    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, [loadStatus, model.phase]);
  React10.useEffect(() => {
    if (!provision || !ACTIVE_STATES.has(provision.status)) return void 0;
    const timer = window.setInterval(() => mounted.current && setNow(Date.now()), 1e3);
    return () => window.clearInterval(timer);
  }, [provision?.attemptId, provision?.status]);
  const startProvisioning = React10.useCallback(async (replace = false) => {
    setCredentialOpen(false);
    setCredentialError(null);
    setBusy(true);
    try {
      if (replace && provision?.attemptId) await invoke(QQ_ENDPOINTS.cancelProvisioning, { attemptId: provision.attemptId });
      if (!mounted.current) return;
      setProvision({ status: "starting" });
      const started = normalizeProvisioning3(await invoke(QQ_ENDPOINTS.beginProvisioning, { locale: "zh-CN" }));
      if (!mounted.current) return;
      setNow(Date.now());
      setProvision({ ...started, durationMs: Math.max(1, started.expiresAt - Date.now()) });
    } catch (error) {
      if (mounted.current) setProvision({ status: "failed", error: presentError3(error) });
    } finally {
      if (mounted.current) setBusy(false);
    }
  }, [invoke, provision?.attemptId]);
  const bindCredentials = React10.useCallback(async ({ identity, secret }) => {
    const snapshotVersion = workspaceFence.beginMutation();
    setBusy(true);
    setCredentialError(null);
    try {
      const snapshot = normalizeSnapshot2(await invoke(
        QQ_ENDPOINTS.bindCredentials,
        { appId: identity, appSecret: secret }
      ));
      if (!mounted.current) return;
      if (workspaceFence.canCommitMutation(snapshotVersion)) {
        setModel({ phase: "ready", bots: snapshot.bots, totals: snapshot.totals, error: null });
      }
      setCredentialOpen(false);
    } catch (error) {
      if (mounted.current) setCredentialError(presentError3(error));
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mounted.current) void loadStatus({ silent: true });
      if (mounted.current) setBusy(false);
    }
  }, [invoke, loadStatus, workspaceFence]);
  const closeProvision = React10.useCallback(async () => {
    setBusy(true);
    try {
      if (provision?.attemptId && ACTIVE_STATES.has(provision.status)) {
        await invoke(QQ_ENDPOINTS.cancelProvisioning, { attemptId: provision.attemptId });
      }
      if (mounted.current) setProvision(null);
    } finally {
      if (mounted.current) setBusy(false);
    }
  }, [invoke, provision?.attemptId, provision?.status]);
  React10.useEffect(() => {
    const attemptId = provision?.attemptId;
    if (!attemptId || !ACTIVE_STATES.has(provision.status)) return void 0;
    const controller = new AbortController();
    let disposed = false;
    let timer;
    const poll = async () => {
      try {
        const current = normalizeProvisioning3(await invoke(QQ_ENDPOINTS.pollProvisioning, { attemptId }, controller.signal));
        if (disposed || controller.signal.aborted || !mounted.current) return;
        if (current.status === "connected") {
          setProvision(null);
          await loadStatus({ signal: controller.signal, silent: true });
          return;
        }
        setProvision((previous) => previous?.attemptId === attemptId ? { ...previous, ...current, durationMs: current.qrRevision !== previous.qrRevision ? Math.max(1, current.expiresAt - Date.now()) : previous.durationMs } : previous);
        if (ACTIVE_STATES.has(current.status)) timer = window.setTimeout(poll, current.pollIntervalMs);
      } catch (error) {
        if (!disposed && !controller.signal.aborted && mounted.current) {
          setProvision((current) => ({ ...current, status: "failed", error: presentError3(error) }));
        }
      }
    };
    timer = window.setTimeout(poll, provision.pollIntervalMs ?? 1e3);
    return () => {
      disposed = true;
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [invoke, loadStatus, provision?.attemptId, provision?.pollIntervalMs, provision?.status]);
  const botAction = React10.useCallback(async (account, operation, endpoint, payload) => {
    const snapshotVersion = workspaceFence.beginMutation();
    setBusyByBot((current) => ({ ...current, [account.botId]: operation }));
    try {
      const snapshot = normalizeSnapshot2(await invoke(endpoint, payload));
      if (mounted.current && workspaceFence.canCommitMutation(snapshotVersion)) {
        setModel({ phase: "ready", bots: snapshot.bots, totals: snapshot.totals, error: null });
      }
      return snapshot;
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mounted.current) void loadStatus({ silent: true });
      if (mounted.current) setBusyByBot((current) => {
        const next = { ...current };
        delete next[account.botId];
        return next;
      });
    }
  }, [invoke, loadStatus, workspaceFence]);
  let provisionView = null;
  if (provision?.status === "starting") provisionView = h2("div", { className: "ddt-card ddt-loading dim-surfaceCard" }, h2("div", { className: "ddt-spinner" }), "\u6B63\u5728\u7533\u8BF7 QQ \u4E8C\u7EF4\u7801\u2026");
  else if (["pending", "refreshing"].includes(provision?.status)) provisionView = h2(QrPanel2, {
    provision,
    now,
    busy,
    onRefresh: () => void startProvisioning(true),
    onCancel: () => void closeProvision()
  });
  else if (provision) provisionView = h2(ProvisionView, {
    provision,
    busy,
    onRetry: () => void startProvisioning(true),
    onClose: () => void closeProvision()
  });
  const botList = model.bots.length > 0 ? h2(
    "section",
    { className: "dim-listSection" },
    h2(
      "div",
      { className: "ddt-listHeading dim-listHeading" },
      h2("h3", null, "\u5DF2\u7ED1\u5B9A\u7684 QQ \u673A\u5668\u4EBA")
    ),
    h2("ul", { className: "ddt-list dim-botList" }, model.bots.map((account) => h2("li", { key: account.botId }, h2(AccountCard2, {
      account,
      busy: busyByBot[account.botId],
      removing: removeTarget === account.botId,
      onReconnect: () => void botAction(account, "reconnect", QQ_ENDPOINTS.reconnectBot, { botId: account.botId }),
      onWorkspaceSave: (workspace) => botAction(
        account,
        "workspace",
        QQ_ENDPOINTS.setWorkspace,
        { botId: account.botId, workspace }
      ),
      onRequestRemove: () => setRemoveTarget(account.botId),
      onCancelRemove: () => setRemoveTarget(null),
      onConfirmRemove: async () => {
        await botAction(account, "delete", QQ_ENDPOINTS.deleteBot, { botId: account.botId, confirm: true });
        if (mounted.current) setRemoveTarget(null);
      }
    }))))
  ) : null;
  const credentialView = credentialOpen ? h2(CredentialBindingPanel, {
    channel: "QQ",
    identityLabel: "AppID",
    identityPlaceholder: "\u586B\u5199 QQ \u5F00\u653E\u5E73\u53F0 AppID",
    secretLabel: "AppSecret",
    secretPlaceholder: "\u586B\u5199 QQ \u5F00\u653E\u5E73\u53F0 AppSecret",
    busy,
    error: credentialError,
    onSubmit: bindCredentials,
    onCancel: () => {
      setCredentialOpen(false);
      setCredentialError(null);
    }
  }) : null;
  return h2(
    "section",
    { className: "ddt-page dqq-page dim-channelPage", "aria-label": "QQ \u8BBE\u7F6E" },
    h2(Heading3, {
      totals: model.totals,
      adding: Boolean(provision),
      busy,
      onAdd: () => void startProvisioning(),
      onCredential: () => {
        setCredentialOpen((value) => !value);
        setCredentialError(null);
      },
      credentialOpen,
      addButtonRef
    }),
    model.phase === "loading" ? h2(LoadingView3) : model.phase === "error" ? h2("div", { className: "ddt-card dim-surfaceCard" }, h2("div", { className: "ddt-inlineError dim-inlineError" }, h2("h3", null, "\u65E0\u6CD5\u8BFB\u53D6 QQ \u673A\u5668\u4EBA\u72B6\u6001"), h2("p", null, model.error?.message), h2(Button5, { onClick: () => void loadStatus() }, "\u91CD\u65B0\u8BFB\u53D6"))) : h2(
      React10.Fragment,
      null,
      credentialView,
      provisionView,
      model.bots.length === 0 && !provision && !credentialOpen ? h2(EmptyView3, { busy, onStart: () => void startProvisioning() }) : null,
      botList
    )
  );
}

// plugin-src/client/channels/wecom/api.js
var WECOM_RPC_CHANNEL = "/wecom";
var WECOM_ENDPOINTS = Object.freeze({
  status: "connection.status",
  beginProvisioning: "provision.begin",
  pollProvisioning: "provision.poll",
  cancelProvisioning: "provision.cancel",
  bindCredentials: "bot.bind-credentials",
  reconnectBot: "bot.reconnect",
  deleteBot: "bot.delete",
  setWorkspace: "bot.workspace.set"
});
var PROVISION_STATES3 = /* @__PURE__ */ new Set(["starting", "pending", "refreshing", "connecting", "connected", "failed", "cancelled"]);
var ACCOUNT_STATES3 = /* @__PURE__ */ new Set(["connected", "connecting", "offline", "error"]);
var QR_DATA_URL3 = /^data:image\/(?:png|webp);base64,[a-z\d+/]+={0,2}$/i;
function isRecord4(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function text2(value, fallback, max = 240) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, max) : fallback;
}
function id2(value) {
  const result = text2(value, "", 128);
  return /^[a-z\d_-]+$/i.test(result) ? result : void 0;
}
function timestamp3(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = typeof value === "string" ? Date.parse(value) : Number.NaN;
  return Number.isNaN(parsed) ? void 0 : parsed;
}
function unwrapRpcResult4(result) {
  if (!isRecord4(result) || typeof result.ok !== "boolean") throw new Error("\u4F01\u4E1A\u5FAE\u4FE1\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u54CD\u5E94");
  if (!result.ok) {
    const error = new Error(text2(result.error?.message, "\u4F01\u4E1A\u5FAE\u4FE1\u64CD\u4F5C\u5931\u8D25"));
    error.code = text2(result.error?.code, "WECOM_RPC_ERROR", 80);
    throw error;
  }
  return result.value;
}
function safeQrSource4(value) {
  return typeof value === "string" && value.length <= 2 * 1024 * 1024 && QR_DATA_URL3.test(value) ? value : void 0;
}
function normalizeProvisioning4(value, now = Date.now()) {
  const source = isRecord4(value?.provisioning) ? value.provisioning : value;
  if (!isRecord4(source)) throw new Error("\u4F01\u4E1A\u5FAE\u4FE1\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u626B\u7801\u7ED1\u5B9A\u8FDB\u5EA6");
  const attemptId = id2(source.attemptId);
  if (!attemptId) throw new Error("\u4F01\u4E1A\u5FAE\u4FE1\u626B\u7801\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u7ED1\u5B9A\u4EFB\u52A1");
  const reported = text2(source.status, "failed", 32);
  const result = {
    attemptId,
    status: PROVISION_STATES3.has(reported) ? reported : "failed",
    expiresAt: timestamp3(source.expiresAt) ?? now + 5 * 6e4,
    pollIntervalMs: Math.min(1e4, Math.max(500, Number(source.pollIntervalMs) || 1e3)),
    qrRevision: Number.isSafeInteger(source.qrRevision) ? source.qrRevision : 0
  };
  const qrCodeDataUrl = safeQrSource4(source.qrCodeDataUrl);
  if (qrCodeDataUrl) result.qrCodeDataUrl = qrCodeDataUrl;
  if (id2(source.botId)) result.botId = id2(source.botId);
  if (isRecord4(source.error)) result.error = {
    code: text2(source.error.code, "WECOM_PROVISION_FAILED", 80),
    message: text2(source.error.message, "\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u6CA1\u6709\u63A5\u5165\u5B8C\u6210")
  };
  return result;
}
function normalizeBot4(value) {
  if (!isRecord4(value) || !id2(value.botId)) return void 0;
  const connected = value.connected === true;
  const state = ACCOUNT_STATES3.has(value.state) ? value.state : "offline";
  return {
    botId: id2(value.botId),
    connected,
    state: connected ? "connected" : state,
    workspace: text2(value.workspace, "", 4096),
    bot: {
      name: text2(value.bot?.name, "\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA", 100),
      appIdMasked: text2(value.bot?.appIdMasked, "\u5E94\u7528\u6807\u8BC6\u5DF2\u5B89\u5168\u4FDD\u5B58", 140)
    },
    health: {
      summary: text2(value.health?.summary, connected ? "\u4F01\u4E1A\u5FAE\u4FE1 WebSocket \u957F\u8FDE\u63A5\u8FD0\u884C\u6B63\u5E38" : "\u4F01\u4E1A\u5FAE\u4FE1\u8FDE\u63A5\u5C1A\u672A\u5C31\u7EEA"),
      lastCheckedAt: timestamp3(value.health?.lastCheckedAt)
    },
    error: isRecord4(value.error) ? {
      code: text2(value.error.code, "WECOM_ACCOUNT_ERROR", 80),
      message: text2(value.error.message, "\u4F01\u4E1A\u5FAE\u4FE1\u8FDE\u63A5\u5C1A\u672A\u5C31\u7EEA")
    } : null
  };
}
function normalizeSnapshot3(value) {
  const source = isRecord4(value?.snapshot) ? value.snapshot : value;
  if (!isRecord4(source) || !Array.isArray(source.bots)) throw new Error("\u4F01\u4E1A\u5FAE\u4FE1\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u673A\u5668\u4EBA\u5217\u8868");
  const bots = source.bots.map(normalizeBot4).filter(Boolean);
  return {
    revision: Number.isSafeInteger(source.revision) ? source.revision : 0,
    bots,
    totals: { configured: bots.length, connected: bots.filter((bot) => bot.connected).length },
    provisioning: source.provisioning ? normalizeProvisioning4(source.provisioning) : null
  };
}
function presentError4(error) {
  return {
    code: text2(error?.code, "WECOM_ERROR", 80),
    message: text2(error?.message, "\u4F01\u4E1A\u5FAE\u4FE1\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5")
  };
}
function formatRemaining4(milliseconds) {
  const seconds = Math.max(0, Math.ceil(Number(milliseconds) / 1e3) || 0);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

// plugin-src/client/channels/wecom/index.js
var React11 = __toESM(require("react"), 1);

// plugin-src/client/channels/wecom/styles.js
var WECOM_STYLE_ID = "stu-xie-dsh-message-wecom-settings";
var CSS4 = String.raw`
.dwecom-page { --ddt-accent: #3370ff; --ddt-accent-deep: #245bdb; --ddt-accent-wash: #eef4ff; }
.dwecom-avatar, .dwecom-brand { color: #3370ff; background: #fff; border: 1px solid var(--dsw-alias-border-l2, #e5e6eb); }
.dwecom-avatar svg, .dwecom-brand svg { display: block; }
`;
function installWecomStyles() {
  if (typeof document === "undefined") return () => {
  };
  const existing = document.querySelector(`style[data-plugin-css="${WECOM_STYLE_ID}"]`);
  if (existing) return () => {
  };
  const style = document.createElement("style");
  style.dataset.plugin = "@stu-xie/dsh-message";
  style.dataset.pluginCss = WECOM_STYLE_ID;
  style.textContent = CSS4;
  document.head.appendChild(style);
  return () => style.remove();
}

// plugin-src/client/channels/wecom/index.js
var ACTIVE_STATES2 = /* @__PURE__ */ new Set(["pending", "refreshing", "connecting"]);
var Button7 = React11.forwardRef(function Button8({ children, kind = "secondary", className = "", ...props }, ref) {
  return h2("button", {
    ...props,
    ref,
    type: "button",
    className: `ddt-button ${className}`.trim(),
    "data-kind": kind
  }, children);
});
function checkedTime3(value) {
  if (!value) return "\u5C1A\u672A\u68C0\u67E5";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(value));
  } catch {
    return "\u521A\u521A";
  }
}
function Heading4({ totals, adding, busy, onAdd, onCredential, credentialOpen, addButtonRef }) {
  return h2(
    "div",
    { className: "ddt-heading" },
    h2(
      "div",
      { className: "ddt-tools" },
      h2(
        "div",
        { className: "dim-bindActions" },
        h2(Button7, {
          kind: "primary",
          className: "dim-scanButton",
          onClick: onAdd,
          disabled: adding || busy,
          ref: addButtonRef,
          "aria-label": "\u626B\u7801\u63A5\u5165\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA"
        }, h2(QrActionIcon), adding ? "\u6B63\u5728\u63A5\u5165" : "\u626B\u7801\u63A5\u5165\u673A\u5668\u4EBA"),
        h2(Button7, {
          kind: "credential",
          className: "dim-credentialButton",
          onClick: onCredential,
          disabled: adding || busy,
          "aria-pressed": credentialOpen,
          "aria-label": "\u4F7F\u7528 Bot ID \u548C Secret \u7ED1\u5B9A\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA"
        }, h2(CredentialActionIcon), credentialOpen ? "\u6536\u8D77\u51ED\u636E" : "\u624B\u52A8\u63A5\u5165")
      ),
      totals.configured > 0 ? h2(
        "div",
        { className: "ddt-badge dim-onlineBadge" },
        h2("span", null, `${totals.connected} / ${totals.configured} \u5728\u7EBF`)
      ) : null
    )
  );
}
function LoadingView4() {
  return h2(
    "div",
    { className: "ddt-card ddt-loading dim-surfaceCard dim-loadingView", "aria-busy": "true" },
    h2("div", { className: "ddt-spinner dim-spinner" }),
    h2("span", null, "\u6B63\u5728\u8BFB\u53D6\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u72B6\u6001\u2026")
  );
}
function EmptyView4({ busy, onStart }) {
  return h2(
    "div",
    { className: "ddt-card dim-surfaceCard" },
    h2(
      "div",
      { className: "ddt-cardBody ddt-empty dim-surfaceBody dim-emptyView" },
      h2(
        "div",
        { className: "dim-emptyCopy" },
        h2(
          "div",
          { className: "ddt-stateLabel dim-stateLabel" },
          h2("span", { className: "ddt-dot dim-stateDot" }),
          h2("span", null, "\u5C1A\u672A\u7ED1\u5B9A\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA")
        ),
        h2("h3", null, "\u4F7F\u7528\u4F01\u4E1A\u5FAE\u4FE1 App \u626B\u7801\u521B\u5EFA\u667A\u80FD\u673A\u5668\u4EBA"),
        h2("p", null, "\u626B\u7801\u7531\u817E\u8BAF\u5B98\u65B9\u9875\u9762\u5B8C\u6210\uFF0C\u4E0D\u9700\u8981\u624B\u52A8\u586B\u5199 Bot ID \u6216 Secret\u3002\u521B\u5EFA\u6210\u529F\u540E\uFF0C\u673A\u5668\u4EBA\u4F1A\u81EA\u52A8\u8FDE\u63A5 DeepSeek Harness\u3002"),
        h2(
          "div",
          { className: "ddt-actions dim-viewActions" },
          h2(
            Button7,
            { kind: "primary", onClick: onStart, disabled: busy },
            busy ? "\u6B63\u5728\u751F\u6210\u4E8C\u7EF4\u7801\u2026" : "\u751F\u6210\u4F01\u4E1A\u5FAE\u4FE1\u4E8C\u7EF4\u7801"
          )
        )
      ),
      h2(
        "div",
        { className: "ddt-brandMark dim-emptyBrand dwecom-brand", "aria-hidden": "true" },
        h2(WecomLogoGlyph, { size: 64 })
      )
    )
  );
}
function QrPanel3({ provision, now, busy, onRefresh, onCancel }) {
  const source = safeQrSource4(provision.qrCodeDataUrl);
  const remaining = Math.max(0, provision.expiresAt - now);
  const duration = Math.max(1, provision.durationMs ?? 5 * 6e4);
  const progress = Math.round(Math.min(1, remaining / duration) * 100);
  const refreshing = provision.status === "refreshing";
  return h2(
    "div",
    { className: "ddt-card dim-surfaceCard" },
    h2(
      "div",
      { className: "ddt-cardBody ddt-qrLayout dim-surfaceBody dim-qrLayout" },
      h2(
        "div",
        { className: "ddt-qrColumn dim-qrColumn" },
        h2(
          "div",
          { className: "ddt-qrFrame dim-qrFrame" },
          source ? h2("img", { src: source, alt: "\u7528\u4E8E\u7ED1\u5B9A\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u7684\u4E00\u6B21\u6027\u4E8C\u7EF4\u7801" }) : h2(
            "div",
            { className: "ddt-qrFallback dim-qrFallback" },
            refreshing ? "\u4E8C\u7EF4\u7801\u6B63\u5728\u81EA\u52A8\u5237\u65B0\u2026" : "\u4E8C\u7EF4\u7801\u56FE\u7247\u6B63\u5728\u751F\u6210\u2026"
          )
        ),
        h2(
          "div",
          { className: "ddt-countdown dim-countdown" },
          h2(
            "div",
            { className: "ddt-countdownTop dim-countdownTop" },
            h2("span", null, "\u5F53\u524D\u4E8C\u7EF4\u7801\u6709\u6548\u65F6\u95F4"),
            h2("strong", null, refreshing ? "--:--" : formatRemaining4(remaining))
          ),
          h2("div", { className: "ddt-progress dim-progress", style: { "--ddt-progress": `${progress}%` } }, h2("span"))
        )
      ),
      h2(
        "div",
        { className: "ddt-qrCopy dim-qrCopy" },
        h2(
          "div",
          { className: "ddt-stateLabel dim-stateLabel" },
          h2("span", { className: "ddt-dot dim-stateDot", "data-tone": "warning" }),
          h2("span", null, refreshing ? "\u6B63\u5728\u5237\u65B0\u4E8C\u7EF4\u7801" : "\u7B49\u5F85\u4F01\u4E1A\u5FAE\u4FE1 App \u626B\u7801")
        ),
        h2("h3", null, "\u4F7F\u7528\u4F01\u4E1A\u5FAE\u4FE1 App \u5B8C\u6210\u667A\u80FD\u673A\u5668\u4EBA\u6388\u6743"),
        h2("p", null, "\u4F01\u4E1A\u5FAE\u4FE1\u5B98\u65B9\u9875\u9762\u4F1A\u521B\u5EFA\u4E00\u4E2A\u667A\u80FD\u673A\u5668\u4EBA\uFF0C\u5E76\u628A\u8FDE\u63A5\u51ED\u636E\u5B89\u5168\u4EA4\u7ED9\u672C\u673A Harness Host\u3002"),
        h2(
          "ol",
          { className: "ddt-steps dim-steps" },
          h2("li", null, "\u6253\u5F00\u4F01\u4E1A\u5FAE\u4FE1 App\uFF0C\u626B\u63CF\u5DE6\u4FA7\u4E8C\u7EF4\u7801"),
          h2("li", null, "\u5728\u817E\u8BAF\u6388\u6743\u9875\u9762\u786E\u8BA4\u521B\u5EFA\u667A\u80FD\u673A\u5668\u4EBA"),
          h2("li", null, "\u8FD4\u56DE\u8FD9\u91CC\u7B49\u5F85\u8FDE\u63A5\u5B8C\u6210")
        ),
        h2(
          "div",
          { className: "ddt-actions dim-viewActions" },
          h2(Button7, { onClick: onRefresh, disabled: busy }, "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801"),
          h2(Button7, { kind: "quiet", onClick: onCancel, disabled: busy }, "\u53D6\u6D88")
        )
      )
    )
  );
}
function ProvisionView2({ provision, busy, onRetry, onClose }) {
  if (provision.status === "connecting") {
    return h2(
      "div",
      { className: "ddt-card ddt-loading dim-surfaceCard dim-specialView", "aria-busy": "true" },
      h2("div", { className: "ddt-spinner dim-spinner" }),
      h2("h3", null, "\u4F01\u4E1A\u5FAE\u4FE1\u5DF2\u6388\u6743\uFF0C\u6B63\u5728\u8FDE\u63A5\u673A\u5668\u4EBA"),
      h2("p", null, "\u51ED\u636E\u6B63\u5728\u5199\u5165\u672C\u673A\uFF0C\u5E76\u542F\u52A8\u4F01\u4E1A\u5FAE\u4FE1 WebSocket \u6D88\u606F\u8FDE\u63A5\u3002")
    );
  }
  const error = provision.error ?? { code: "WECOM_PROVISION_FAILED", message: "\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u6CA1\u6709\u7ED1\u5B9A\u5B8C\u6210" };
  return h2(
    "div",
    { className: "ddt-card dim-surfaceCard" },
    h2(
      "div",
      { className: "ddt-inlineError dim-inlineError", role: "alert" },
      h2("h3", null, "\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u6CA1\u6709\u7ED1\u5B9A\u5B8C\u6210"),
      h2("p", null, error.message),
      h2("span", { className: "ddt-errorCode" }, error.code),
      h2(
        "div",
        { className: "ddt-actions dim-viewActions" },
        h2(Button7, { kind: "primary", onClick: onRetry, disabled: busy }, "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801"),
        h2(Button7, { onClick: onClose, disabled: busy }, "\u5173\u95ED")
      )
    )
  );
}
function RemoveConfirmation4({ account, busy, onConfirm, onCancel }) {
  return h2(
    "div",
    { className: "ddt-confirm dim-confirm", role: "alertdialog" },
    h2("strong", null, `\u4ECE DeepSeek Harness \u79FB\u9664\u201C${account.bot.name}\u201D\uFF1F`),
    h2("p", null, "\u8FD9\u4F1A\u505C\u6B62\u6D88\u606F\u8FDE\u63A5\uFF0C\u5E76\u5220\u9664\u672C\u673A\u4FDD\u5B58\u7684\u5E94\u7528\u51ED\u636E\u3001\u673A\u5668\u4EBA\u914D\u7F6E\u53CA\u4F1A\u8BDD\u6620\u5C04\u3002\u4F01\u4E1A\u5FAE\u4FE1\u5E73\u53F0\u4E2D\u7684\u673A\u5668\u4EBA\u4E0D\u4F1A\u88AB\u81EA\u52A8\u5220\u9664\u3002"),
    h2(
      "div",
      { className: "ddt-actions dim-viewActions" },
      h2(Button7, { onClick: onCancel, disabled: busy }, "\u4FDD\u7559\u673A\u5668\u4EBA"),
      h2(Button7, { kind: "danger", onClick: onConfirm, disabled: busy }, busy ? "\u6B63\u5728\u79FB\u9664\u2026" : "\u786E\u8BA4\u79FB\u9664\u63A5\u5165")
    )
  );
}
function AccountCard3({
  account,
  busy,
  removing,
  onReconnect,
  onWorkspaceSave,
  onRequestRemove,
  onConfirmRemove,
  onCancelRemove
}) {
  const tone = account.connected ? "success" : account.state === "error" ? "error" : "warning";
  const stateLabel = account.connected ? "\u8FD0\u884C\u6B63\u5E38" : account.state === "connecting" ? "\u6B63\u5728\u8FDE\u63A5" : "\u8FDE\u63A5\u672A\u5C31\u7EEA";
  const summary = account.error?.message ?? (account.connected ? null : account.health.summary);
  return h2(
    "article",
    { className: "ddt-card dim-botCard", "data-bot-id": account.botId },
    h2(
      "div",
      { className: "ddt-cardBody dim-botCardBody" },
      h2(
        "div",
        { className: "ddt-accountTop dim-botCardTop" },
        h2(
          "div",
          { className: "ddt-accountIdentity dim-botIdentity" },
          h2("div", { className: "ddt-avatar dim-botAvatar dwecom-avatar", "aria-hidden": "true" }, h2(WecomLogoGlyph, { size: 29 })),
          h2(
            "div",
            { className: "dim-botName" },
            h2("h3", null, account.bot.name),
            h2("p", null, account.bot.appIdMasked)
          )
        ),
        h2(
          "div",
          { className: "ddt-health dim-botHealth" },
          h2("span", { className: "ddt-dot dim-healthDot", "data-tone": tone }),
          h2("span", null, stateLabel)
        )
      ),
      h2(
        "dl",
        { className: "ddt-metrics dim-botMetrics" },
        h2("div", { className: "ddt-metric dim-botMetric" }, h2("dt", null, "\u6D88\u606F\u901A\u9053"), h2("dd", null, account.connected ? "WebSocket \u957F\u8FDE\u63A5" : "\u79BB\u7EBF")),
        h2("div", { className: "ddt-metric dim-botMetric" }, h2("dt", null, "\u6700\u8FD1\u68C0\u67E5"), h2("dd", null, checkedTime3(account.health.lastCheckedAt)))
      ),
      h2(WorkspaceEditor, {
        workspace: account.workspace,
        disabled: Boolean(busy),
        onSave: onWorkspaceSave
      }),
      h2(
        "div",
        { className: "ddt-accountFooter dim-cardFooter" },
        summary ? h2("div", { className: "ddt-summary dim-cardSummary" }, summary) : null,
        h2(
          "div",
          { className: "ddt-actions dim-cardActions" },
          h2(Button7, { className: "dim-cardAction", onClick: onReconnect, disabled: Boolean(busy) }, busy === "reconnect" ? "\u68C0\u67E5\u4E2D\u2026" : account.connected ? "\u68C0\u67E5\u8FDE\u63A5" : "\u91CD\u8BD5\u8FDE\u63A5"),
          h2(Button7, { className: "dim-cardAction", kind: "danger", onClick: onRequestRemove, disabled: Boolean(busy) }, "\u79FB\u9664\u63A5\u5165")
        )
      )
    ),
    removing ? h2(RemoveConfirmation4, {
      account,
      busy: busy === "delete",
      onConfirm: onConfirmRemove,
      onCancel: onCancelRemove
    }) : null
  );
}
function WecomSettingsTab({ rpcCall }) {
  const [model, setModel] = React11.useState({ phase: "loading", bots: [], totals: { configured: 0, connected: 0 }, error: null });
  const [provision, setProvision] = React11.useState(null);
  const [busy, setBusy] = React11.useState(false);
  const [busyByBot, setBusyByBot] = React11.useState({});
  const [removeTarget, setRemoveTarget] = React11.useState(null);
  const [credentialOpen, setCredentialOpen] = React11.useState(false);
  const [credentialError, setCredentialError] = React11.useState(null);
  const [now, setNow] = React11.useState(Date.now());
  const mounted = React11.useRef(true);
  const workspaceFence = useWorkspaceSnapshotFence();
  const addButtonRef = React11.useRef(null);
  React11.useEffect(() => {
    const disposeDingtalk = installDingtalkStyles();
    const disposeWecom = installWecomStyles();
    mounted.current = true;
    return () => {
      mounted.current = false;
      disposeWecom();
      disposeDingtalk();
    };
  }, []);
  const invoke = React11.useCallback(async (endpoint, payload = {}, signal) => {
    if (typeof rpcCall !== "function") throw new TypeError("\u4F01\u4E1A\u5FAE\u4FE1\u8BBE\u7F6E\u9875\u7F3A\u5C11 RPC \u8FDE\u63A5");
    return unwrapRpcResult4(await rpcCall(endpoint, payload, signal));
  }, [rpcCall]);
  const loadStatus = React11.useCallback(async ({ signal, silent = false, restore = false } = {}) => {
    const workspaceVersion = workspaceFence.beginStatus();
    if (workspaceVersion === null) return void 0;
    if (!silent && mounted.current) setModel((current) => ({ ...current, phase: "loading", error: null }));
    try {
      const snapshot = normalizeSnapshot3(await invoke(WECOM_ENDPOINTS.status, {}, signal));
      if (!mounted.current || signal?.aborted || !workspaceFence.canCommitStatus(workspaceVersion)) return void 0;
      setModel({ phase: "ready", bots: snapshot.bots, totals: snapshot.totals, error: null });
      if (restore && snapshot.provisioning) setProvision({
        ...snapshot.provisioning,
        durationMs: Math.max(1, snapshot.provisioning.expiresAt - Date.now())
      });
      return snapshot;
    } catch (error) {
      if (error?.name !== "AbortError" && mounted.current && !signal?.aborted && workspaceFence.canCommitStatus(workspaceVersion)) {
        setModel((current) => ({ ...current, phase: silent ? current.phase : "error", error: presentError4(error) }));
      }
      return void 0;
    }
  }, [invoke, workspaceFence]);
  React11.useEffect(() => {
    const controller = new AbortController();
    void loadStatus({ signal: controller.signal, restore: true });
    return () => controller.abort();
  }, [loadStatus]);
  React11.useEffect(() => {
    if (model.phase !== "ready") return void 0;
    const controller = new AbortController();
    const timer = window.setInterval(() => void loadStatus({ signal: controller.signal, silent: true }), 15e3);
    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, [loadStatus, model.phase]);
  React11.useEffect(() => {
    if (!provision || !ACTIVE_STATES2.has(provision.status)) return void 0;
    const timer = window.setInterval(() => mounted.current && setNow(Date.now()), 1e3);
    return () => window.clearInterval(timer);
  }, [provision?.attemptId, provision?.status]);
  const startProvisioning = React11.useCallback(async (replace = false) => {
    setCredentialOpen(false);
    setCredentialError(null);
    setBusy(true);
    try {
      if (replace && provision?.attemptId) await invoke(WECOM_ENDPOINTS.cancelProvisioning, { attemptId: provision.attemptId });
      if (!mounted.current) return;
      setProvision({ status: "starting" });
      const started = normalizeProvisioning4(await invoke(WECOM_ENDPOINTS.beginProvisioning, { locale: "zh-CN" }));
      if (!mounted.current) return;
      setNow(Date.now());
      setProvision({ ...started, durationMs: Math.max(1, started.expiresAt - Date.now()) });
    } catch (error) {
      if (mounted.current) setProvision({ status: "failed", error: presentError4(error) });
    } finally {
      if (mounted.current) setBusy(false);
    }
  }, [invoke, provision?.attemptId]);
  const bindCredentials = React11.useCallback(async ({ identity, secret }) => {
    const snapshotVersion = workspaceFence.beginMutation();
    setBusy(true);
    setCredentialError(null);
    try {
      const snapshot = normalizeSnapshot3(await invoke(
        WECOM_ENDPOINTS.bindCredentials,
        { botId: identity, secret }
      ));
      if (!mounted.current) return;
      if (workspaceFence.canCommitMutation(snapshotVersion)) {
        setModel({ phase: "ready", bots: snapshot.bots, totals: snapshot.totals, error: null });
      }
      setCredentialOpen(false);
    } catch (error) {
      if (mounted.current) setCredentialError(presentError4(error));
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mounted.current) void loadStatus({ silent: true });
      if (mounted.current) setBusy(false);
    }
  }, [invoke, loadStatus, workspaceFence]);
  const closeProvision = React11.useCallback(async () => {
    setBusy(true);
    try {
      if (provision?.attemptId && ACTIVE_STATES2.has(provision.status)) {
        await invoke(WECOM_ENDPOINTS.cancelProvisioning, { attemptId: provision.attemptId });
      }
      if (mounted.current) setProvision(null);
    } finally {
      if (mounted.current) setBusy(false);
    }
  }, [invoke, provision?.attemptId, provision?.status]);
  React11.useEffect(() => {
    const attemptId = provision?.attemptId;
    if (!attemptId || !ACTIVE_STATES2.has(provision.status)) return void 0;
    const controller = new AbortController();
    let disposed = false;
    let timer;
    const poll = async () => {
      try {
        const current = normalizeProvisioning4(await invoke(WECOM_ENDPOINTS.pollProvisioning, { attemptId }, controller.signal));
        if (disposed || controller.signal.aborted || !mounted.current) return;
        if (current.status === "connected") {
          setProvision(null);
          await loadStatus({ signal: controller.signal, silent: true });
          return;
        }
        setProvision((previous) => previous?.attemptId === attemptId ? { ...previous, ...current, durationMs: current.qrRevision !== previous.qrRevision ? Math.max(1, current.expiresAt - Date.now()) : previous.durationMs } : previous);
        if (ACTIVE_STATES2.has(current.status)) timer = window.setTimeout(poll, current.pollIntervalMs);
      } catch (error) {
        if (!disposed && !controller.signal.aborted && mounted.current) {
          setProvision((current) => ({ ...current, status: "failed", error: presentError4(error) }));
        }
      }
    };
    timer = window.setTimeout(poll, provision.pollIntervalMs ?? 1e3);
    return () => {
      disposed = true;
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [invoke, loadStatus, provision?.attemptId, provision?.pollIntervalMs, provision?.status]);
  const botAction = React11.useCallback(async (account, operation, endpoint, payload) => {
    const snapshotVersion = workspaceFence.beginMutation();
    setBusyByBot((current) => ({ ...current, [account.botId]: operation }));
    try {
      const snapshot = normalizeSnapshot3(await invoke(endpoint, payload));
      if (mounted.current && workspaceFence.canCommitMutation(snapshotVersion)) {
        setModel({ phase: "ready", bots: snapshot.bots, totals: snapshot.totals, error: null });
      }
      return snapshot;
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mounted.current) void loadStatus({ silent: true });
      if (mounted.current) setBusyByBot((current) => {
        const next = { ...current };
        delete next[account.botId];
        return next;
      });
    }
  }, [invoke, loadStatus, workspaceFence]);
  let provisionView = null;
  if (provision?.status === "starting") provisionView = h2("div", { className: "ddt-card ddt-loading dim-surfaceCard" }, h2("div", { className: "ddt-spinner" }), "\u6B63\u5728\u7533\u8BF7\u4F01\u4E1A\u5FAE\u4FE1\u4E8C\u7EF4\u7801\u2026");
  else if (["pending", "refreshing"].includes(provision?.status)) provisionView = h2(QrPanel3, {
    provision,
    now,
    busy,
    onRefresh: () => void startProvisioning(true),
    onCancel: () => void closeProvision()
  });
  else if (provision) provisionView = h2(ProvisionView2, {
    provision,
    busy,
    onRetry: () => void startProvisioning(true),
    onClose: () => void closeProvision()
  });
  const botList = model.bots.length > 0 ? h2(
    "section",
    { className: "dim-listSection" },
    h2(
      "div",
      { className: "ddt-listHeading dim-listHeading" },
      h2("h3", null, "\u5DF2\u7ED1\u5B9A\u7684\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA")
    ),
    h2("ul", { className: "ddt-list dim-botList" }, model.bots.map((account) => h2("li", { key: account.botId }, h2(AccountCard3, {
      account,
      busy: busyByBot[account.botId],
      removing: removeTarget === account.botId,
      onReconnect: () => void botAction(account, "reconnect", WECOM_ENDPOINTS.reconnectBot, { botId: account.botId }),
      onWorkspaceSave: (workspace) => botAction(
        account,
        "workspace",
        WECOM_ENDPOINTS.setWorkspace,
        { botId: account.botId, workspace }
      ),
      onRequestRemove: () => setRemoveTarget(account.botId),
      onCancelRemove: () => setRemoveTarget(null),
      onConfirmRemove: async () => {
        await botAction(account, "delete", WECOM_ENDPOINTS.deleteBot, { botId: account.botId, confirm: true });
        if (mounted.current) setRemoveTarget(null);
      }
    }))))
  ) : null;
  const credentialView = credentialOpen ? h2(CredentialBindingPanel, {
    channel: "\u4F01\u4E1A\u5FAE\u4FE1",
    identityLabel: "Bot ID",
    identityPlaceholder: "\u586B\u5199\u4F01\u4E1A\u5FAE\u4FE1\u667A\u80FD\u673A\u5668\u4EBA Bot ID",
    secretLabel: "Secret",
    secretPlaceholder: "\u586B\u5199\u4F01\u4E1A\u5FAE\u4FE1\u667A\u80FD\u673A\u5668\u4EBA Secret",
    busy,
    error: credentialError,
    onSubmit: bindCredentials,
    onCancel: () => {
      setCredentialOpen(false);
      setCredentialError(null);
    }
  }) : null;
  return h2(
    "section",
    { className: "ddt-page dwecom-page dim-channelPage", "aria-label": "\u4F01\u4E1A\u5FAE\u4FE1\u8BBE\u7F6E" },
    h2(Heading4, {
      totals: model.totals,
      adding: Boolean(provision),
      busy,
      onAdd: () => void startProvisioning(),
      onCredential: () => {
        setCredentialOpen((value) => !value);
        setCredentialError(null);
      },
      credentialOpen,
      addButtonRef
    }),
    model.phase === "loading" ? h2(LoadingView4) : model.phase === "error" ? h2("div", { className: "ddt-card dim-surfaceCard" }, h2("div", { className: "ddt-inlineError dim-inlineError" }, h2("h3", null, "\u65E0\u6CD5\u8BFB\u53D6\u4F01\u4E1A\u5FAE\u4FE1\u673A\u5668\u4EBA\u72B6\u6001"), h2("p", null, model.error?.message), h2(Button7, { onClick: () => void loadStatus() }, "\u91CD\u65B0\u8BFB\u53D6"))) : h2(
      React11.Fragment,
      null,
      credentialView,
      provisionView,
      model.bots.length === 0 && !provision && !credentialOpen ? h2(EmptyView4, { busy, onStart: () => void startProvisioning() }) : null,
      botList
    )
  );
}

// plugin-src/client/channels/weixin/index.js
var React12 = __toESM(require("react"), 1);

// plugin-src/client/channels/weixin/api.js
var WEIXIN_RPC_CHANNEL = "/weixin";
var WEIXIN_ENDPOINTS = Object.freeze({
  status: "connection.status",
  beginProvisioning: "provision.begin",
  pollProvisioning: "provision.poll",
  submitVerification: "provision.verify",
  cancelProvisioning: "provision.cancel",
  reconnectBot: "bot.reconnect",
  deleteBot: "bot.delete",
  setWorkspace: "bot.workspace.set"
});
var ACCOUNT_STATES4 = /* @__PURE__ */ new Set(["connected", "connecting", "offline", "error"]);
var PROVISION_STATES4 = /* @__PURE__ */ new Set([
  "starting",
  "pending",
  "scanned",
  "needs_verification",
  "connecting",
  "connected",
  "expired",
  "failed",
  "cancelled"
]);
function isRecord5(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function string(value, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}
function timestamp4(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function unwrapRpcResult5(result) {
  if (!isRecord5(result) || typeof result.ok !== "boolean") {
    throw new Error("\u5FAE\u4FE1\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u54CD\u5E94");
  }
  if (!result.ok) {
    const error = new Error(string(result.error?.message, "\u5FAE\u4FE1\u64CD\u4F5C\u5931\u8D25"));
    error.code = string(result.error?.code, "WEIXIN_RPC_ERROR");
    throw error;
  }
  return result.value;
}
function safeQrSource5(value) {
  return typeof value === "string" && /^data:image\/(?:png|webp|svg\+xml)(?:;charset=[^;,]+)?;base64,/i.test(value) ? value : void 0;
}
function safeVerificationUrl(value) {
  if (typeof value !== "string") return void 0;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return url.protocol === "https:" && (host === "weixin.qq.com" || host.endsWith(".weixin.qq.com")) ? url.toString() : void 0;
  } catch {
    return void 0;
  }
}
function normalizeProvisioning5(value) {
  if (!isRecord5(value) || !string(value.attemptId)) {
    throw new Error("\u5FAE\u4FE1\u626B\u7801\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u7ED1\u5B9A\u4EFB\u52A1");
  }
  const status = PROVISION_STATES4.has(value.status) ? value.status : "failed";
  const result = {
    attemptId: string(value.attemptId),
    status,
    expiresAt: timestamp4(value.expiresAt) ?? Date.now(),
    pollIntervalMs: Math.min(5e3, Math.max(500, Number(value.pollIntervalMs) || 1e3)),
    verificationRequired: value.verificationRequired === true || status === "needs_verification"
  };
  const verificationUrl = safeVerificationUrl(value.verificationUrl);
  const qrCodeDataUrl = safeQrSource5(value.qrCodeDataUrl);
  if (verificationUrl) result.verificationUrl = verificationUrl;
  if (qrCodeDataUrl) result.qrCodeDataUrl = qrCodeDataUrl;
  if (string(value.botId)) result.botId = string(value.botId);
  if (value.alreadyConnected === true) result.alreadyConnected = true;
  if (isRecord5(value.error)) {
    result.error = {
      code: string(value.error.code, "WEIXIN_PROVISION_FAILED"),
      message: string(value.error.message, "\u5FAE\u4FE1\u7ED1\u5B9A\u6CA1\u6709\u5B8C\u6210")
    };
  }
  return result;
}
function normalizeBot5(value) {
  if (!isRecord5(value) || !string(value.botId) || !isRecord5(value.bot)) return null;
  const state = ACCOUNT_STATES4.has(value.state) ? value.state : "error";
  const connected = value.connected === true;
  return {
    botId: string(value.botId),
    state: connected ? "connected" : state,
    connected,
    configured: value.configured === true,
    workspace: string(value.workspace).slice(0, 4096),
    bot: {
      name: string(value.bot.name, "\u5FAE\u4FE1\u673A\u5668\u4EBA"),
      accountIdMasked: string(value.bot.accountIdMasked, "\u5DF2\u5B89\u5168\u4FDD\u5B58")
    },
    health: {
      status: string(value.health?.status, connected ? "healthy" : "offline"),
      summary: string(value.health?.summary, connected ? "\u5FAE\u4FE1\u8FDE\u63A5\u6B63\u5E38" : "\u5FAE\u4FE1\u8FDE\u63A5\u672A\u5C31\u7EEA"),
      lastCheckedAt: timestamp4(value.health?.lastCheckedAt)
    },
    stats: {
      messagesReceived: Math.max(0, Number(value.stats?.messagesReceived) || 0),
      messagesReplied: Math.max(0, Number(value.stats?.messagesReplied) || 0)
    },
    error: isRecord5(value.error) ? {
      code: string(value.error.code, "WEIXIN_ACCOUNT_ERROR"),
      message: string(value.error.message, "\u5FAE\u4FE1\u8FDE\u63A5\u672A\u5C31\u7EEA")
    } : null
  };
}
function normalizeSnapshot4(value) {
  if (!isRecord5(value) || !Array.isArray(value.bots)) {
    throw new Error("\u5FAE\u4FE1\u670D\u52A1\u6CA1\u6709\u8FD4\u56DE\u6709\u6548\u7684\u8D26\u53F7\u5217\u8868");
  }
  const bots = value.bots.map(normalizeBot5).filter(Boolean);
  return {
    schemaVersion: Number(value.schemaVersion) || 1,
    revision: Number(value.revision) || 0,
    state: string(value.state, "offline"),
    bots,
    totals: {
      configured: bots.length,
      connected: bots.filter((bot) => bot.connected).length
    },
    provisioning: value.provisioning ? normalizeProvisioning5(value.provisioning) : null
  };
}
function presentError5(error) {
  return {
    code: string(error?.code, "WEIXIN_ERROR"),
    message: string(error?.message, "\u5FAE\u4FE1\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5")
  };
}
function formatRemaining5(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1e3));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

// plugin-src/client/channels/weixin/styles.js
var WEIXIN_STYLE_ID = "stu-xie-dsh-message-weixin-settings";
var CSS5 = String.raw`
.dxw-page {
  --dxw-accent: #07c160;
  --dxw-accent-dark: #05994c;
  --dxw-success: var(--dsw-alias-state-success-primary, #20a162);
  --dxw-warning: var(--dsw-alias-state-warn-primary, #d97706);
  --dxw-error: var(--dsw-alias-state-error-primary, #d54941);
  width: 100%;
  max-width: 880px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 2px 0 28px;
  color: var(--dsw-alias-label-primary, #1f2329);
  box-sizing: border-box;
}
.dxw-page *, .dxw-page *::before, .dxw-page *::after { box-sizing: border-box; }
.dxw-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; }
.dxw-heading h2, .dxw-heading p, .dxw-card h3, .dxw-card p { margin: 0; }
.dxw-eyebrow { color: var(--dsw-alias-label-tertiary, #8f959e); font-size: 12px; font-weight: 650; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 3px; }
.dxw-heading h2 { font-size: 20px; line-height: 28px; font-weight: 680; }
.dxw-heading p { color: var(--dsw-alias-label-secondary, #646a73); font-size: 13px; line-height: 20px; margin-top: 5px; white-space: nowrap; }
.dxw-tools, .dxw-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
.dxw-tools { width: 100%; justify-content: space-between; flex-wrap: nowrap; }
.dxw-badge { display: inline-flex; align-items: center; gap: 7px; min-height: 30px; padding: 0 11px; border-radius: 999px; color: var(--dsw-alias-label-secondary, #646a73); background: var(--dsw-alias-bg-module-platform, #f2f3f5); font-size: 12px; white-space: nowrap; }
.dxw-dot { width: 8px; height: 8px; border-radius: 50%; background: #aeb3bb; flex: none; }
.dxw-dot[data-tone="success"] { background: var(--dxw-success); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dxw-success) 14%, transparent); }
.dxw-dot[data-tone="warning"] { background: var(--dxw-warning); }
.dxw-dot[data-tone="error"] { background: var(--dxw-error); }
.dxw-button { min-height: 34px; border: 1px solid var(--dsw-alias-border-l2, #dfe1e5); border-radius: 8px; padding: 0 13px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; color: var(--dsw-alias-label-primary, #1f2329); background: var(--dsw-alias-bg-layer-1, #fff); font: inherit; font-size: 13px; font-weight: 560; cursor: pointer; text-decoration: none; transition: border-color .15s ease, background .15s ease, transform .15s ease; }
.dxw-button:hover:not(:disabled) { border-color: #aeb3bb; background: var(--dsw-alias-interactive-bg-hover, #f7f8fa); }
.dxw-button:active:not(:disabled) { transform: translateY(1px); }
.dxw-button:focus-visible, .dxw-input:focus-visible { outline: 2px solid color-mix(in srgb, var(--dxw-accent) 70%, white); outline-offset: 2px; }
.dxw-button:disabled { cursor: not-allowed; opacity: .55; }
.dxw-button[data-kind="primary"] { color: white; border-color: var(--dxw-accent); background: var(--dxw-accent); }
.dxw-button[data-kind="primary"]:hover:not(:disabled) { border-color: var(--dxw-accent-dark); background: var(--dxw-accent-dark); }
.dxw-button[data-kind="danger"] { color: var(--dxw-error); }
.dxw-card { overflow: hidden; border: 1px solid var(--dsw-alias-border-l2, #e5e6eb); border-radius: 14px; background: var(--dsw-alias-bg-layer-1, #fff); box-shadow: 0 1px 2px rgb(31 35 41 / 3%); }
.dxw-cardBody { padding: 24px; }
.dxw-empty { min-height: 230px; display: grid; grid-template-columns: minmax(0, 1fr) 180px; align-items: center; gap: 30px; }
.dxw-empty h3 { font-size: 18px; margin-bottom: 8px; }
.dxw-empty p { max-width: 560px; color: var(--dsw-alias-label-secondary, #646a73); line-height: 1.65; }
.dxw-empty .dxw-actions { margin-top: 20px; }
.dxw-logo { width: 110px; height: 110px; display: grid; place-items: center; justify-self: center; border-radius: 28px; color: white; background: var(--dxw-accent); box-shadow: 0 18px 45px rgb(7 193 96 / 22%); }
.dxw-logo svg { width: 62px; height: 62px; }
.dxw-qrLayout { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 34px; align-items: center; }
.dxw-qrColumn { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.dxw-qrFrame { position: relative; width: 270px; aspect-ratio: 1; display: grid; place-items: center; overflow: hidden; padding: 10px; border: 1px solid var(--dsw-alias-border-l2, #e5e6eb); border-radius: 16px; background: white; }
.dxw-qrFrame img { display: block; width: 100%; height: 100%; object-fit: contain; }
.dxw-qrFallback { padding: 24px; text-align: center; color: #646a73; }
.dxw-expired { position: absolute; inset: 0; display: grid; place-items: center; padding: 30px; color: white; text-align: center; font-weight: 650; background: rgb(31 35 41 / 76%); backdrop-filter: blur(3px); }
.dxw-countdown { width: 270px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; }
.dxw-countdown div { display: flex; justify-content: space-between; margin-bottom: 6px; }
.dxw-progress { height: 4px; overflow: hidden; border-radius: 99px; background: #eef0f3; }
.dxw-progress span { display: block; width: var(--dxw-progress); height: 100%; background: var(--dxw-accent); transition: width .2s linear; }
.dxw-qrCopy h3 { margin: 9px 0 8px; font-size: 18px; }
.dxw-qrCopy > p { color: var(--dsw-alias-label-secondary, #646a73); line-height: 1.65; }
.dxw-steps { margin: 18px 0 22px; padding-left: 22px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 13px; line-height: 1.9; }
.dxw-stateLabel { display: inline-flex; align-items: center; gap: 8px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; font-weight: 600; }
.dxw-verify { max-width: 560px; margin: 0 auto; padding: 32px; text-align: center; }
.dxw-verify h3 { margin: 8px 0; font-size: 19px; }
.dxw-verify p { color: var(--dsw-alias-label-secondary, #646a73); line-height: 1.6; }
.dxw-codeRow { display: flex; justify-content: center; gap: 10px; margin: 24px 0 10px; }
.dxw-input { width: 190px; height: 42px; padding: 0 14px; border: 1px solid var(--dsw-alias-border-l2, #dfe1e5); border-radius: 9px; background: var(--dsw-alias-bg-layer-1, white); color: inherit; font: inherit; font-size: 18px; letter-spacing: .16em; text-align: center; }
.dxw-statusNotice, .dxw-error { display: flex; align-items: center; gap: 10px; padding: 13px 15px; border: 1px solid color-mix(in srgb, var(--dxw-error) 28%, transparent); border-radius: 10px; color: var(--dxw-error); background: color-mix(in srgb, var(--dxw-error) 7%, transparent); font-size: 13px; }
.dxw-error { align-items: flex-start; flex-direction: column; padding: 22px; }
.dxw-error h3 { font-size: 17px; }
.dxw-errorCode { font-family: ui-monospace, SFMono-Regular, monospace; font-size: 11px; opacity: .8; }
.dxw-listHeading { display: flex; justify-content: space-between; align-items: center; margin: 2px 0 9px; }
.dxw-listHeading h3 { margin: 0; font-size: 14px; }
.dxw-list { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.dxw-accountTop { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.dxw-accountIdentity { display: flex; align-items: center; gap: 12px; min-width: 0; }
.dxw-avatar { width: 42px; height: 42px; display: grid; place-items: center; flex: none; border-radius: 12px; color: white; background: var(--dxw-accent); }
.dxw-accountIdentity h3 { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 15px; }
.dxw-accountIdentity p { color: var(--dsw-alias-label-secondary, #646a73); font: 12px ui-monospace, SFMono-Regular, monospace; margin-top: 4px; }
.dxw-health { display: inline-flex; align-items: center; gap: 7px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; white-space: nowrap; }
.dxw-metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 20px 0; }
.dxw-metric { padding: 12px 14px; border-radius: 9px; background: var(--dsw-alias-interactive-bg-hover, #f7f8fa); }
.dxw-metric dt { color: var(--dsw-alias-label-tertiary, #8f959e); font-size: 11px; }
.dxw-metric dd { overflow: hidden; margin: 5px 0 0; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.dxw-accountFooter { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding-top: 16px; border-top: 1px solid var(--dsw-alias-border-l1, #eef0f3); }
.dxw-accountFooter .dxw-actions { flex: none; flex-wrap: nowrap; gap: 8px; margin-top: 0; }
.dxw-accountFooter .dxw-button { flex: none; white-space: nowrap; }
.dxw-summary { color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; }
.dxw-confirm { padding: 18px 24px; border-top: 1px solid color-mix(in srgb, var(--dxw-error) 25%, transparent); background: color-mix(in srgb, var(--dxw-error) 5%, transparent); }
.dxw-confirm strong { display: block; font-size: 14px; margin-bottom: 6px; }
.dxw-confirm p { color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; line-height: 1.55; }
.dxw-confirm .dxw-actions { margin-top: 13px; }
.dxw-loading { padding: 36px; color: var(--dsw-alias-label-secondary, #646a73); text-align: center; }
.dxw-spinner { width: 24px; height: 24px; margin: 0 auto 12px; border: 3px solid #e6e8eb; border-top-color: var(--dxw-accent); border-radius: 50%; animation: dxw-spin .8s linear infinite; }
.dxw-visuallyHidden { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes dxw-spin { to { transform: rotate(360deg); } }
@media (max-width: 720px) {
  .dxw-heading, .dxw-accountTop { flex-direction: column; align-items: stretch; }
  .dxw-empty { grid-template-columns: minmax(0, 1fr); }
  .dxw-logo { display: none; }
  .dxw-qrLayout { grid-template-columns: minmax(0, 1fr); justify-items: center; }
  .dxw-qrCopy { width: 100%; }
  .dxw-metrics { grid-template-columns: minmax(0, 1fr); }
  .dxw-cardBody { padding: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .dxw-page *, .dxw-page *::before, .dxw-page *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`;
function installWeixinStyles() {
  if (typeof document === "undefined") return () => {
  };
  const existing = document.querySelector(`style[data-plugin-css="${WEIXIN_STYLE_ID}"]`);
  if (existing) return () => {
  };
  const style = document.createElement("style");
  style.dataset.plugin = "@stu-xie/dsh-message";
  style.dataset.pluginCss = WEIXIN_STYLE_ID;
  style.textContent = CSS5;
  document.head.appendChild(style);
  return () => style.remove();
}

// plugin-src/client/channels/weixin/index.js
var Button9 = React12.forwardRef(function Button10({ children, kind = "secondary", className = "", ...props }, ref) {
  return h2("button", {
    ...props,
    ref,
    type: "button",
    className: `dxw-button ${className}`.trim(),
    "data-kind": kind
  }, children);
});
function Heading5({ totals, adding, busy, onAdd, addButtonRef }) {
  return h2(
    "div",
    { className: "dxw-heading" },
    h2(
      "div",
      { className: "dxw-tools" },
      h2(Button9, {
        kind: "primary",
        className: "dim-scanButton",
        onClick: onAdd,
        disabled: adding || busy,
        ref: addButtonRef,
        "aria-label": "\u626B\u7801\u63A5\u5165\u5FAE\u4FE1\u673A\u5668\u4EBA"
      }, h2(QrActionIcon), adding ? "\u6B63\u5728\u63A5\u5165" : "\u626B\u7801\u63A5\u5165\u673A\u5668\u4EBA"),
      totals.configured > 0 ? h2(
        "div",
        { className: "dxw-badge dim-onlineBadge" },
        h2("span", null, `${totals.connected} / ${totals.configured} \u5728\u7EBF`)
      ) : null
    )
  );
}
function LoadingView5() {
  return h2(
    "div",
    { className: "dxw-card dxw-loading dim-surfaceCard dim-loadingView", "aria-busy": "true" },
    h2("div", { className: "dxw-spinner dim-spinner" }),
    h2("span", null, "\u6B63\u5728\u8BFB\u53D6\u5FAE\u4FE1\u8FDE\u63A5\u72B6\u6001\u2026")
  );
}
function EmptyView5({ onStart, busy }) {
  return h2(
    "div",
    { className: "dxw-card dim-surfaceCard" },
    h2(
      "div",
      { className: "dxw-cardBody dxw-empty dim-surfaceBody dim-emptyView" },
      h2(
        "div",
        { className: "dim-emptyCopy" },
        h2(
          "div",
          { className: "dxw-stateLabel dim-stateLabel" },
          h2("span", { className: "dxw-dot dim-stateDot" }),
          h2("span", null, "\u5C1A\u672A\u7ED1\u5B9A\u5FAE\u4FE1")
        ),
        h2("h3", null, "\u626B\u4E00\u6B21\u7801\uFF0C\u5C31\u80FD\u5728\u5FAE\u4FE1\u91CC\u4F7F\u7528 Harness"),
        h2("p", null, "\u4E8C\u7EF4\u7801\u7531\u817E\u8BAF\u5FAE\u4FE1 iLink \u670D\u52A1\u7B7E\u53D1\u3002\u7528\u624B\u673A\u5FAE\u4FE1\u626B\u63CF\u5E76\u786E\u8BA4\u540E\uFF0C\u8D26\u53F7\u51ED\u636E\u4F1A\u76F4\u63A5\u5199\u5165 Harness Host\uFF0C\u6D4F\u89C8\u5668\u4E0D\u4F1A\u6536\u5230 bot_token\u3002"),
        h2(
          "div",
          { className: "dxw-actions dim-viewActions" },
          h2(
            Button9,
            { kind: "primary", onClick: onStart, disabled: busy },
            busy ? "\u6B63\u5728\u751F\u6210\u4E8C\u7EF4\u7801\u2026" : "\u751F\u6210\u5FAE\u4FE1\u4E8C\u7EF4\u7801"
          )
        )
      ),
      h2("div", { className: "dxw-logo dim-emptyBrand", "aria-hidden": "true" }, h2(WeixinLogoGlyph, { size: 64 }))
    )
  );
}
function QrPanel4({ provision, now, busy, onRefresh, onCancel }) {
  const [imageFailed, setImageFailed] = React12.useState(false);
  const source = safeQrSource5(provision.qrCodeDataUrl);
  const href = safeVerificationUrl(provision.verificationUrl);
  const remaining = Math.max(0, provision.expiresAt - now);
  const expired = remaining === 0 || provision.status === "expired";
  const duration = Math.max(1, provision.durationMs ?? 5 * 6e4);
  const progress = Math.round(Math.min(1, remaining / duration) * 100);
  React12.useEffect(() => setImageFailed(false), [source]);
  return h2(
    "div",
    { className: "dxw-card dim-surfaceCard" },
    h2(
      "div",
      { className: "dxw-cardBody dxw-qrLayout dim-surfaceBody dim-qrLayout" },
      h2(
        "div",
        { className: "dxw-qrColumn dim-qrColumn" },
        h2(
          "div",
          { className: "dxw-qrFrame dim-qrFrame" },
          source && !imageFailed ? h2("img", {
            src: source,
            alt: "\u7528\u4E8E\u628A\u5FAE\u4FE1\u673A\u5668\u4EBA\u7ED1\u5B9A\u5230 DeepSeek Harness \u7684\u4E00\u6B21\u6027\u4E8C\u7EF4\u7801",
            onError: () => setImageFailed(true)
          }) : h2("div", { className: "dxw-qrFallback dim-qrFallback" }, "\u4E8C\u7EF4\u7801\u56FE\u7247\u672A\u5C31\u7EEA\uFF0C\u8BF7\u4F7F\u7528\u5907\u7528\u94FE\u63A5\u3002"),
          expired ? h2("div", { className: "dxw-expired dim-qrExpired" }, "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F\n\u8BF7\u91CD\u65B0\u751F\u6210") : null
        ),
        h2(
          "div",
          { className: "dxw-countdown dim-countdown" },
          h2("div", { className: "dim-countdownTop" }, h2("span", null, "\u4E8C\u7EF4\u7801\u6709\u6548\u65F6\u95F4"), h2("strong", null, formatRemaining5(remaining))),
          h2(
            "div",
            { className: "dxw-progress dim-progress", "aria-hidden": "true" },
            h2("span", { style: { "--dxw-progress": `${progress}%` } })
          )
        )
      ),
      h2(
        "div",
        { className: "dxw-qrCopy dim-qrCopy" },
        h2(
          "div",
          { className: "dxw-stateLabel dim-stateLabel" },
          h2("span", { className: "dxw-dot dim-stateDot", "data-tone": provision.status === "scanned" ? "success" : "warning" }),
          h2("span", null, provision.status === "scanned" ? "\u5DF2\u626B\u7801\uFF0C\u8BF7\u5728\u624B\u673A\u4E0A\u786E\u8BA4" : "\u7B49\u5F85\u5FAE\u4FE1\u626B\u7801")
        ),
        h2("h3", null, expired ? "\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548" : "\u4F7F\u7528\u624B\u673A\u5FAE\u4FE1\u626B\u63CF\u4E8C\u7EF4\u7801"),
        h2("p", null, "\u8BF7\u5728\u624B\u673A\u4E0A\u6838\u5BF9\u5E76\u786E\u8BA4\u6388\u6743\u3002\u90E8\u5206\u8D26\u53F7\u4F1A\u989D\u5916\u663E\u793A\u4E00\u4E2A\u914D\u5BF9\u6570\u5B57\uFF0C\u9875\u9762\u4F1A\u5728\u9700\u8981\u65F6\u63D0\u793A\u8F93\u5165\u3002"),
        h2(
          "ol",
          { className: "dxw-steps dim-steps" },
          h2("li", null, "\u6253\u5F00\u624B\u673A\u5FAE\u4FE1\u5E76\u626B\u63CF\u5DE6\u4FA7\u4E8C\u7EF4\u7801"),
          h2("li", null, "\u5728\u5FAE\u4FE1\u4E2D\u786E\u8BA4\u8FDE\u63A5\u8BE5\u673A\u5668\u4EBA"),
          h2("li", null, "\u4FDD\u6301\u672C\u9875\u6253\u5F00\uFF0C\u7B49\u5F85\u6D88\u606F\u957F\u8F6E\u8BE2\u53D8\u4E3A\u5728\u7EBF")
        ),
        h2(
          "div",
          { className: "dxw-actions dim-viewActions" },
          expired ? h2(Button9, { kind: "primary", onClick: onRefresh, disabled: busy }, "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801") : null,
          href ? h2("a", {
            className: "dxw-button",
            href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "\u6253\u5F00\u5907\u7528\u94FE\u63A5") : null,
          !expired ? h2(Button9, { onClick: onRefresh, disabled: busy }, "\u6362\u4E00\u4E2A\u4E8C\u7EF4\u7801") : null,
          h2(Button9, { onClick: onCancel, disabled: busy }, "\u53D6\u6D88")
        )
      )
    )
  );
}
function VerificationPanel({ provision, busy, onSubmit, onCancel }) {
  const [code, setCode] = React12.useState("");
  const valid = /^\d{4,8}$/.test(code);
  React12.useEffect(() => setCode(""), [provision.attemptId]);
  return h2(
    "div",
    { className: "dxw-card dim-surfaceCard" },
    h2(
      "form",
      {
        className: "dxw-verify dim-specialView",
        onSubmit: (event) => {
          event.preventDefault();
          if (valid && !busy) onSubmit(code);
        }
      },
      h2(
        "div",
        { className: "dxw-stateLabel" },
        h2("span", { className: "dxw-dot", "data-tone": "warning" }),
        h2("span", null, "\u9700\u8981\u914D\u5BF9\u7801")
      ),
      h2("h3", null, "\u8F93\u5165\u624B\u673A\u5FAE\u4FE1\u663E\u793A\u7684\u6570\u5B57"),
      h2("p", null, "\u8FD9\u662F\u5FAE\u4FE1\u9644\u52A0\u7684\u5B89\u5168\u786E\u8BA4\u6B65\u9AA4\u3002\u914D\u5BF9\u7801\u53EA\u7528\u4E8E\u672C\u6B21\u626B\u7801\u8F6E\u8BE2\uFF0C\u4E0D\u4F1A\u5199\u5165\u914D\u7F6E\u6216\u65E5\u5FD7\u3002"),
      h2(
        "div",
        { className: "dxw-codeRow" },
        h2("input", {
          className: "dxw-input",
          value: code,
          inputMode: "numeric",
          autoComplete: "one-time-code",
          maxLength: 8,
          "aria-label": "\u5FAE\u4FE1\u914D\u5BF9\u7801",
          onChange: (event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 8)),
          autoFocus: true
        }),
        h2("button", {
          type: "submit",
          className: "dxw-button",
          "data-kind": "primary",
          disabled: !valid || busy
        }, busy ? "\u6B63\u5728\u9A8C\u8BC1\u2026" : "\u7EE7\u7EED\u8FDE\u63A5")
      ),
      h2(Button9, { onClick: onCancel, disabled: busy }, "\u53D6\u6D88\u7ED1\u5B9A")
    )
  );
}
function ProgressPanel2({ scanned, onCancel, busy }) {
  return h2(
    "div",
    { className: "dxw-card dxw-loading dim-surfaceCard dim-loadingView", "aria-busy": "true" },
    h2("div", { className: "dxw-spinner dim-spinner" }),
    h2("h3", null, scanned ? "\u5FAE\u4FE1\u5DF2\u786E\u8BA4\uFF0C\u6B63\u5728\u542F\u52A8\u6D88\u606F\u8FDE\u63A5" : "\u6B63\u5728\u51C6\u5907\u5FAE\u4FE1\u4E8C\u7EF4\u7801"),
    h2("p", null, scanned ? "\u6B63\u5728\u4FDD\u5B58\u51ED\u636E\u5E76\u9A8C\u8BC1 Harness \u4E0E\u5FAE\u4FE1\u957F\u8F6E\u8BE2\u3002" : "\u6B63\u5728\u8054\u7CFB\u817E\u8BAF\u5FAE\u4FE1 iLink \u670D\u52A1\u3002"),
    onCancel ? h2(
      "div",
      { className: "dxw-actions dim-viewActions", style: { justifyContent: "center", marginTop: 14 } },
      h2(Button9, { onClick: onCancel, disabled: busy }, "\u53D6\u6D88")
    ) : null
  );
}
function ProvisionError3({ provision, busy, onRetry, onClose }) {
  const error = provision.error ?? { code: "WEIXIN_PROVISION_FAILED", message: "\u5FAE\u4FE1\u7ED1\u5B9A\u6CA1\u6709\u5B8C\u6210" };
  return h2(
    "div",
    { className: "dxw-card dim-surfaceCard" },
    h2(
      "div",
      { className: "dxw-error dim-inlineError", role: "alert" },
      h2("h3", null, provision.status === "expired" ? "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F" : "\u5FAE\u4FE1\u6CA1\u6709\u7ED1\u5B9A\u5B8C\u6210"),
      h2("p", null, error.message),
      h2("span", { className: "dxw-errorCode" }, error.code),
      h2(
        "div",
        { className: "dxw-actions dim-viewActions" },
        h2(Button9, { kind: "primary", onClick: onRetry, disabled: busy }, "\u91CD\u65B0\u751F\u6210\u4E8C\u7EF4\u7801"),
        h2(Button9, { onClick: onClose, disabled: busy }, "\u5173\u95ED")
      )
    )
  );
}
function checkedTime4(timestamp5) {
  if (!timestamp5) return "\u5C1A\u672A\u68C0\u67E5";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(timestamp5));
  } catch {
    return "\u521A\u521A";
  }
}
function AccountCard4({
  account,
  busy,
  removing,
  onReconnect,
  onWorkspaceSave,
  onRequestRemove,
  onConfirmRemove,
  onCancelRemove
}) {
  const state = busy === "reconnect" ? "connecting" : account.state;
  const tone = account.connected ? "success" : state === "error" ? "error" : "warning";
  const summary = account.error?.message ?? (account.connected ? null : account.health.summary);
  return h2(
    "article",
    { className: "dxw-card dim-botCard", tabIndex: -1, "data-bot-id": account.botId },
    h2(
      "div",
      { className: "dxw-cardBody dim-botCardBody" },
      h2(
        "div",
        { className: "dxw-accountTop dim-botCardTop" },
        h2(
          "div",
          { className: "dxw-accountIdentity dim-botIdentity" },
          h2("div", { className: "dxw-avatar dim-botAvatar", "aria-hidden": "true" }, h2(WeixinLogoGlyph, { size: 27 })),
          h2("div", { className: "dim-botName" }, h2("h3", null, account.bot.name), h2("p", null, account.bot.accountIdMasked))
        ),
        h2(
          "div",
          { className: "dxw-health dim-botHealth" },
          h2("span", { className: "dxw-dot dim-healthDot", "data-tone": tone }),
          h2("span", null, account.connected ? "\u8FD0\u884C\u6B63\u5E38" : state === "connecting" ? "\u6B63\u5728\u8FDE\u63A5" : "\u8FDE\u63A5\u672A\u5C31\u7EEA")
        )
      ),
      h2(
        "dl",
        { className: "dxw-metrics dim-botMetrics" },
        h2(
          "div",
          { className: "dxw-metric dim-botMetric" },
          h2("dt", null, "\u6D88\u606F\u901A\u9053"),
          h2("dd", null, account.connected ? "iLink \u957F\u8F6E\u8BE2" : "\u79BB\u7EBF")
        ),
        h2(
          "div",
          { className: "dxw-metric dim-botMetric" },
          h2("dt", null, "\u6700\u8FD1\u68C0\u67E5"),
          h2("dd", null, checkedTime4(account.health.lastCheckedAt))
        )
      ),
      h2(WorkspaceEditor, {
        workspace: account.workspace,
        disabled: Boolean(busy),
        onSave: onWorkspaceSave
      }),
      h2(
        "div",
        { className: "dxw-accountFooter dim-cardFooter" },
        summary ? h2("div", { className: "dxw-summary dim-cardSummary" }, summary) : null,
        h2(
          "div",
          { className: "dxw-actions dim-cardActions" },
          h2(
            Button9,
            { className: "dim-cardAction", onClick: onReconnect, disabled: Boolean(busy) },
            busy === "reconnect" ? "\u68C0\u67E5\u4E2D\u2026" : account.connected ? "\u68C0\u67E5\u8FDE\u63A5" : "\u91CD\u8BD5\u8FDE\u63A5"
          ),
          h2(Button9, { className: "dim-cardAction", kind: "danger", onClick: onRequestRemove, disabled: Boolean(busy) }, "\u79FB\u9664\u63A5\u5165")
        )
      )
    ),
    removing ? h2(
      "div",
      { className: "dxw-confirm dim-confirm", role: "alertdialog" },
      h2("strong", null, "\u4ECE\u6B64 Harness \u79FB\u9664\u8FD9\u4E2A\u5FAE\u4FE1\u8D26\u53F7\uFF1F"),
      h2("p", null, "\u8FD9\u4F1A\u505C\u6B62\u6D88\u606F\u8FDE\u63A5\uFF0C\u5E76\u5220\u9664\u672C\u673A\u4FDD\u5B58\u7684 bot_token\u3001\u8D26\u53F7\u914D\u7F6E\u548C\u4F1A\u8BDD\u6620\u5C04\u3002\u5176\u4ED6\u5FAE\u4FE1\u8D26\u53F7\u4E0D\u53D7\u5F71\u54CD\u3002"),
      h2(
        "div",
        { className: "dxw-actions dim-viewActions" },
        h2(Button9, { onClick: onCancelRemove, disabled: busy === "delete" }, "\u4FDD\u7559\u8D26\u53F7"),
        h2(
          Button9,
          { kind: "danger", onClick: onConfirmRemove, disabled: busy === "delete" },
          busy === "delete" ? "\u6B63\u5728\u79FB\u9664\u2026" : "\u786E\u8BA4\u79FB\u9664"
        )
      )
    ) : null
  );
}
function AccountList2(props) {
  return h2(
    "section",
    { className: "dim-listSection" },
    h2("div", { className: "dxw-listHeading dim-listHeading" }, h2("h3", null, "\u5DF2\u63A5\u5165\u7684\u5FAE\u4FE1\u8D26\u53F7")),
    h2("ul", { className: "dxw-list dim-botList" }, props.bots.map((account) => h2(
      "li",
      { key: account.botId },
      h2(AccountCard4, {
        account,
        busy: props.busyByBot[account.botId],
        removing: props.removeTarget === account.botId,
        onReconnect: () => props.onReconnect(account),
        onWorkspaceSave: (workspace) => props.onWorkspaceSave(account, workspace),
        onRequestRemove: () => props.onRequestRemove(account),
        onConfirmRemove: () => props.onConfirmRemove(account),
        onCancelRemove: props.onCancelRemove
      })
    )))
  );
}
var EMPTY_TOTALS3 = Object.freeze({ configured: 0, connected: 0 });
function mergeWeixinProvisioningSnapshot(current, incoming, { restoreProvisioning = false } = {}) {
  if (!incoming || !current && !restoreProvisioning) return current;
  if (current && current.attemptId !== incoming.attemptId) return current;
  return {
    ...current,
    ...incoming,
    durationMs: current?.durationMs ?? 5 * 6e4
  };
}
function WeixinSettingsTab({ rpcCall }) {
  const [model, setModel] = React12.useState({
    phase: "loading",
    bots: [],
    totals: EMPTY_TOTALS3,
    revision: 0,
    error: null
  });
  const [provision, setProvision] = React12.useState(null);
  const [busy, setBusy] = React12.useState(false);
  const [busyByBot, setBusyByBot] = React12.useState({});
  const [removeTarget, setRemoveTarget] = React12.useState(null);
  const [notice, setNotice] = React12.useState("");
  const [now, setNow] = React12.useState(() => Date.now());
  const addButtonRef = React12.useRef(null);
  const mountedRef = React12.useRef(true);
  const workspaceFence = useWorkspaceSnapshotFence();
  const scheduleAnimationFrame = useAnimationFrameScheduler();
  React12.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const announce = React12.useCallback((value) => {
    setNotice("");
    scheduleAnimationFrame(() => {
      if (value) setNotice(value);
    }, "announcement");
  }, [scheduleAnimationFrame]);
  const invoke = React12.useCallback(async (endpoint, payload = {}, signal) => {
    return unwrapRpcResult5(await rpcCall(endpoint, payload, signal));
  }, [rpcCall]);
  const loadStatus = React12.useCallback(async ({
    signal,
    silent = false,
    restoreProvisioning = false
  } = {}) => {
    const workspaceVersion = workspaceFence.beginStatus();
    if (workspaceVersion === null || !mountedRef.current) return void 0;
    if (!silent) setModel((current) => ({ ...current, phase: "loading", error: null }));
    try {
      const snapshot = normalizeSnapshot4(await invoke(WEIXIN_ENDPOINTS.status, {}, signal));
      if (signal?.aborted || !mountedRef.current || !workspaceFence.canCommitStatus(workspaceVersion)) return void 0;
      setModel({
        phase: "ready",
        bots: snapshot.bots,
        totals: snapshot.totals,
        revision: snapshot.revision,
        error: null
      });
      if (snapshot.provisioning) {
        setProvision((current) => mergeWeixinProvisioningSnapshot(
          current,
          snapshot.provisioning,
          { restoreProvisioning }
        ));
      }
      return snapshot;
    } catch (error) {
      if (signal?.aborted || error?.name === "AbortError" || !mountedRef.current || !workspaceFence.canCommitStatus(workspaceVersion)) return void 0;
      setModel((current) => ({
        ...current,
        phase: silent && current.phase === "ready" ? "ready" : "error",
        error: presentError5(error)
      }));
      return void 0;
    }
  }, [invoke, workspaceFence]);
  React12.useEffect(() => {
    const controller = new AbortController();
    void loadStatus({ signal: controller.signal, restoreProvisioning: true });
    return () => controller.abort();
  }, [loadStatus]);
  React12.useEffect(() => {
    if (model.phase !== "ready") return void 0;
    const controller = new AbortController();
    let running = false;
    const timer = window.setInterval(async () => {
      if (running) return;
      running = true;
      await loadStatus({
        signal: controller.signal,
        silent: true,
        restoreProvisioning: false
      });
      running = false;
    }, 15e3);
    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, [loadStatus, model.phase]);
  React12.useEffect(() => {
    if (!provision || !["pending", "scanned"].includes(provision.status)) return void 0;
    const timer = window.setInterval(() => setNow(Date.now()), 1e3);
    return () => window.clearInterval(timer);
  }, [provision?.attemptId, provision?.status]);
  const startProvisioning = React12.useCallback(async ({ replace = false } = {}) => {
    setBusy(true);
    try {
      if (replace && provision?.attemptId) {
        await invoke(WEIXIN_ENDPOINTS.cancelProvisioning, { attemptId: provision.attemptId });
      }
      setProvision({ status: "starting" });
      const started = normalizeProvisioning5(await invoke(WEIXIN_ENDPOINTS.beginProvisioning, { locale: "zh-CN" }));
      setNow(Date.now());
      setProvision({ ...started, durationMs: Math.max(1, started.expiresAt - Date.now()) });
      announce("\u5FAE\u4FE1\u4E8C\u7EF4\u7801\u5DF2\u751F\u6210\uFF0C\u8BF7\u4F7F\u7528\u624B\u673A\u5FAE\u4FE1\u626B\u63CF\u3002");
    } catch (error) {
      setProvision({
        status: "failed",
        error: presentError5(error),
        ...provision?.attemptId ? { attemptId: provision.attemptId } : {}
      });
    } finally {
      setBusy(false);
    }
  }, [announce, invoke, provision?.attemptId]);
  const cancelProvisioning = React12.useCallback(async () => {
    setBusy(true);
    try {
      if (provision?.attemptId && !["failed", "expired", "cancelled"].includes(provision.status)) {
        await invoke(WEIXIN_ENDPOINTS.cancelProvisioning, { attemptId: provision.attemptId });
      }
      setProvision(null);
      announce("\u5DF2\u53D6\u6D88\u5FAE\u4FE1\u7ED1\u5B9A\u3002");
      scheduleAnimationFrame(() => addButtonRef.current?.focus(), "focus");
    } catch (error) {
      setProvision((current) => ({ ...current, status: "failed", error: presentError5(error) }));
    } finally {
      setBusy(false);
    }
  }, [announce, invoke, provision?.attemptId, provision?.status, scheduleAnimationFrame]);
  const submitVerification = React12.useCallback(async (verifyCode) => {
    if (!provision?.attemptId) return;
    setBusy(true);
    try {
      const next = normalizeProvisioning5(await invoke(WEIXIN_ENDPOINTS.submitVerification, {
        attemptId: provision.attemptId,
        verifyCode
      }));
      setProvision((current) => ({ ...current, ...next }));
      announce("\u914D\u5BF9\u7801\u5DF2\u63D0\u4EA4\uFF0C\u6B63\u5728\u7B49\u5F85\u5FAE\u4FE1\u786E\u8BA4\u3002");
    } catch (error) {
      setProvision((current) => ({ ...current, status: "failed", error: presentError5(error) }));
    } finally {
      setBusy(false);
    }
  }, [announce, invoke, provision?.attemptId]);
  React12.useEffect(() => {
    const attemptId = provision?.attemptId;
    if (!attemptId || !["pending", "scanned", "connecting"].includes(provision.status)) return void 0;
    const controller = new AbortController();
    const scheduler = createPollScheduler({
      setTimeoutFn: (callback, delayMs) => window.setTimeout(callback, delayMs),
      clearTimeoutFn: (timer) => window.clearTimeout(timer)
    });
    const poll = async () => {
      try {
        const result = normalizeProvisioning5(await invoke(
          WEIXIN_ENDPOINTS.pollProvisioning,
          { attemptId },
          controller.signal
        ));
        if (scheduler.disposed) return;
        if (result.status === "connected") {
          const snapshot = await loadStatus({
            signal: controller.signal,
            silent: true,
            restoreProvisioning: false
          });
          if (scheduler.disposed) return;
          const account = snapshot?.bots.find((bot) => bot.botId === result.botId);
          if (!account?.connected) {
            setProvision((current) => current?.attemptId === attemptId ? { ...current, ...result, status: "connecting" } : current);
            scheduler.schedule(poll, result.pollIntervalMs);
            return;
          }
          setProvision(null);
          announce(result.alreadyConnected ? "\u8FD9\u4E2A\u5FAE\u4FE1\u8D26\u53F7\u5DF2\u7ECF\u7ED1\u5B9A\u5E76\u4FDD\u6301\u5728\u7EBF\u3002" : "\u5FAE\u4FE1\u5DF2\u7ED1\u5B9A\uFF0C\u53EF\u4EE5\u5F00\u59CB\u5411\u5DF2\u7ED1\u5B9A\u7684\u673A\u5668\u4EBA\u53D1\u6D88\u606F\u3002");
          return;
        }
        setProvision((current) => current?.attemptId === attemptId ? { ...current, ...result, durationMs: current.durationMs } : current);
        if (["pending", "scanned", "connecting"].includes(result.status)) {
          scheduler.schedule(poll, result.pollIntervalMs);
        }
      } catch (error) {
        if (scheduler.disposed || error?.name === "AbortError") return;
        setProvision((current) => current?.attemptId === attemptId ? { ...current, status: "failed", error: presentError5(error) } : current);
      }
    };
    scheduler.schedule(poll, provision.pollIntervalMs ?? 1e3);
    return () => {
      scheduler.dispose();
      controller.abort();
    };
  }, [announce, invoke, loadStatus, provision?.attemptId, provision?.status, provision?.pollIntervalMs]);
  const setBotBusy = React12.useCallback((botId, value) => {
    setBusyByBot((current) => {
      const next = { ...current };
      if (value) next[botId] = value;
      else delete next[botId];
      return next;
    });
  }, []);
  const reconnect = React12.useCallback(async (account) => {
    const snapshotVersion = workspaceFence.beginMutation();
    setBotBusy(account.botId, "reconnect");
    try {
      const snapshot = normalizeSnapshot4(await invoke(WEIXIN_ENDPOINTS.reconnectBot, { botId: account.botId }));
      if (mountedRef.current && workspaceFence.canCommitMutation(snapshotVersion)) {
        setModel((current) => ({ ...current, bots: snapshot.bots, totals: snapshot.totals, revision: snapshot.revision }));
      }
      const refreshed = snapshot.bots.find((bot) => bot.botId === account.botId);
      announce(refreshed?.connected ? "\u5FAE\u4FE1\u8FDE\u63A5\u68C0\u67E5\u5B8C\u6210\u3002" : "\u5FAE\u4FE1\u4ECD\u672A\u8FDE\u63A5\uFF0C\u63D2\u4EF6\u4F1A\u7EE7\u7EED\u81EA\u52A8\u91CD\u8BD5\u3002");
    } catch (error) {
      announce(`\u8FDE\u63A5\u68C0\u67E5\u5931\u8D25\uFF1A${presentError5(error).message}`);
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mountedRef.current) void loadStatus({ silent: true });
      setBotBusy(account.botId, null);
    }
  }, [announce, invoke, loadStatus, setBotBusy, workspaceFence]);
  const saveWorkspace = React12.useCallback(async (account, workspace) => {
    const workspaceVersion = workspaceFence.beginMutation();
    setBotBusy(account.botId, "workspace");
    try {
      const snapshot = normalizeSnapshot4(await invoke(
        WEIXIN_ENDPOINTS.setWorkspace,
        { botId: account.botId, workspace }
      ));
      if (mountedRef.current && workspaceFence.canCommitMutation(workspaceVersion)) {
        setModel({
          phase: "ready",
          bots: snapshot.bots,
          totals: snapshot.totals,
          revision: snapshot.revision,
          error: null
        });
      }
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mountedRef.current) void loadStatus({ silent: true });
      if (mountedRef.current) setBotBusy(account.botId, null);
    }
  }, [invoke, loadStatus, setBotBusy, workspaceFence]);
  const remove = React12.useCallback(async (account) => {
    const snapshotVersion = workspaceFence.beginMutation();
    setBotBusy(account.botId, "delete");
    try {
      const snapshot = normalizeSnapshot4(await invoke(WEIXIN_ENDPOINTS.deleteBot, {
        botId: account.botId,
        confirm: true
      }));
      if (mountedRef.current && workspaceFence.canCommitMutation(snapshotVersion)) {
        setModel((current) => ({ ...current, bots: snapshot.bots, totals: snapshot.totals, revision: snapshot.revision }));
      }
      setRemoveTarget(null);
      announce("\u5FAE\u4FE1\u8D26\u53F7\u53CA\u672C\u673A\u51ED\u636E\u5DF2\u79FB\u9664\u3002");
    } catch (error) {
      announce(`\u79FB\u9664\u5931\u8D25\uFF1A${presentError5(error).message}`);
    } finally {
      const shouldRefresh = workspaceFence.endMutation();
      if (shouldRefresh && mountedRef.current) void loadStatus({ silent: true });
      setBotBusy(account.botId, null);
    }
  }, [announce, invoke, loadStatus, setBotBusy, workspaceFence]);
  let provisionView = null;
  if (provision?.status === "starting") {
    provisionView = h2(ProgressPanel2, { busy });
  } else if (["pending", "scanned"].includes(provision?.status)) {
    provisionView = h2(QrPanel4, {
      provision,
      now,
      busy,
      onRefresh: () => void startProvisioning({ replace: true }),
      onCancel: () => void cancelProvisioning()
    });
  } else if (provision?.status === "needs_verification") {
    provisionView = h2(VerificationPanel, {
      provision,
      busy,
      onSubmit: (code) => void submitVerification(code),
      onCancel: () => void cancelProvisioning()
    });
  } else if (provision?.status === "connecting") {
    provisionView = h2(ProgressPanel2, {
      scanned: true,
      busy,
      onCancel: () => void cancelProvisioning()
    });
  } else if (provision && ["failed", "expired", "cancelled"].includes(provision.status)) {
    provisionView = h2(ProvisionError3, {
      provision,
      busy,
      onRetry: () => void startProvisioning({ replace: Boolean(provision.attemptId) }),
      onClose: () => void cancelProvisioning()
    });
  }
  return h2(
    "section",
    { className: "dxw-page dim-channelPage", "aria-label": "\u5FAE\u4FE1\u8BBE\u7F6E" },
    h2(Heading5, {
      totals: model.totals,
      adding: Boolean(provision),
      busy,
      onAdd: () => void startProvisioning(),
      addButtonRef
    }),
    h2("div", { className: "dxw-visuallyHidden", role: "status", "aria-live": "polite" }, notice),
    model.error && model.phase === "ready" ? h2("div", { className: "dxw-statusNotice dim-statusNotice" }, `\u72B6\u6001\u5237\u65B0\u5931\u8D25\uFF1A${model.error.message}`) : null,
    model.phase === "loading" ? h2(LoadingView5) : model.phase === "error" ? h2(
      "div",
      { className: "dxw-card dim-surfaceCard" },
      h2(
        "div",
        { className: "dxw-error dim-inlineError" },
        h2("h3", null, "\u65E0\u6CD5\u8BFB\u53D6\u5FAE\u4FE1\u72B6\u6001"),
        h2("p", null, model.error?.message ?? "\u8BF7\u7A0D\u540E\u91CD\u8BD5"),
        h2(Button9, { onClick: () => void loadStatus() }, "\u91CD\u65B0\u8BFB\u53D6")
      )
    ) : h2(
      React12.Fragment,
      null,
      provisionView,
      model.bots.length === 0 && !provision ? h2(EmptyView5, { onStart: () => void startProvisioning(), busy }) : null,
      model.bots.length > 0 ? h2(AccountList2, {
        bots: model.bots,
        busyByBot,
        removeTarget,
        onReconnect: (account) => void reconnect(account),
        onWorkspaceSave: saveWorkspace,
        onRequestRemove: (account) => setRemoveTarget(account.botId),
        onConfirmRemove: (account) => void remove(account),
        onCancelRemove: () => setRemoveTarget(null)
      }) : null
    )
  );
}

// plugin-src/client/agent-settings.js
var React13 = __toESM(require("react"), 1);
var ENDPOINTS = {
  status: "agent.status",
  updateSettings: "agent.settings.update",
  savePrompt: "agent.prompt.save",
  resetPrompt: "agent.prompt.reset"
};
function valueOf(result) {
  if (result?.ok === false) throw new Error(result.error?.message ?? "\u64CD\u4F5C\u5931\u8D25");
  return result?.ok === true ? result.value : result;
}
function AgentSettingsTab({ rpcCall }) {
  const [model, setModel] = React13.useState({ loading: true, data: null, error: null });
  const [selected, setSelected] = React13.useState("system-prompt.md");
  const [content, setContent] = React13.useState("");
  const [busy, setBusy] = React13.useState(false);
  const load = React13.useCallback(async () => {
    try {
      const data = valueOf(await rpcCall(ENDPOINTS.status, {}));
      setModel({ loading: false, data, error: null });
      const prompt = data.prompts?.find((item) => item.name === selected);
      setContent(prompt?.content ?? "");
    } catch (error) {
      setModel({ loading: false, data: null, error });
    }
  }, [rpcCall, selected]);
  React13.useEffect(() => {
    void load();
  }, [load]);
  const choose = (name2) => {
    setSelected(name2);
    setContent(model.data?.prompts?.find((item) => item.name === name2)?.content ?? "");
  };
  const invoke = async (endpoint, payload) => {
    setBusy(true);
    try {
      const data = valueOf(await rpcCall(endpoint, payload));
      if (data?.prompts) setModel({ loading: false, data, error: null });
      else await load();
    } catch (error) {
      setModel((current) => ({ ...current, error }));
    } finally {
      setBusy(false);
    }
  };
  if (model.loading) return h2("p", null, "\u6B63\u5728\u8BFB\u53D6\u52A9\u624B\u8BBE\u7F6E\u2026");
  if (!model.data) return h2(
    "div",
    { className: "dxw-error" },
    h2("h3", null, "\u65E0\u6CD5\u8BFB\u53D6\u52A9\u624B\u8BBE\u7F6E"),
    h2("p", null, model.error?.message ?? "\u8BF7\u7A0D\u540E\u91CD\u8BD5"),
    h2("button", { type: "button", onClick: () => void load() }, "\u91CD\u8BD5")
  );
  const settings = model.data.settings;
  return h2(
    "section",
    { className: "dim-agentSettings" },
    h2(
      "div",
      { className: "dxw-heading" },
      h2(
        "div",
        null,
        h2("h2", null, "\u52A9\u624B\u8BBE\u7F6E"),
        h2("p", null, "\u63D0\u793A\u8BCD\u3001\u957F\u671F\u8BB0\u5FC6\u548C\u4F1A\u8BDD\u7B56\u7565\u7531\u4E94\u4E2A\u6E20\u9053\u5171\u4EAB\u3002")
      )
    ),
    h2(
      "div",
      { className: "dim-card" },
      h2("h3", null, "\u4F1A\u8BDD\u4E0E\u8BB0\u5FC6"),
      [["enabled", "\u542F\u7528\u52A9\u624B\u589E\u5F3A"], ["dailySessions", "\u6BCF\u5929\u81EA\u52A8\u5F00\u59CB\u65B0\u4F1A\u8BDD"], ["memoryEnabled", "\u542F\u7528\u957F\u671F\u8BB0\u5FC6"]].map(([name2, label]) => h2(
        "label",
        { key: name2, className: "dim-field" },
        h2("input", {
          type: "checkbox",
          checked: settings[name2] !== false,
          disabled: busy,
          onChange: (event) => void invoke(ENDPOINTS.updateSettings, {
            settings: { [name2]: event.target.checked }
          })
        }),
        ` ${label}`
      )),
      h2("p", null, "\u7B80\u5355\u6D88\u606F\uFF1Adeepseek-v4-flash/off\uFF1B\u590D\u6742\u4EFB\u52A1\uFF1Adeepseek-v4-flash/max\u3002")
    ),
    h2(
      "div",
      { className: "dim-card" },
      h2("h3", null, "\u63D0\u793A\u8BCD\u4E0E\u8BB0\u5FC6"),
      h2("div", { className: "dim-promptTabs" }, model.data.prompts.map((prompt) => h2("button", {
        type: "button",
        key: prompt.name,
        disabled: busy,
        "aria-pressed": selected === prompt.name,
        onClick: () => choose(prompt.name)
      }, prompt.name))),
      h2("textarea", {
        value: content,
        rows: 18,
        disabled: busy,
        onChange: (event) => setContent(event.target.value),
        style: { width: "100%", marginTop: 12, fontFamily: "monospace" }
      }),
      h2(
        "div",
        { style: { display: "flex", gap: 8, marginTop: 8 } },
        h2("button", {
          type: "button",
          disabled: busy,
          onClick: () => void invoke(ENDPOINTS.savePrompt, { name: selected, content })
        }, "\u4FDD\u5B58"),
        h2("button", {
          type: "button",
          disabled: busy,
          onClick: () => void invoke(ENDPOINTS.resetPrompt, { name: selected })
        }, "\u6062\u590D\u9ED8\u8BA4")
      )
    ),
    h2("p", { className: "dim-muted" }, `\u6570\u636E\u76EE\u5F55\uFF1A${model.data.dataDir}`),
    model.error ? h2("p", { className: "dxw-error" }, model.error.message) : null
  );
}

// plugin-src/client/styles.js
var IM_STYLE_ID = "stu-xie-dsh-message-settings";
var CSS6 = String.raw`
.dim-page {
  --dim-blue: var(--dsw-alias-state-business-primary, #3370ff);
  --dim-blue-soft: color-mix(in srgb, var(--dim-blue) 9%, transparent);
  width: 100%;
  max-width: 1080px;
  padding: 2px 0 30px;
  color: var(--dsw-alias-label-primary, #1f2329);
  box-sizing: border-box;
}
.dim-page *, .dim-page *::before, .dim-page *::after { box-sizing: border-box; }
.dim-title { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin: 0 0 18px; }
.dim-brand { min-width: 0; display: flex; align-items: center; gap: 12px; }
.dim-brandLogo { width: 48px; height: 48px; flex: 0 0 48px; display: block; object-fit: contain; filter: grayscale(1) contrast(1.08); }
.dim-title p { margin: 0; color: var(--dsw-alias-label-primary, #1f2329); font-size: 14px; line-height: 20px; font-weight: 600; white-space: nowrap; }
.dim-githubAction { position: relative; display: inline-flex; flex: none; }
.dim-githubLink { min-height: 30px; display: inline-flex; align-items: center; gap: 5px; flex: none; padding: 0 10px; border: 1px solid var(--dsw-alias-border-l2, #dfe1e5); border-radius: 8px; color: var(--dsw-alias-label-secondary, #646a73); background: var(--dsw-alias-bg-layer-1, #fff); font-size: 12px; line-height: normal; font-weight: 560; text-decoration: none; transition: border-color .15s ease, color .15s ease, background .15s ease; }
.dim-githubLink:hover { border-color: #aeb3bb; color: var(--dsw-alias-label-primary, #1f2329); background: var(--dsw-alias-interactive-bg-hover, #f7f8fa); }
.dim-githubLink:focus-visible { outline: 2px solid color-mix(in srgb, var(--dim-blue) 70%, white); outline-offset: 2px; }
.dim-githubArrow { font-size: 13px; line-height: 1; }
.dim-githubTooltip { position: absolute; right: 0; bottom: calc(100% + 8px); z-index: 20; width: max-content; max-width: min(220px, 80vw); padding: 6px 9px; border: 1px solid var(--dsw-alias-border-l2, #dfe1e5); border-radius: 7px; color: var(--dsw-alias-label-primary, #1f2329); background: var(--dsw-alias-bg-layer-3, #fff); box-shadow: 0 8px 24px rgb(31 35 41 / 14%); font-size: 11px; line-height: 16px; font-weight: 500; white-space: nowrap; opacity: 0; visibility: hidden; transform: translateY(3px); pointer-events: none; transition: opacity .15s ease, transform .15s ease, visibility .15s ease; }
.dim-githubAction:hover .dim-githubTooltip, .dim-githubAction:focus-within .dim-githubTooltip { opacity: 1; visibility: visible; transform: translateY(0); }
.dim-layout { display: grid; grid-template-columns: 174px 1px minmax(0, 1fr); gap: 24px; align-items: start; }
.dim-rail { max-height: 520px; display: grid; align-content: start; gap: 8px; overflow-y: auto; padding: 1px 4px 1px 1px; scrollbar-width: thin; scrollbar-color: var(--dsw-alias-border-l2, #dfe1e5) transparent; }
.dim-rail::-webkit-scrollbar { width: 4px; }
.dim-rail::-webkit-scrollbar-thumb { border-radius: 99px; background: var(--dsw-alias-border-l2, #dfe1e5); }
.dim-channel { width: 100%; min-height: 48px; display: grid; grid-template-columns: 30px minmax(0, 1fr); align-items: center; gap: 10px; padding: 8px 12px; border: 1px solid var(--dsw-alias-border-l2, #eef0f3); border-radius: 14px; color: inherit; background: var(--dsw-alias-bg-layer-3, #fff); box-shadow: 0 2px 8px rgb(31 35 41 / 3%); font: inherit; text-align: left; cursor: pointer; transition: border-color .16s ease, background .16s ease, box-shadow .16s ease; }
.dim-channel:hover { border-color: color-mix(in srgb, var(--dim-blue) 25%, var(--dsw-alias-border-l2, #eef0f3)); background: color-mix(in srgb, var(--dim-blue) 2%, var(--dsw-alias-bg-layer-3, #fff)); box-shadow: 0 5px 16px rgb(31 35 41 / 5%); }
.dim-channel[aria-selected="true"] { border-color: color-mix(in srgb, var(--dim-blue) 43%, var(--dsw-alias-border-l2, #dfe1e5)); color: var(--dim-blue); background: color-mix(in srgb, var(--dim-blue) 12%, var(--dsw-alias-bg-layer-3, #fff)); box-shadow: 0 3px 12px rgb(51 112 255 / 7%); }
.dim-channel:focus-visible { outline: none; border-color: color-mix(in srgb, var(--dim-blue) 72%, var(--dsw-alias-border-l2, #dfe1e5)); box-shadow: 0 0 0 1px color-mix(in srgb, var(--dim-blue) 24%, transparent) inset, 0 3px 12px rgb(51 112 255 / 7%); }
.dim-logo { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 9px; box-shadow: 0 1px 3px rgb(31 35 41 / 7%); }
.dim-logo svg { display: block; width: 20px; height: 20px; }
.dim-logoWeixin { color: white; background: #07c160; }
.dim-logoWeixin svg { width: 19px; height: 19px; }
.dim-logoFeishu { background: white; border: 1px solid var(--dsw-alias-border-l2, #e5e6eb); }
.dim-logoFeishu svg { width: 28px; height: 28px; }
.dim-logoDingtalk { color: white; background: #1677ff; }
.dim-logoDingtalk svg { width: 24px; height: 24px; }
.dim-logoQq { color: white; background: #1677ff; }
.dim-logoQq svg { width: 21px; height: 21px; }
.dim-logoWecom { background: white; border: 1px solid var(--dsw-alias-border-l2, #e5e6eb); }
.dim-logoWecom svg { width: 22px; height: 22px; }
.dim-logoTelegram { color: white; background: #229ed9; }
.dim-logoTelegram svg { width: 21px; height: 21px; }
.dim-logoDiscord { color: white; background: #5865f2; }
.dim-logoDiscord svg { width: 21px; height: 21px; }
.dim-logoSlack { color: white; background: #4a154b; }
.dim-logoSlack svg { width: 21px; height: 21px; }
.dim-logoWhatsapp { color: white; background: #25d366; }
.dim-logoWhatsapp svg { width: 21px; height: 21px; }
.dim-channelCopy { min-width: 0; display: block; }
.dim-channelCopy strong { overflow: hidden; color: inherit; font-size: 14px; line-height: 20px; font-weight: 680; text-overflow: ellipsis; white-space: nowrap; }
.dim-divider { width: 1px; min-height: 520px; background: var(--dsw-alias-border-l1, #eef0f3); }
.dim-panel { min-width: 0; container-type: inline-size; }
.dim-panel .bxf-page, .dim-panel .dxw-page, .dim-panel .ddt-page, .dim-panel .dqq-page, .dim-panel .dwecom-page, .dim-panel .dsl-page, .dim-panel .dwa-page { width: 100%; max-width: none; padding: 0 0 24px; }
.dim-panel .bxf-heading, .dim-panel .dxw-heading, .dim-panel .ddt-heading { justify-content: flex-end; }
.dim-panel .bxf-headingTools, .dim-panel .dxw-tools, .dim-panel .ddt-tools { width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) max-content; align-items: center; justify-content: stretch; gap: 8px; }
.dim-panel .dim-bindActions { min-width: 0; display: flex; align-items: center; flex-wrap: nowrap; gap: 8px; }
.dim-panel .dim-bindActions > button { min-width: 0; }
.dim-panel .bxf-headingTools .dim-scanButton, .dim-panel .dxw-tools .dim-scanButton, .dim-panel .ddt-tools .dim-scanButton { flex: none; min-height: 34px; display: inline-flex; align-items: center; justify-content: center; justify-self: start; gap: 6px; padding: 0 10px; border: 1px solid #1677ff; border-radius: 8px; color: #fff; background: #1677ff; box-shadow: none; font: inherit; font-size: 13px; font-weight: 560; white-space: nowrap; }
.dim-panel .bxf-headingTools .dim-scanButton:hover:not(:disabled), .dim-panel .dxw-tools .dim-scanButton:hover:not(:disabled), .dim-panel .ddt-tools .dim-scanButton:hover:not(:disabled) { border-color: #0958d9; background: #0958d9; }
.dim-panel .dim-credentialButton { flex: none; min-height: 34px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 0 10px; border: 1px solid #86909c; border-radius: 8px; color: var(--dsw-alias-label-primary, #1f2329); background: var(--dsw-alias-bg-layer-1, #fff); box-shadow: 0 1px 2px rgb(31 35 41 / 5%); font: inherit; font-size: 13px; font-weight: 560; line-height: normal; white-space: nowrap; }
.dim-panel .dim-actionIcon { width: 15px; height: 15px; flex: 0 0 15px; }
.dim-panel .dim-credentialButton:hover:not(:disabled) { border-color: #4e5969; background: var(--dsw-alias-interactive-bg-hover, #f7f8fa); }
.dim-panel .dim-credentialButton[aria-pressed="true"] { border-color: #4e5969; background: var(--dsw-alias-bg-module-platform, #f2f3f5); box-shadow: inset 0 0 0 1px rgb(78 89 105 / 8%); }
.dim-panel .bxf-headingTools .dim-onlineBadge, .dim-panel .dxw-tools .dim-onlineBadge, .dim-panel .ddt-tools .dim-onlineBadge { min-height: 30px; display: inline-flex; align-items: center; justify-self: end; gap: 0; padding: 0 11px; border: 0; border-radius: 999px; color: var(--dsw-alias-label-secondary, #646a73); background: var(--dsw-alias-bg-module-platform, #f2f3f5); font: inherit; font-size: 12px; font-weight: 400; line-height: normal; white-space: nowrap; }
.dim-panel .dim-channelPage { width: 100%; max-width: none; display: flex; flex-direction: column; gap: 12px; padding: 0 0 24px; color: var(--dsw-alias-label-primary, #1f2329); box-sizing: border-box; }
.dim-panel .dim-surfaceCard { position: relative; overflow: hidden; border: 1px solid var(--dsw-alias-border-l2, #e5e6eb); border-radius: 14px; background: var(--dsw-alias-bg-layer-1, #fff); box-shadow: 0 1px 2px rgb(31 35 41 / 3%); }
.dim-panel .dim-surfaceCard::before { display: none; }
.dim-panel .dim-surfaceBody { padding: 24px; }
.dim-panel .dim-credentialPanel { display: grid; gap: 18px; padding: 20px; }
.dim-panel .dim-credentialTitle { margin: 0; color: var(--dsw-alias-label-primary, #1f2329); font-size: 17px; line-height: 1.35; font-weight: 650; }
.dim-panel .dim-credentialForm { min-width: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 12px; }
.dim-panel .dim-credentialFormSingle { grid-template-columns: minmax(0, 1fr); }
.dim-panel .dim-credentialField { min-width: 0; display: grid; gap: 7px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; line-height: normal; font-weight: 560; }
.dim-panel .dim-credentialField input { width: 100%; min-width: 0; height: 38px; padding: 0 11px; border: 1px solid var(--dsw-alias-border-l2, #dfe1e5); border-radius: 8px; outline: none; color: var(--dsw-alias-label-primary, #1f2329); background: var(--dsw-alias-bg-layer-1, #fff); font: 13px ui-monospace, SFMono-Regular, Menlo, monospace; transition: border-color .16s ease, box-shadow .16s ease; }
.dim-panel .dim-credentialField input:focus { border-color: #4e5969; box-shadow: 0 0 0 3px rgb(78 89 105 / 10%); }
.dim-panel .dim-credentialField input::placeholder { color: var(--dsw-alias-label-tertiary, #8f959e); font-family: inherit; }
.dim-panel .dim-credentialError, .dim-panel .dim-credentialActions { grid-column: 1 / -1; }
.dim-panel .dim-credentialError { margin: 0; color: var(--dsw-alias-state-error-primary, #d54941); font-size: 12px; line-height: 1.5; }
.dim-panel .dim-credentialActions { margin-top: 0; }
.dim-panel .dim-listSection { display: flex; flex-direction: column; gap: 0; }
.dim-panel .dim-listHeading { min-height: 0; display: flex; align-items: center; justify-content: space-between; gap: 16px; margin: 0 0 6px; padding: 0; }
.dim-panel .dim-listHeading h3 { margin: 0; color: var(--dsw-alias-label-primary, #1f2329); font-size: 14px; line-height: normal; font-weight: 650; }
.dim-panel .dim-botList { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.dim-panel .dim-loadingView { padding: 38px; color: var(--dsw-alias-label-secondary, #646a73); text-align: center; }
.dim-panel .dim-loadingView h3 { margin: 0 0 7px; color: var(--dsw-alias-label-primary, #1f2329); font-size: 17px; line-height: normal; font-weight: 650; }
.dim-panel .dim-loadingView p { margin: 0; line-height: 1.6; }
.dim-panel .dim-spinner { width: 24px; height: 24px; margin: 0 auto 13px; border: 3px solid var(--dsw-alias-border-l2, #e6e8eb); border-top-color: #1677ff; border-radius: 50%; animation: dim-spin .8s linear infinite; }
@keyframes dim-spin { to { transform: rotate(360deg); } }
.dim-panel .dim-emptyView { min-height: 230px; display: grid; grid-template-columns: minmax(0, 1fr) 180px; align-items: center; gap: 30px; }
.dim-panel .dim-emptyCopy { min-width: 0; }
.dim-panel .dim-emptyCopy h3 { margin: 8px 0; color: var(--dsw-alias-label-primary, #1f2329); font-size: 18px; line-height: 1.35; font-weight: 650; }
.dim-panel .dim-emptyCopy > p { max-width: 560px; margin: 0; color: var(--dsw-alias-label-secondary, #646a73); line-height: 1.65; }
.dim-panel .dim-emptyBrand { width: 110px; height: 110px; display: grid; place-items: center; justify-self: center; border-radius: 28px; box-shadow: 0 18px 45px rgb(22 119 255 / 18%); }
.dim-panel .dim-stateLabel { display: inline-flex; align-items: center; gap: 8px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; line-height: normal; font-weight: 600; }
.dim-panel .dim-stateDot { flex: none; width: 8px; height: 8px; border-radius: 50%; background: var(--dsw-alias-label-tertiary, #8f959e); box-shadow: none; }
.dim-panel .dim-stateDot[data-tone="success"] { background: var(--dsw-alias-state-success-primary, #20a162); }
.dim-panel .dim-stateDot[data-tone="warning"] { background: var(--dsw-alias-state-warn-primary, #d97706); }
.dim-panel .dim-stateDot[data-tone="error"] { background: var(--dsw-alias-state-error-primary, #d54941); }
.dim-panel .dim-viewActions { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
.dim-panel .dim-viewActions .bxf-button, .dim-panel .dim-viewActions .dxw-button, .dim-panel .dim-viewActions .ddt-button { min-height: 34px; padding: 0 13px; border: 1px solid var(--dsw-alias-border-l2, #dfe1e5); border-radius: 8px; color: var(--dsw-alias-label-primary, #1f2329); background: var(--dsw-alias-bg-layer-1, #fff); box-shadow: none; font: inherit; font-size: 13px; font-weight: 560; line-height: normal; white-space: nowrap; }
.dim-panel .dim-viewActions .bxf-button[data-kind="primary"], .dim-panel .dim-viewActions .dxw-button[data-kind="primary"], .dim-panel .dim-viewActions .ddt-button[data-kind="primary"] { border-color: #1677ff; color: #fff; background: #1677ff; box-shadow: none; }
.dim-panel .dim-viewActions .bxf-button[data-kind="danger"], .dim-panel .dim-viewActions .dxw-button[data-kind="danger"], .dim-panel .dim-viewActions .ddt-button[data-kind="danger"] { color: var(--dsw-alias-state-error-primary, #d54941); }
.dim-panel .dim-qrLayout { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 34px; align-items: start; }
.dim-panel .dim-qrColumn { width: 100%; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.dim-panel .dim-qrFrame { position: relative; width: min(270px, 100%); height: auto; aspect-ratio: 1; display: grid; place-items: center; overflow: hidden; padding: 10px; border: 1px solid var(--dsw-alias-border-l2, #dfe1e5); border-radius: 16px; background: #fff; }
.dim-panel .dim-qrFrame::before { content: ""; position: absolute; inset: 7px; z-index: 0; border: 1px solid color-mix(in srgb, #1677ff 16%, var(--dsw-alias-border-l2, #dfe1e5)); border-radius: 12px; pointer-events: none; }
.dim-panel .dim-qrFrame::after { display: none; }
.dim-panel .dim-qrFrame img { position: relative; z-index: 1; width: 100%; height: 100%; display: block; object-fit: contain; }
.dim-panel .dim-qrFallback { position: relative; z-index: 1; display: grid; place-items: center; gap: 8px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 13px; line-height: 1.5; text-align: center; }
.dim-panel .dim-qrExpired { position: absolute; inset: 0; z-index: 2; display: grid; place-items: center; padding: 20px; color: var(--dsw-static-neutral-bluish-1000, #0f1115); background: rgb(255 255 255 / 92%); font-size: 15px; line-height: 1.6; font-weight: 650; text-align: center; white-space: pre-line; backdrop-filter: blur(3px); }
.dim-panel .dim-countdown { width: min(270px, 100%); margin: 0; color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; line-height: normal; }
.dim-panel .dim-countdownTop { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 6px; }
.dim-panel .dim-countdownTop strong { color: var(--dsw-alias-label-primary, #1f2329); font-weight: 650; }
.dim-panel .dim-progress { height: 4px; overflow: hidden; margin: 0; border-radius: 99px; background: var(--dsw-alias-bg-module-platform, #eef0f3); }
.dim-panel .dim-progress span { display: block; width: var(--bxf-progress, var(--dxw-progress, var(--ddt-progress, 0%))); height: 100%; border-radius: inherit; background: #1677ff; transition: width .25s linear; }
.dim-panel .dim-qrCopy { min-width: 0; overflow-wrap: anywhere; }
.dim-panel .dim-qrCopy h3 { margin: 9px 0 8px; color: var(--dsw-alias-label-primary, #1f2329); font-size: 18px; line-height: 1.35; font-weight: 650; }
.dim-panel .dim-qrCopy > p { margin: 0; color: var(--dsw-alias-label-secondary, #646a73); line-height: 1.65; }
.dim-panel .dim-steps { margin: 18px 0 16px; padding: 0; list-style: none; counter-reset: dim-step; }
.dim-panel .dim-steps li { position: relative; min-height: 28px; display: flex; align-items: center; padding: 5px 0 5px 36px; color: var(--dsw-alias-label-secondary, #646a73); line-height: 1.5; counter-increment: dim-step; }
.dim-panel .dim-steps li::before { content: counter(dim-step); position: absolute; left: 0; top: 4px; width: 25px; height: 25px; display: grid; place-items: center; border-radius: 8px; color: #4d93f8; background: color-mix(in srgb, #1677ff 16%, var(--dsw-alias-bg-layer-1, #fff)); font-size: 12px; font-weight: 650; }
.dim-panel .dim-specialView { padding: 32px; text-align: center; }
.dim-panel .dim-statusNotice { display: flex; align-items: flex-start; gap: 10px; padding: 13px 15px; border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary, #d54941) 22%, var(--dsw-alias-border-l2, #dfe1e5)); border-radius: 10px; color: var(--dsw-alias-state-error-primary, #d54941); background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #d54941) 8%, var(--dsw-alias-bg-layer-1, #fff)); font-size: 13px; line-height: 1.5; }
.dim-panel .dim-inlineError { display: flex; align-items: flex-start; flex-direction: column; gap: 10px; padding: 22px; color: var(--dsw-alias-state-error-primary, #d54941); background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #d54941) 8%, var(--dsw-alias-bg-layer-1, #fff)); }
.dim-panel .dim-inlineError > div { min-width: 0; }
.dim-panel .dim-inlineError h3 { margin: 0; color: inherit; font-size: 17px; line-height: 1.35; font-weight: 650; }
.dim-panel .dim-inlineError p { margin: 7px 0 0; color: inherit; line-height: 1.6; }
.dim-panel .dim-confirm { padding: 18px 24px; border-top: 1px solid var(--dsw-alias-border-l1, #eef0f3); background: var(--dsw-alias-interactive-bg-hover, #f7f8fa); }
.dim-panel .dim-confirm strong, .dim-panel .dim-confirm h4 { margin: 0; color: var(--dsw-alias-label-primary, #1f2329); font-size: 14px; line-height: 1.4; font-weight: 650; }
.dim-panel .dim-confirm p { margin: 7px 0 0; color: var(--dsw-alias-label-secondary, #646a73); line-height: 1.6; }
.dim-panel .dim-cardFooter { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding-top: 8px; border-top: 1px solid var(--dsw-alias-border-l1, #eef0f3); }
.dim-panel .dim-workspace { min-width: 0; display: grid; gap: 7px; margin-top: 14px; padding: 11px 12px; border: 1px solid var(--dsw-alias-border-l1, #eef0f3); border-radius: 9px; background: var(--dsw-alias-bg-module-platform, #f7f8fa); }
.dim-panel .dim-workspaceHeader { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: var(--dsw-alias-label-secondary, #646a73); font-size: 12px; line-height: normal; }
.dim-panel .dim-workspaceEdit { padding: 0; border: 0; color: #1677ff; background: transparent; font: inherit; font-weight: 560; cursor: pointer; }
.dim-panel .dim-workspaceEdit:disabled { cursor: not-allowed; opacity: .55; }
.dim-panel .dim-workspacePath { min-width: 0; display: block; overflow: hidden; color: var(--dsw-alias-label-primary, #1f2329); font: 12px/1.55 ui-monospace, SFMono-Regular, Menlo, monospace; text-overflow: ellipsis; white-space: nowrap; }
.dim-directoryPickerBackdrop { --dim-blue: var(--dsw-alias-state-business-primary, #3370ff); --dim-blue-soft: color-mix(in srgb, var(--dim-blue) 9%, transparent); position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 24px; background: rgb(15 17 21 / 42%); backdrop-filter: blur(3px); }
.dim-directoryPickerBackdrop, .dim-directoryPickerBackdrop *, .dim-directoryPickerBackdrop *::before, .dim-directoryPickerBackdrop *::after { box-sizing: border-box; }
.dim-directoryPicker { width: min(720px, 100%); height: min(620px, calc(100vh - 48px)); min-height: 420px; display: grid; grid-template-rows: auto minmax(0, 1fr) auto; overflow: hidden; border: 1px solid var(--dsw-alias-border-l2, #dfe1e5); border-radius: 18px; outline: none; color: var(--dsw-alias-label-primary, #1f2329); background: var(--dsw-alias-bg-layer-1, #fff); box-shadow: 0 24px 72px rgb(15 17 21 / 24%); }
.dim-directoryPickerHeader { min-width: 0; padding: 22px 24px 17px; border-bottom: 1px solid var(--dsw-alias-border-l1, #eef0f3); }
.dim-directoryPickerHeader h3 { margin: 0 0 14px; color: var(--dsw-alias-label-primary, #1f2329); font-size: 20px; line-height: 1.35; font-weight: 680; }
.dim-directoryPickerHeader > p { margin: 0; color: var(--dsw-alias-label-secondary, #646a73); font-size: 13px; }
.dim-directoryCrumbs { min-width: 0; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; color: var(--dsw-alias-label-tertiary, #8f959e); }
.dim-directoryCrumbs button { max-width: 210px; overflow: hidden; padding: 3px 5px; border: 0; border-radius: 6px; color: var(--dsw-alias-label-secondary, #646a73); background: transparent; font: inherit; font-size: 12px; line-height: 18px; text-overflow: ellipsis; white-space: nowrap; cursor: pointer; }
.dim-directoryCrumbs button:hover:not(:disabled) { color: var(--dim-blue); background: var(--dim-blue-soft); }
.dim-directoryCrumbs button[aria-current="page"] { color: var(--dsw-alias-label-primary, #1f2329); font-weight: 650; }
.dim-directoryCrumbs button:focus-visible, .dim-directoryList button:focus-visible, .dim-directoryPickerActions button:focus-visible { outline: 2px solid color-mix(in srgb, var(--dim-blue) 65%, white); outline-offset: 1px; }
.dim-directoryCrumbSeparator { flex: none; font-size: 12px; }
.dim-directoryPickerBody { min-height: 0; overflow-y: auto; padding: 14px 16px; scrollbar-width: thin; scrollbar-color: var(--dsw-alias-border-l2, #dfe1e5) transparent; }
.dim-directoryList { display: grid; gap: 3px; margin: 0; padding: 0; list-style: none; }
.dim-directoryList button { width: 100%; min-height: 46px; display: grid; grid-template-columns: 24px minmax(0, 1fr) 18px; align-items: center; gap: 10px; padding: 7px 11px; border: 0; border-radius: 9px; color: var(--dsw-alias-label-primary, #1f2329); background: transparent; font: inherit; text-align: left; cursor: pointer; }
.dim-directoryList button:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover, #f7f8fa); }
.dim-directoryList button:disabled, .dim-directoryCrumbs button:disabled { cursor: wait; opacity: .55; }
.dim-directoryFolder { width: 24px; height: 24px; display: grid; place-items: center; color: var(--dsw-alias-label-secondary, #646a73); }
.dim-directoryFolder svg { width: 22px; height: 22px; }
.dim-directoryName { min-width: 0; overflow: hidden; font-size: 14px; line-height: 20px; text-overflow: ellipsis; white-space: nowrap; }
.dim-directoryChevron { width: 18px; height: 18px; display: grid; place-items: center; color: var(--dsw-alias-label-tertiary, #8f959e); }
.dim-directoryChevron svg { width: 17px; height: 17px; }
.dim-directoryPickerState { min-height: 210px; display: grid; place-content: center; justify-items: center; gap: 10px; color: var(--dsw-alias-label-secondary, #646a73); text-align: center; }
.dim-directoryPickerState p { margin: 0; font-size: 13px; line-height: 1.6; }
.dim-directoryPickerSpinner { width: 24px; height: 24px; border: 3px solid var(--dsw-alias-border-l2, #e6e8eb); border-top-color: var(--dim-blue); border-radius: 50%; animation: dim-spin .8s linear infinite; }
.dim-directoryPickerError { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 8px 0 0; padding: 10px 12px; border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary, #d54941) 22%, var(--dsw-alias-border-l2, #dfe1e5)); border-radius: 8px; color: var(--dsw-alias-state-error-primary, #d54941); background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #d54941) 7%, var(--dsw-alias-bg-layer-1, #fff)); font-size: 12px; line-height: 1.5; }
.dim-directoryPickerError button { flex: none; padding: 4px 8px; border: 0; border-radius: 6px; color: inherit; background: transparent; font: inherit; font-weight: 650; cursor: pointer; }
.dim-directoryPickerTruncated { margin: 10px 4px 0; color: var(--dsw-alias-label-tertiary, #8f959e); font-size: 12px; line-height: 1.5; }
.dim-directoryPickerFooter { display: grid; grid-template-columns: max-content minmax(0, 1fr) max-content; align-items: center; gap: 14px; padding: 16px 20px; border-top: 1px solid var(--dsw-alias-border-l1, #eef0f3); background: var(--dsw-alias-bg-layer-1, #fff); }
.dim-directoryHidden { display: inline-flex; align-items: center; gap: 7px; padding: 2px 0; border: 0; color: var(--dsw-alias-label-secondary, #646a73); background: transparent; font: inherit; font-size: 12px; white-space: nowrap; cursor: pointer; }
.dim-directoryHidden:focus-visible { outline: 2px solid color-mix(in srgb, var(--dim-blue) 65%, white); outline-offset: 2px; }
.dim-directoryHidden:disabled { cursor: not-allowed; opacity: .52; }
.dim-directoryHiddenBox { position: relative; width: 15px; height: 15px; flex: 0 0 15px; border: 1px solid var(--dsw-alias-border-l2, #c9cdd4); border-radius: 4px; background: var(--dsw-alias-bg-layer-1, #fff); }
.dim-directoryHidden[aria-pressed="true"] .dim-directoryHiddenBox { border-color: var(--dim-blue); background: var(--dim-blue); }
.dim-directoryHidden[aria-pressed="true"] .dim-directoryHiddenBox::after { content: ""; position: absolute; left: 4px; top: 1px; width: 4px; height: 8px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
.dim-directoryPickerNotice { min-width: 0; margin: 0; color: var(--dsw-alias-label-tertiary, #8f959e); font-size: 11px; line-height: 1.45; text-align: right; }
.dim-directoryPickerActions { display: flex; gap: 8px; }
.dim-directoryPickerActions button { min-height: 36px; padding: 0 14px; border: 1px solid var(--dsw-alias-border-l2, #dfe1e5); border-radius: 8px; color: var(--dsw-alias-label-primary, #1f2329); background: var(--dsw-alias-bg-layer-1, #fff); font: inherit; font-size: 13px; font-weight: 560; white-space: nowrap; cursor: pointer; }
.dim-directoryPickerActions .dim-directoryPickerPrimary { border-color: var(--dim-blue); color: #fff; background: var(--dim-blue); }
.dim-directoryPickerActions button:hover:not(:disabled) { filter: brightness(.97); }
.dim-directoryPickerActions button:disabled { cursor: not-allowed; opacity: .52; }
.dim-panel .dim-cardSummary { min-width: 0; color: var(--dsw-alias-label-secondary, #646a73); font: inherit; font-size: 12px; font-weight: 400; line-height: normal; }
.dim-panel .dim-cardActions { flex: none; display: flex; align-items: center; flex-wrap: nowrap; gap: 8px; margin: 0 0 0 auto; }
.dim-panel .dim-cardActions .dim-cardAction { flex: none; min-height: 34px; padding: 0 13px; border: 1px solid var(--dsw-alias-border-l2, #dfe1e5); border-radius: 8px; color: var(--dsw-alias-label-primary, #1f2329); background: var(--dsw-alias-bg-layer-1, #fff); font: inherit; font-size: 13px; font-weight: 560; line-height: normal; white-space: nowrap; }
.dim-panel .dim-cardActions .dim-cardAction:hover:not(:disabled) { border-color: #aeb3bb; background: var(--dsw-alias-interactive-bg-hover, #f7f8fa); }
.dim-panel .dim-cardActions .dim-cardAction[data-kind="danger"] { color: var(--dsw-alias-state-error-primary, #d54941); }
.dim-panel .dim-botCard { position: relative; overflow: hidden; border: 1px solid var(--dsw-alias-border-l2, #e5e6eb); border-radius: 14px; background: var(--dsw-alias-bg-layer-1, #fff); box-shadow: 0 1px 2px rgb(31 35 41 / 3%); }
.dim-panel .dim-botCard::before { display: none; }
.dim-panel .dim-botCardBody { position: relative; padding: 14px; }
.dim-panel .dim-botCardTop { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.dim-panel .dim-botIdentity { min-width: 0; display: flex; align-items: center; gap: 12px; }
.dim-panel .dim-botAvatar { flex: none; width: 42px; height: 42px; display: grid; place-items: center; overflow: hidden; border-radius: 12px; box-shadow: none; }
.dim-panel .dim-botAvatar svg { width: 29px; height: 29px; }
.dim-panel .dim-botName { min-width: 0; }
.dim-panel .dim-botName h3 { overflow: hidden; margin: 0; color: var(--dsw-alias-label-primary, #1f2329); font-size: 15px; font-weight: 650; line-height: normal; text-overflow: ellipsis; white-space: nowrap; }
.dim-panel .dim-botName p { overflow: hidden; margin: 4px 0 0; color: var(--dsw-alias-label-secondary, #646a73); font: 12px ui-monospace, SFMono-Regular, monospace; line-height: normal; text-overflow: ellipsis; white-space: nowrap; }
.dim-panel .dim-botCard .dim-botHealth { flex: none; min-height: 0; display: inline-flex; align-items: center; gap: 7px; padding: 0; border: 0; border-radius: 0; color: var(--dsw-alias-label-secondary, #646a73); background: transparent; font: inherit; font-size: 12px; font-weight: 400; line-height: normal; white-space: nowrap; }
.dim-panel .dim-botCard .dim-healthDot { flex: none; width: 8px; height: 8px; border-radius: 50%; background: #aeb3bb; box-shadow: none; }
.dim-panel .dim-botCard .dim-healthDot[data-tone="success"] { background: var(--dsw-alias-state-success-primary, #20a162); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-success-primary, #20a162) 14%, transparent); }
.dim-panel .dim-botCard .dim-healthDot[data-tone="warning"] { background: var(--dsw-alias-state-warn-primary, #d97706); }
.dim-panel .dim-botCard .dim-healthDot[data-tone="error"] { background: var(--dsw-alias-state-error-primary, #d54941); }
.dim-panel .dim-botMetrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 8px 0; }
.dim-panel .dim-botMetric { min-width: 0; padding: 8px; border: 0; border-radius: 9px; background: var(--dsw-alias-interactive-bg-hover, #f7f8fa); }
.dim-panel .dim-botMetric dt { margin: 0; color: var(--dsw-alias-label-tertiary, #8f959e); font-size: 11px; font-weight: 400; line-height: normal; }
.dim-panel .dim-botMetric dd { overflow: hidden; margin: 5px 0 0; color: var(--dsw-alias-label-primary, #1f2329); font-size: 13px; font-weight: 400; line-height: normal; text-overflow: ellipsis; white-space: nowrap; }
.dim-panel .dim-botCard .dim-cardFooter { margin-top: 0; }
.dim-panel .ddt-headingCopy { display: none; }
.dim-panel .ddt-qrFrame, .dim-panel .ddt-countdown { width: min(270px, 100%); }
@container (max-width: 680px) {
  .dim-panel .bxf-headingTools, .dim-panel .dxw-tools, .dim-panel .ddt-tools { gap: 6px; }
  .dim-panel .dim-bindActions { gap: 6px; }
  .dim-panel .bxf-headingTools .dim-scanButton, .dim-panel .dxw-tools .dim-scanButton, .dim-panel .ddt-tools .dim-scanButton, .dim-panel .dim-credentialButton { gap: 5px; padding-inline: 8px; font-size: 12px; }
  .dim-panel .dim-actionIcon { width: 13px; height: 13px; flex-basis: 13px; }
  .dim-panel .bxf-headingTools .dim-onlineBadge, .dim-panel .dxw-tools .dim-onlineBadge, .dim-panel .ddt-tools .dim-onlineBadge { padding-inline: 8px; font-size: 11px; }
  .dim-panel .dim-credentialForm { grid-template-columns: minmax(0, 1fr); }
  .dim-panel .dim-credentialError, .dim-panel .dim-credentialActions { grid-column: auto; }
  .dim-panel .dim-emptyView { min-height: 0; grid-template-columns: minmax(0, 1fr); }
  .dim-panel .dim-emptyBrand { display: none; }
  .dim-panel .dim-qrLayout { grid-template-columns: minmax(0, 1fr); justify-items: center; gap: 24px; }
  .dim-panel .dim-qrColumn { width: 100%; min-width: 0; }
  .dim-panel .dim-qrCopy { width: 100%; min-width: 0; overflow-wrap: anywhere; }
  .dim-panel .ddt-qrLayout { grid-template-columns: minmax(0, 1fr); justify-items: center; gap: 24px; }
  .dim-panel .ddt-qrColumn { width: 100%; min-width: 0; }
  .dim-panel .ddt-qrCopy { width: 100%; min-width: 0; overflow-wrap: anywhere; }
}
@media (max-width: 840px) {
  .dim-title { align-items: flex-start; }
  .dim-layout { grid-template-columns: minmax(0, 1fr); gap: 18px; }
  .dim-rail { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .dim-divider { display: none; }
  .dim-rail { max-height: none; overflow: visible; padding-right: 1px; }
  .dim-channel { min-height: 48px; }
}
@media (max-width: 720px) {
  .dim-panel .dim-botCardTop { flex-direction: column; align-items: stretch; }
}
@media (max-width: 560px) {
  .dim-title { flex-direction: column; gap: 10px; }
  .dim-title p { white-space: normal; }
  .dim-githubTooltip { right: auto; left: 0; }
  .dim-rail { grid-template-columns: minmax(0, 1fr); }
  .dim-directoryPickerBackdrop { padding: 10px; }
  .dim-directoryPicker { height: calc(100vh - 20px); min-height: 0; border-radius: 14px; }
  .dim-directoryPickerHeader { padding: 18px 17px 14px; }
  .dim-directoryPickerHeader h3 { font-size: 18px; }
  .dim-directoryPickerBody { padding: 10px; }
  .dim-directoryPickerFooter { grid-template-columns: minmax(0, 1fr) max-content; gap: 10px; padding: 13px 14px; }
  .dim-directoryPickerNotice { grid-column: 1 / -1; grid-row: 1; text-align: left; }
}
@media (prefers-reduced-motion: reduce) {
  .dim-page * { transition-duration: .01ms !important; }
  .dim-directoryPickerSpinner { animation-duration: 1.8s; }
}
`;
function installImStyles() {
  if (typeof document === "undefined") return () => {
  };
  const existing = document.querySelector(`style[data-plugin-css="${IM_STYLE_ID}"]`);
  if (existing) return () => {
  };
  const style = document.createElement("style");
  style.dataset.plugin = "@stu-xie/dsh-message";
  style.dataset.pluginCss = IM_STYLE_ID;
  style.textContent = CSS6;
  document.head.appendChild(style);
  return () => style.remove();
}

// plugin-src/client/index.js
var name = "message-settings";
var inject = ["slots", "connection", "locale", "workspaces"];
var MESSAGE_RPC_CHANNEL = "/message-agent";
var MESSAGE_LOGO_URL = "data:image/png;base64,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";
var CHANNELS = Object.freeze([
  { id: "weixin", label: "\u5FAE\u4FE1" },
  { id: "feishu", label: "\u98DE\u4E66" },
  { id: "qq", label: "QQ" },
  { id: "wecom", label: "\u4F01\u4E1A\u5FAE\u4FE1" },
  { id: "dingtalk", label: "\u9489\u9489" },
  { id: "agent", label: "\u52A9\u624B\u8BBE\u7F6E" }
]);
function ChannelLogo({ channel }) {
  const icons = {
    weixin: WeixinLogoGlyph,
    feishu: FeishuLogoGlyph,
    qq: QqLogoGlyph,
    wecom: WecomLogoGlyph,
    dingtalk: DingtalkLogoGlyph
  };
  const Icon = icons[channel];
  return h2("span", {
    className: `dim-logo dim-logo${channel[0].toUpperCase()}${channel.slice(1)}`,
    "aria-hidden": "true"
  }, Icon ? h2(Icon) : "\u2699");
}
function MessageSettingsTab({
  dingtalkRpcCall,
  feishuRpcCall,
  qqRpcCall,
  wecomRpcCall,
  weixinRpcCall,
  agentRpcCall,
  workspaceDirectoryPicker
}) {
  const [selected, setSelected] = React14.useState("weixin");
  const active = CHANNELS.find((channel) => channel.id === selected) ?? CHANNELS[0];
  return h2(
    WorkspaceDirectoryPickerContext.Provider,
    { value: workspaceDirectoryPicker },
    h2(
      "section",
      { className: "dim-page", "aria-label": "dsh-message \u6D88\u606F\u63A5\u5165\u8BBE\u7F6E" },
      h2(
        "header",
        { className: "dim-title" },
        h2(
          "div",
          { className: "dim-brand" },
          h2("img", {
            className: "dim-brandLogo",
            src: MESSAGE_LOGO_URL,
            alt: "dsh-message",
            width: 48,
            height: 48
          }),
          h2(
            "div",
            null,
            h2("strong", null, "dsh-message"),
            h2("p", null, "\u8BA9\u4E94\u79CD\u6D88\u606F\u6E20\u9053\u5171\u4EAB\u540C\u4E00\u4E2A DeepSeek Harness \u52A9\u624B")
          )
        )
      ),
      h2(
        "div",
        { className: "dim-layout" },
        h2(
          "nav",
          { className: "dim-rail", role: "tablist", "aria-label": "\u6D88\u606F\u6E20\u9053\u4E0E\u52A9\u624B\u8BBE\u7F6E" },
          CHANNELS.map((channel) => h2(
            "button",
            {
              key: channel.id,
              type: "button",
              role: "tab",
              id: `dim-tab-${channel.id}`,
              className: "dim-channel",
              "aria-selected": channel.id === active.id,
              "aria-controls": `dim-panel-${channel.id}`,
              onClick: () => setSelected(channel.id)
            },
            h2(ChannelLogo, { channel: channel.id }),
            h2("span", { className: "dim-channelCopy" }, h2("strong", null, channel.label))
          ))
        ),
        h2("div", { className: "dim-divider", "aria-hidden": "true" }),
        h2("main", {
          className: "dim-panel",
          role: "tabpanel",
          id: `dim-panel-${active.id}`,
          "aria-labelledby": `dim-tab-${active.id}`
        }, active.id === "weixin" ? h2(WeixinSettingsTab, { rpcCall: weixinRpcCall }) : active.id === "feishu" ? h2(FeishuSettingsTab, { rpcCall: feishuRpcCall }) : active.id === "qq" ? h2(QqSettingsTab, { rpcCall: qqRpcCall }) : active.id === "wecom" ? h2(WecomSettingsTab, { rpcCall: wecomRpcCall }) : active.id === "dingtalk" ? h2(DingtalkSettingsTab, { rpcCall: dingtalkRpcCall }) : h2(AgentSettingsTab, { rpcCall: agentRpcCall }))
      )
    )
  );
}
var IMSettingsTab = MessageSettingsTab;
function apply(ctx) {
  ctx.effect(
    () => ctx.locale.register(IM_LOCALE_NAMESPACE, { zh, en }),
    "dsh-message: bilingual dictionaries"
  );
  const t = ctx.locale.bind(IM_LOCALE_NAMESPACE);
  setImTranslator(t);
  ctx.effect(() => {
    const disposers = [
      installFeishuStyles(),
      installWeixinStyles(),
      installWecomStyles(),
      installQqStyles(),
      installDingtalkStyles(),
      installImStyles()
    ];
    return () => {
      for (const dispose of disposers.reverse()) dispose();
    };
  }, "dsh-message: install settings styles");
  const rpc = (channel) => (endpoint, payload, signal) => ctx.connection.rpc.call(channel, endpoint, payload, signal);
  const workspaceDirectoryPicker = Object.freeze({
    listDirectory: (path, signal) => ctx.workspaces.listDirectory(path, signal),
    pickDirectory: () => ctx.workspaces.pickDirectory()
  });
  ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register({
    name: "settings.plugins.tab",
    id: "message",
    order: 20,
    label: () => t("\u6D88\u606F\u63A5\u5165"),
    locale: IM_LOCALE_NAMESPACE,
    inject: () => ({
      dingtalkRpcCall: rpc(DINGTALK_RPC_CHANNEL),
      feishuRpcCall: rpc(FEISHU_RPC_CHANNEL),
      qqRpcCall: rpc(QQ_RPC_CHANNEL),
      wecomRpcCall: rpc(WECOM_RPC_CHANNEL),
      weixinRpcCall: rpc(WEIXIN_RPC_CHANNEL),
      agentRpcCall: rpc(MESSAGE_RPC_CHANNEL),
      workspaceDirectoryPicker
    })
  }, MessageSettingsTab));
}

    return module.exports;
  }
});
