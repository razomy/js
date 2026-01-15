import {Codec} from 'razomy.codec';
import {to_buffer} from 'razomy.string/to_buffer';
import {to_string} from '../to_string';

export function to_codec(encoding: BufferEncoding): Codec<Buffer, string> {
  return {
    encode: (b) => to_string(b, encoding),
    decode: (s) => to_buffer(s, encoding)
  }
}


