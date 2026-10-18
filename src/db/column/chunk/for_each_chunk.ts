import * as db from "@razomy/db";

export function forEachChunk(ctx: db.column.chunk.ChunkedColumn, callback: (chunk: db.column.chunk.Chunk, offset: number) => void) {
    for (let i = 0; i < ctx.chunks.length; i++) {
    const chunk = ctx.chunks[i];
    if (chunk) {
      callback(chunk, i << ctx.chunkConfig.bits);
    }
    }
}
