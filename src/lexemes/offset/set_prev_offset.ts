import * as abstractions from "@razomy/abstractions";

export function setPrevOffset(ctx: abstractions.array.HasOffset & abstractions.array.HasPrevOffset, lexeme: abstractions.array.HasOffset) {
  lexeme.offset = ctx.prevOffset;
  ctx.prevOffset = ctx.offset;
  return lexeme;
}
