export function to_buffer(base_64: string, encoding: BufferEncoding): Buffer {
  return Buffer.from(base_64, encoding)
}

