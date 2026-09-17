import * as db from "@razomy/db";

export function createChunk(ctx: db.column.chunk2D.ChunkedGrid2D): db.TypedArray {
  // Физический размер массива = площадь * шаг (stride)
  const chunk = new ctx.factory(ctx.chunkConfig.area * ctx.chunkConfig.stride);
  chunk.fill(ctx.chunkConfig.defaultValue);
  return chunk;
}
