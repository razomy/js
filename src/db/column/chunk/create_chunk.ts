import * as db from "@razomy/db";

export function createChunk(ctx: db.column.chunk.ChunkedColumn) {
  // Выделяем память с учетом шага (stride)
  const chunk = new ctx.factory((1 << ctx.chunkConfig.bits) * ctx.chunkConfig.stride);
  chunk.fill(ctx.chunkConfig.defaultValue);
  return chunk;
}
