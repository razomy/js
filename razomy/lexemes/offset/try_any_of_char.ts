import * as string from '@razomy/string';
import * as abstractions from "@razomy/abstractions";
import * as lexemes from "@razomy/lexemes";

export function tryAnyOfChar(ctx: string.HasString & abstractions.arrays.HasOffset, chars: Set<string>) {
  if (chars.has(lexemes.offset.getOffsetChar(ctx))) {
    ctx.offset += 1;
    return true;
  }
  return false;
}
