export function toBuffer(base64: string, encoding: BufferEncoding): Buffer {
  return Buffer.from(base64, encoding)
}

