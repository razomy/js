import * as offset from '@razomy/offset';

export function setPrevOffset(ctx: offset.WithOffset & offset.WithPrevOffset, lexeme: offset.WithOffset) {
  lexeme.offset = ctx.prevOffset;
  ctx.prevOffset = ctx.offset;
  return lexeme;
}
