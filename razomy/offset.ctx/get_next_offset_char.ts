import {WithOffset} from 'razomy.offset';
import {WithString} from 'razomy.string';

export function getNextOffsetChar(ctx: WithString & WithOffset) {
  return ctx.string[ctx.offset + 1];
}
