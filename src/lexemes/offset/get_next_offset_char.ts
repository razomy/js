import * as string from '@razomy/string';
import * as abstractions from "@razomy/abstractions";

export function getNextOffsetChar(ctx: string.HasString & abstractions.array.HasOffset) {
  return ctx.string[ctx.offset + 1];
}
