import * as string from '@razomy/string';
import * as abstractions from "@razomy/abstractions";

export function tryBeforeAnyOfChar(ctx: string.HasString & abstractions.array.HasOffset, chars: Set<string>) {
  const match = string.stringsAnyIndex(ctx.string, chars, ctx.offset);
  if (match - ctx.offset > 0) {
    ctx.offset = match;
    return true;
  }
  return false;
}
