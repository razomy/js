import {ICodec} from 'razomy.js/codec/i-codec';

export function string_to_buffer(base64: string, encoding: BufferEncoding): Buffer {
  return Buffer.from(base64, encoding)
}

export function buffer_to_string(buffer: Buffer, encoding: BufferEncoding): string {
  return buffer.toString(encoding)
}

export function create_buffer_to_string_codec(encoding: BufferEncoding): ICodec<Buffer,string> {
  return {
    encode: (b) => buffer_to_string(b, encoding),
    decode: (s) => string_to_buffer(s, encoding)
  }
}
