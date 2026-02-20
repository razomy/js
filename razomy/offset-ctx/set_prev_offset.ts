import type {WithOffset, WithPrevOffset} from '@razomy/offset';

export function setPrevOffset(ctx: WithOffset & WithPrevOffset, lexeme: WithOffset) {
  lexeme.offset = ctx.prevOffset;
  ctx.prevOffset = ctx.offset;
  return lexeme;
}
