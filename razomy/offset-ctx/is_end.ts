import * as string from '@razomy/string';
import * as abstracts from "@razomy/abstracts";

export function isEnd(ctx: string.WithString & abstracts.arrays.WithOffset) {
  return ctx.offset === ctx.string.length;
}
