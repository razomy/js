export function string_to_buffer(base64: string, encoding: BufferEncoding): Buffer {
  return Buffer.from(base64, encoding)
}

export function buffer_to_string(buffer: Buffer, encoding: BufferEncoding): string {
  return buffer.toString(encoding)
}

