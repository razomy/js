import * as offset from '@razomy/offset';
import * as string from '@razomy/string';

export function tryRegex(ctx: string.WithString & offset.WithOffset, regex: RegExp) {
  regex.lastIndex = ctx.offset;
  const match = regex.exec(ctx.string);
  if (match) {
    ctx.offset += match[0].length;
    return true;
  }
  return false;
}
