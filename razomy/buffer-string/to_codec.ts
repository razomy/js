import { toString_ } from '../buffer/to_string';
import * as abstracts from "@razomy/abstracts";
import * as string from "@razomy/string";

export function toCodec(encoding: BufferEncoding): abstracts.patterns.Codec<Buffer, string> {
  return {
    encode: (b) => toString_(b, encoding),
    decode: (s) => string.toBuffer(s, encoding),
  };
}
