import type {Codec} from '@razomy/codec';
import {toBuffer} from '@razomy/string';
import {toString_} from '../buffer/to_string';

export function toCodec(encoding: BufferEncoding): Codec<Buffer, string> {
  return {
    encode: (b) => toString_(b, encoding),
    decode: (s) => toBuffer(s, encoding)
  }
}


