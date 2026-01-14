import {ICodec} from '../../codec/i_codec';
import to_buffer from '../../string/to_buffer';
import to_string from '../to_string';

export function to_codec(encoding: BufferEncoding): ICodec<Buffer, string> {
  return {
    encode: (b) => to_string(b, encoding),
    decode: (s) => to_buffer(s, encoding)
  }
}

export default to_codec;
