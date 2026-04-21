import * as abstracts from '@razomy/abstracts';
import * as string from '@razomy/string';
import * as buffer from '@razomy/buffer';

export function toCodec(encoding: BufferEncoding): abstracts.patterns.Codec<Buffer, string> {
  return {
    encode: (b) => buffer.toString_(b, encoding),
    decode: (s) => string.toBuffer(s, encoding),
  };
}
