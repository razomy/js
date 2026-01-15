import {Codec} from '../../codec/codec';
import {to_buffer} from '../../string/to_buffer';
import {to_string} from '../to_string';

export function to_codec(encoding: BufferEncoding): Codec<Buffer, string> {
  return {
    encode: (b) => to_string(b, encoding),
    decode: (s) => to_buffer(s, encoding)
  }
}


