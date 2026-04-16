import * as string from '@razomy/string';
import * as abstracts from "@razomy/abstracts";

export function tryRegex(ctx: string.WithString & abstracts.arrays.WithOffset, regex: RegExp) {
  regex.lastIndex = ctx.offset;
  const match = regex.exec(ctx.string);
  if (match) {
    ctx.offset += match[0].length;
    return true;
  }
  return false;
}
