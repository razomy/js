import * as string from '@razomy/string';
import * as abstracts from "@razomy/abstracts";

export function getPrevOffsetChar(ctx: string.HasString & abstracts.arrays.HasOffset) {
  return ctx.string[ctx.offset - 1];
}
