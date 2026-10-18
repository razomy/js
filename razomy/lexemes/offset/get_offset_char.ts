import * as string from '@razomy/string';
import * as abstractions from "@razomy/abstractions";

export function getOffsetChar(ctx: string.HasString & abstractions.array.HasOffset) {
  return ctx.string[ctx.offset];
}
