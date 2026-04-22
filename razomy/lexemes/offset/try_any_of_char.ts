import * as string from '@razomy/string';
import * as lexemesOffset from '@razomy/lexemes/offset';
import * as abstracts from "@razomy/abstracts";

export function tryAnyOfChar(ctx: string.WithString & abstracts.arrays.WithOffset, chars: Set<string>) {
  if (chars.has(lexemesOffset.getOffsetChar(ctx))) {
    ctx.offset += 1;
    return true;
  }
  return false;
}
