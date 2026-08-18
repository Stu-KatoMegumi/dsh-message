// iLink CDN media support, adapted from the public Tencent protocol behavior
// documented by @tencent-weixin/openclaw-weixin and the MIT reference bridges.

import crypto from 'node:crypto'
import path from 'node:path'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'

export const CDN_BASE_URL = 'https://novac2c.cdn.weixin.qq.com/c2c'
export const MEDIA_MAX_BYTES = 50 * 1024 * 1024
export const MessageItemType = Object.freeze({ TEXT: 1, IMAGE: 2, VOICE: 3, FILE: 4, VIDEO: 5 })
export const UploadMediaType = Object.freeze({ IMAGE: 1, VIDEO: 2, FILE: 3, VOICE: 4 })

function parseAesKey(value) {
  const decoded = Buffer.from(String(value || ''), 'base64')
  if (decoded.length === 16) return decoded
  if (decoded.length === 32 && /^[0-9a-f]{32}$/i.test(decoded.toString('ascii'))) {
    return Buffer.from(decoded.toString('ascii'), 'hex')
  }
  throw new Error(`invalid iLink media key (${decoded.length} bytes)`)
}

function decrypt(ciphertext, key) {
  const decipher = crypto.createDecipheriv('aes-128-ecb', key, null)
  return Buffer.concat([decipher.update(ciphertext), decipher.final()])
}

function encrypt(plaintext, key) {
  const cipher = crypto.createCipheriv('aes-128-ecb', key, null)
  return Buffer.concat([cipher.update(plaintext), cipher.final()])
}

function encryptedSize(size) {
  return Math.ceil((size + 1) / 16) * 16
}

function safeName(value, fallback = 'file.bin') {
  return String(value || fallback).replace(/[\\/:*?"<>|\r\n\0]/g, '_').slice(0, 128) || fallback
}

function imageExtension(buffer) {
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return '.jpg'
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return '.png'
  if (buffer.subarray(0, 4).toString('ascii') === 'RIFF') return '.webp'
  if (buffer.subarray(0, 3).toString('ascii') === 'GIF') return '.gif'
  return '.jpg'
}

async function fetchBytes(url, { timeoutMs = 60_000 } = {}) {
  let response
  let lastError
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) })
      if (response.ok || (response.status >= 400 && response.status < 500)) break
      lastError = new Error(`media download failed: HTTP ${response.status}`)
    } catch (error) {
      lastError = error
    }
  }
  if (!response?.ok) throw lastError || new Error(`media download failed: HTTP ${response?.status || 'unknown'}`)
  const declared = Number(response.headers.get('content-length') || 0)
  if (declared > MEDIA_MAX_BYTES) throw new Error('media exceeds the 50 MB limit')
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length > MEDIA_MAX_BYTES) throw new Error('media exceeds the 50 MB limit')
  return bytes
}

async function receiveMedia(media, explicitKey) {
  if (!media?.encrypt_query_param && !media?.full_url) throw new Error('media URL is missing')
  const url = media.full_url || `${CDN_BASE_URL}/download?encrypted_query_param=${encodeURIComponent(media.encrypt_query_param)}`
  const bytes = await fetchBytes(url)
  const keyValue = explicitKey || media.aes_key
  return keyValue ? decrypt(bytes, parseAesKey(keyValue)) : bytes
}

/** Download and decrypt one inbound image, voice, file, or video item. */
export async function downloadInboundItem(item, saveDir) {
  await mkdir(saveDir, { recursive: true })
  const stamp = `${Date.now()}-${crypto.randomBytes(3).toString('hex')}`
  let bytes
  let fileName
  let kind
  if (item?.type === MessageItemType.IMAGE) {
    const image = item.image_item || {}
    const explicit = image.aeskey ? Buffer.from(image.aeskey, 'hex').toString('base64') : undefined
    bytes = await receiveMedia(image.media, explicit)
    fileName = `wx-image-${stamp}${imageExtension(bytes)}`
    kind = 'image'
  } else if (item?.type === MessageItemType.VOICE) {
    bytes = await receiveMedia(item.voice_item?.media)
    fileName = `wx-voice-${stamp}.silk`
    kind = 'voice'
  } else if (item?.type === MessageItemType.FILE) {
    bytes = await receiveMedia(item.file_item?.media)
    fileName = safeName(item.file_item?.file_name, `wx-file-${stamp}.bin`)
    kind = 'file'
  } else if (item?.type === MessageItemType.VIDEO) {
    bytes = await receiveMedia(item.video_item?.media)
    fileName = `wx-video-${stamp}.mp4`
    kind = 'video'
  } else {
    return null
  }
  const savedPath = path.resolve(saveDir, fileName)
  const root = path.resolve(saveDir) + path.sep
  if (!savedPath.startsWith(root)) throw new Error('unsafe media path')
  await writeFile(savedPath, bytes)
  return { savedPath, kind, size: bytes.length }
}

function mediaTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp'].includes(ext)) return UploadMediaType.IMAGE
  if (['.mp4', '.mov', '.webm', '.mkv', '.avi'].includes(ext)) return UploadMediaType.VIDEO
  return UploadMediaType.FILE
}

/** Encrypt and upload in-memory bytes, returning a sendmessage media item. */
export async function uploadOutboundBuffer(client, value, toUserId, {
  fileName = 'file.bin',
  mediaType = mediaTypeFor(fileName),
  fetchImpl = globalThis.fetch,
} = {}) {
  const plaintext = Buffer.isBuffer(value) ? value : Buffer.from(value || [])
  if (plaintext.length > MEDIA_MAX_BYTES) throw new Error('outbound buffer exceeds the 50 MB limit')
  if (typeof fetchImpl !== 'function') throw new Error('media upload fetch is unavailable')
  const key = crypto.randomBytes(16)
  const keyHex = key.toString('hex')
  const filekey = crypto.randomBytes(16).toString('hex')
  const prepared = await client.getUploadUrl({
    filekey,
    mediaType,
    toUserId,
    rawsize: plaintext.length,
    rawfilemd5: crypto.createHash('md5').update(plaintext).digest('hex'),
    filesize: encryptedSize(plaintext.length),
    aeskeyHex: keyHex,
  })
  if (!prepared.uploadFullUrl && !prepared.uploadParam) throw new Error('media upload URL is missing')
  const uploadUrl = prepared.uploadFullUrl
    || `${CDN_BASE_URL}/upload?encrypted_query_param=${encodeURIComponent(prepared.uploadParam)}&filekey=${encodeURIComponent(filekey)}`
  const ciphertext = new Uint8Array(encrypt(plaintext, key))
  let response
  let lastError
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await fetchImpl(uploadUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/octet-stream' },
        body: ciphertext,
        signal: AbortSignal.timeout(60_000),
      })
      if (response.ok || (response.status >= 400 && response.status < 500)) break
      lastError = new Error(`media upload failed: HTTP ${response.status}`)
    } catch (error) {
      lastError = error
    }
  }
  if (!response) throw lastError || new Error('media upload failed')
  if (!response.ok) throw new Error(`media upload failed: HTTP ${response.status}`)
  const query = response.headers.get('x-encrypted-param')
  if (!query) throw new Error('media upload response lacks x-encrypted-param')
  const media = {
    encrypt_query_param: query,
    aes_key: Buffer.from(keyHex, 'utf8').toString('base64'),
    encrypt_type: 1,
  }
  if (mediaType === UploadMediaType.IMAGE) {
    return { type: MessageItemType.IMAGE, image_item: { media, mid_size: encryptedSize(plaintext.length) } }
  }
  if (mediaType === UploadMediaType.VIDEO) {
    return { type: MessageItemType.VIDEO, video_item: { media, video_size: encryptedSize(plaintext.length) } }
  }
  return {
    type: MessageItemType.FILE,
    file_item: { media, file_name: safeName(path.basename(fileName)), len: String(plaintext.length) },
  }
}

/** Encrypt and upload one local file, returning a sendmessage item. */
export async function uploadOutboundFile(client, filePath, toUserId) {
  const info = await stat(filePath)
  if (!info.isFile()) throw new Error('outbound path is not a file')
  if (info.size > MEDIA_MAX_BYTES) throw new Error('outbound file exceeds the 50 MB limit')
  return uploadOutboundBuffer(client, await readFile(filePath), toUserId, {
    fileName: path.basename(filePath),
  })
}
