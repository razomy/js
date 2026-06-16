import * as string from '@razomy/string';
import * as abstracts from "@razomy/abstracts";

export function isEnd(ctx: string.HasString & abstracts.arrays.HasOffset) {
  return ctx.offset === ctx.string.length;
}
