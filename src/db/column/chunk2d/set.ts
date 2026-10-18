import * as db from "@razomy/db";

export function set(ctx: db.column.chunk2D.ChunkedGrid2D, x: number, y: number, value: number | ArrayLike<number>): void {
    const cx = x >> ctx.chunkConfig.bits;
    const cy = y >> ctx.chunkConfig.bits;
    const key = db.column.chunk2D.getChunkKey(cx, cy);
    let chunk = ctx.chunks.get(key);
    if (!chunk) {
    chunk = db.column.chunk2D.createChunk(ctx);
    ctx.chunks.set(key, chunk);
    }

    const localX = x & ctx.chunkConfig.mask;
    const localY = y & ctx.chunkConfig.mask;
    const localIdx = ((localY << ctx.chunkConfig.bits) | localX) * ctx.chunkConfig.stride;
    if (ctx.chunkConfig.stride === 1) {
    chunk[localIdx] = value as number;
    } else {
    chunk.set(value as ArrayLike<number>, localIdx);
    }
}
