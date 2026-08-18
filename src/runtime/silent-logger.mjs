const noop = () => {};

/**
 * Plugin mode is deliberately silent.  Keep this logger separate from the
 * process-wide console so loading dsh-message never hides DSH's own output.
 */
export const SILENT_LOGGER = Object.freeze({
  log: noop,
  fatal: noop,
  error: noop,
  warn: noop,
  info: noop,
  debug: noop,
  trace: noop,
});

