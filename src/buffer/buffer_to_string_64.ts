export default function string_to_buffer(base64: string, encoding: BufferEncoding): Buffer {
  return Buffer.from(base64, encoding)
}

