import {WithOffset} from '@razomy/offset';
import {WithString} from '@razomy/string';

export function tryRegex(ctx: WithString & WithOffset, regex: RegExp) {
  regex.lastIndex = ctx.offset;
  const match = regex.exec(ctx.string);
  if (match) {
    ctx.offset += match[0].length;
    return true;
  }
  return false;
}
