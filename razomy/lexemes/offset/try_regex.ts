import * as string from '@razomy/string';
import * as abstractions from "@razomy/abstractions";

export function tryRegex(ctx: string.HasString & abstractions.arrays.HasOffset, regex: RegExp) {
  regex.lastIndex = ctx.offset;
  const match = regex.exec(ctx.string);
  if (match) {
    ctx.offset += match[0].length;
    return true;
  }
  return false;
}
