import * as string from '@razomy/string';
import * as abstracts from "@razomy/abstracts";

export function getNextOffsetChar(ctx: string.WithString & abstracts.arrays.WithOffset) {
  return ctx.string[ctx.offset + 1];
}
