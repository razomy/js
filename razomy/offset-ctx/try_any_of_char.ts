import {WithOffset} from '@razomy/offset';
import {WithString} from '@razomy/string';
import {getOffsetChar} from '@razomy/offset-ctx';

export function tryAnyOfChar(ctx: WithString & WithOffset, chars: Set<string>) {
  if (chars.has(getOffsetChar(ctx))) {
    ctx.offset += 1;
    return true;
  }
  return false;
}
