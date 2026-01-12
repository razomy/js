import {ICodec} from 'razomy/codec/i_codec';
import string_to_buffer from 'razomy/buffer/buffer_to_string_64';
import buffer_to_string from 'razomy/buffer/buffer_to_string';

function to_codec(encoding: BufferEncoding): ICodec<Buffer, string> {
  return {
    encode: (b) => buffer_to_string(b, encoding),
    decode: (s) => string_to_buffer(s, encoding)
  }
}

export default to_codec;
