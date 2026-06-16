import * as abstracts from "@razomy/abstracts";

export function setPrevOffset(ctx: abstracts.arrays.HasOffset & abstracts.arrays.HasPrevOffset, lexeme: abstracts.arrays.HasOffset) {
  lexeme.offset = ctx.prevOffset;
  ctx.prevOffset = ctx.offset;
  return lexeme;
}
