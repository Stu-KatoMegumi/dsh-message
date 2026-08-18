function fieldMatches(field, value, min, max) {
  return String(field).split(',').some(part => {
    const [rangeText, stepText] = part.split('/')
    const step = Number(stepText || 1)
    if (!Number.isInteger(step) || step < 1) return false
    let start = min
    let end = max
    if (rangeText !== '*') {
      const [left, right] = rangeText.split('-').map(Number)
      start = left
      end = Number.isFinite(right) ? right : left
    }
    return Number.isInteger(start) && Number.isInteger(end)
      && start >= min && end <= max && value >= start && value <= end
      && (value - start) % step === 0
  })
}

/** Match a standard five-field cron expression in local time. */
export function cronMatches(expression, date = new Date()) {
  const fields = String(expression || '').trim().split(/\s+/)
  if (fields.length !== 5) return false
  const values = [date.getMinutes(), date.getHours(), date.getDate(), date.getMonth() + 1, date.getDay()]
  const ranges = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]]
  return fields.every((field, index) => fieldMatches(field, values[index], ...ranges[index]))
}

export function minuteKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`
}
