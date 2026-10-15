import * as string from '@razomy/string';
import * as abstractions from "@razomy/abstractions";

export function getOffsetChar(ctx: string.HasString & abstractions.arrays.HasOffset) {
  return ctx.string[ctx.offset];
}
