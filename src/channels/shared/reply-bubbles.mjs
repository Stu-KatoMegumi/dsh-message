export const MAX_REPLY_BUBBLES = 10;

/**
 * Parse the prompt contract shared by every channel.  Only a bare `---` line
 * with a newline on both sides is a message boundary; inline or padded dashes
 * remain ordinary content.
 */
export function splitReplyBubbles(value, maxBubbles = MAX_REPLY_BUBBLES) {
  const text = String(value ?? '').replace(/\r\n?/g, '\n').trim();
  if (!text) return [];
  const parts = text.split('\n---\n').map((part) => part.trim()).filter(Boolean);
  if (parts.length <= maxBubbles) return parts;
  return [
    ...parts.slice(0, maxBubbles - 1),
    parts.slice(maxBubbles - 1).join('\n\n'),
  ];
}

export function chunkReplyBubbles(value, splitChunk, maxBubbles = MAX_REPLY_BUBBLES) {
  if (typeof splitChunk !== 'function') throw new TypeError('splitChunk must be a function');
  return splitReplyBubbles(value, maxBubbles).flatMap((bubble) => splitChunk(bubble));
}

