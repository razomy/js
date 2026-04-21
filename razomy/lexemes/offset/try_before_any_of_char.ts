import * as string from '@razomy/string';
import * as abstracts from "@razomy/abstracts";

export function tryBeforeAnyOfChar(ctx: string.WithString & abstracts.arrays.WithOffset, chars: Set<string>) {
  const match = string.stringsAnyIndex(ctx.string, chars, ctx.offset);
  if (match - ctx.offset > 0) {
    ctx.offset = match;
    return true;
  }
  return false;
}
