/** Convert common Markdown constructs into readable WeChat plain text. */
export function formatForWeChat(input) {
  return String(input || '')
    .replace(/```[^\n]*\n?/g, '')
    .replace(/```/g, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '[$1]')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1：$2')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(^|\s)[*_]([^*_\n]+)[*_](?=\s|$)/g, '$1$2')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '▌')
    .replace(/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/gm, '')
    .replace(/^\s*\|(.+)\|\s*$/gm, (_, row) => row.split('|').map(cell => cell.trim()).join(' ｜ '))
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Find a human-friendly cut point without splitting a URL, word, or — whenever
 * possible — a complete sentence. The soft limit `maximum` is a target: when a
 * sentence ends just past it (within `lookahead`), we carry the whole sentence
 * into this bubble instead of snapping mid-sentence, so combined with a
 * model-provided bubble break the code never has to cut a sentence in half.
 */
export function safeTextCut(text, maximum, lookahead = 80) {
  if (text.length <= maximum) return text.length
  const floor = Math.max(1, Math.floor(maximum * 0.55))
  // 任意标点/换行都可作为截断点：先在 [floor, maximum) 内找最后一个（截断点不超过上限），
  // 没有才向前看到下一个标点（允许略超上限，保住完整句子）。
  const boundary = /[\n。！？!?；;…，,、：:\u3000 ]/
  const inWindow = text.slice(floor, maximum)
  for (let index = inWindow.length - 1; index >= 0; index--) {
    if (boundary.test(inWindow[index])) return floor + index + 1
  }
  const ahead = text.slice(maximum, Math.min(text.length, maximum + lookahead))
  for (let index = 0; index < ahead.length; index++) {
    if (boundary.test(ahead[index])) return maximum + index + 1
  }
  return maximum
}

/** Incremental formatter that keeps incomplete Markdown markers out of early chunks. */
export class StreamFormatter {
  constructor() {
    this.raw = ''
    this.sentFormattedLength = 0
  }

  append(delta) {
    this.raw += delta
  }

  pending() {
    const formatted = formatForWeChat(this.raw)
    return formatted.slice(this.sentFormattedLength)
  }

  consume(count) {
    this.sentFormattedLength += count
  }
}
