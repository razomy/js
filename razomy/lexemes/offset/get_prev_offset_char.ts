import * as string from '@razomy/string';
import * as abstractions from "@razomy/abstractions";

export function getPrevOffsetChar(ctx: string.HasString & abstractions.arrays.HasOffset) {
  return ctx.string[ctx.offset - 1];
}
