export const WORKSPACE_SESSION_STALE = 'workspace-session-stale';

function workspaceSession(harness, sessionId) {
  if (typeof harness.workspaceSession === 'function') {
    return harness.workspaceSession(sessionId);
  }
  return Object.freeze({
    sessionId,
    sessionExists: (...args) => harness.sessionExists(sessionId, ...args),
    ask: (...args) => harness.ask(sessionId, ...args),
  });
}

async function sessionExists(session, options) {
  return options === undefined
    ? session.sessionExists()
    : session.sessionExists(options);
}

async function createSession(harness, options) {
  return options === undefined
    ? harness.createSession()
    : harness.createSession(options);
}

/**
 * Resolve, persist, and ask through a session that belongs to the bot's
 * current workspace. A concurrent workspace switch invalidates the scoped
 * session and retries before any prompt is sent to the stale session.
 */
export async function askInWorkspaceSession({
  harness,
  state,
  key,
  text,
  createOptions,
  existsOptions,
  askOptions,
}) {
  while (true) {
    let preparedMetadata = null;
    const agent = harness.agentHooks;
    try {
      let sessionId = state.sessionFor(key);
      if (sessionId && agent?.shouldRotate(key, sessionId)) sessionId = null;
      let session = sessionId ? workspaceSession(harness, sessionId) : null;
      if (!session || !(await sessionExists(session, existsOptions))) {
        sessionId = await createSession(harness, createOptions);
        if (await state.setSession(key, sessionId) === false) continue;
        session = workspaceSession(harness, sessionId);
      }
      const prepared = agent
        ? await agent.beforeTurn(key, { sessionId, text, askOptions })
        : { text, askOptions, metadata: null };
      preparedMetadata = prepared.metadata;
      let answer;
      try {
        answer = await session.ask(prepared.text, prepared.askOptions);
        const retry = agent?.afterFirstTurn
          ? await agent.afterFirstTurn(key, {
            answer,
            metadata: prepared.metadata,
            harness,
          })
          : null;
        if (retry) {
          if (prepared.metadata) prepared.metadata.deepAskStarted = true;
          answer = await session.ask(retry.text, retry.askOptions);
        }
      } catch (error) {
        // A model-route outage is recoverable exactly once. Selection errors
        // raised while preparing the deep route have already switched (or
        // attempted to switch) inside afterFirstTurn, so do not switch again.
        const mayRecover = !prepared.metadata?.retryStarted
          || prepared.metadata?.deepAskStarted === true;
        const retry = mayRecover && agent?.onTurnError
          ? await agent.onTurnError(key, {
            error,
            metadata: prepared.metadata,
            harness,
          })
          : null;
        if (!retry) throw error;
        try {
          answer = await session.ask(retry.text, retry.askOptions);
        } catch (replayError) {
          // The recovery turn itself failed. Hand it back once so the shared
          // agent can release the half-open primary probe and record why the
          // message ended, then surface the real error to the channel. Without
          // this, a failed probe would pin every later message to the fallback.
          if (agent?.onTurnError) {
            await agent.onTurnError(key, {
              error: replayError,
              metadata: prepared.metadata,
              harness,
            }).catch(() => undefined);
          }
          throw replayError;
        }
      }
      return {
        sessionId,
        answer: agent
          ? await agent.afterTurn(key, { answer, metadata: prepared.metadata })
          : answer,
      };
    } catch (error) {
      if (error?.code !== WORKSPACE_SESSION_STALE) throw error;
      if (preparedMetadata && agent?.onTurnError) {
        await agent.onTurnError(key, {
          error,
          metadata: preparedMetadata,
          harness,
        }).catch(() => {});
      }
    }
  }
}
