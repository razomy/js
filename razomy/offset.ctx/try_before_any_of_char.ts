import {stringsAnyIndex} from 'razomy.index';
import {WithOffset} from 'razomy.offset';
import {WithString} from 'razomy.string';

export function tryBeforeAnyOfChar(ctx: WithString & WithOffset, chars: Set<string>) {
  const match = stringsAnyIndex(ctx.string, chars, ctx.offset);
  if (match - ctx.offset > 0) {
    ctx.offset = match;
    return true;
  }
  return false;
}