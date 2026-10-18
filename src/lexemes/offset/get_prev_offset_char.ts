import * as string from '@razomy/string';
import * as abstractions from "@razomy/abstractions";

export function getPrevOffsetChar(ctx: string.HasString & abstractions.array.HasOffset) {
  return ctx.string[ctx.offset - 1];
}
