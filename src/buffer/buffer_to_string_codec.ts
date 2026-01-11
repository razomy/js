import {ICodec} from 'razomy/codec/i_codec';
import {buffer_to_string, string_to_buffer} from 'razomy/buffer/buffer_string';

export function buffer_to_string_codec(encoding: BufferEncoding): ICodec<Buffer, string> {
  return {
    encode: (b) => buffer_to_string(b, encoding),
    decode: (s) => string_to_buffer(s, encoding)
  }
}