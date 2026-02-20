import type {WithOffset} from '@razomy/offset';
import type {WithString} from '@razomy/string';

export function isEnd(ctx: WithString & WithOffset) {
  return ctx.offset === ctx.string.length;
}