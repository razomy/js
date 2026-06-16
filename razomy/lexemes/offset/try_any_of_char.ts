import * as string from '@razomy/string';
import * as abstracts from "@razomy/abstracts";
import * as lexemes from "@razomy/lexemes";

export function tryAnyOfChar(ctx: string.HasString & abstracts.arrays.HasOffset, chars: Set<string>) {
  if (chars.has(lexemes.offset.getOffsetChar(ctx))) {
    ctx.offset += 1;
    return true;
  }
  return false;
}
