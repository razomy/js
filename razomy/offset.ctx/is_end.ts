import {WithOffset} from '@razomy/offset';
import {WithString} from '@razomy/string';

export function isEnd(ctx: WithString & WithOffset) {
  return ctx.offset === ctx.string.length;
}