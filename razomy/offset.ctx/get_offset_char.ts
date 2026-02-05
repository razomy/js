import {WithOffset} from '@razomy/offset';
import {WithString} from '@razomy/string';

export function getOffsetChar(ctx: WithString & WithOffset) {
  return ctx.string[ctx.offset];
}
