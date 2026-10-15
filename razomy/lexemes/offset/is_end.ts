import * as string from '@razomy/string';
import * as abstractions from "@razomy/abstractions";

export function isEnd(ctx: string.HasString & abstractions.arrays.HasOffset) {
  return ctx.offset === ctx.string.length;
}
