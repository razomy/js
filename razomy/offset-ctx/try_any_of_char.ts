import * as string from '@razomy/string';
import * as offsetCtx from '@razomy/offset-ctx';
import * as abstracts from "@razomy/abstracts";

export function tryAnyOfChar(ctx: string.WithString & abstracts.arrays.WithOffset, chars: Set<string>) {
  if (chars.has(offsetCtx.getOffsetChar(ctx))) {
    ctx.offset += 1;
    return true;
  }
  return false;
}
