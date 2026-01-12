export default function buffer_to_string(buffer: Buffer, encoding: BufferEncoding): string {
  return buffer.toString(encoding)
}