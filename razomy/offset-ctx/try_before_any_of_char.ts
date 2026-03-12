import * as index from "@razomy/index";
import * as offset from "@razomy/offset";
import * as string from "@razomy/string";

export function tryBeforeAnyOfChar(ctx: string.WithString & offset.WithOffset, chars: Set<string>) {
  const match = index.stringsAnyIndex(ctx.string, chars, ctx.offset);
  if (match - ctx.offset > 0) {
    ctx.offset = match;
    return true;
  }
  return false;
}
