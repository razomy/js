import {WithOffset} from '@razomy/offset';
import {WithString} from '@razomy/string';

export function getPrevOffsetChar(ctx: WithString & WithOffset) {
  return ctx.string[ctx.offset - 1];
}