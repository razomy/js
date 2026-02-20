import {stringsAnyIndex} from '@razomy/index';
import type {WithOffset} from '@razomy/offset';
import type {WithString} from '@razomy/string';

export function tryBeforeAnyOfChar(ctx: WithString & WithOffset, chars: Set<string>) {
  const match = stringsAnyIndex(ctx.string, chars, ctx.offset);
  if (match - ctx.offset > 0) {
    ctx.offset = match;
    return true;
  }
  return false;
}