import * as db from "@razomy/db";

function getChunkKey(cx: number, cy: number): number {
  return ((cx & 0xFFFF) << 16) | (cy & 0xFFFF);
}

export function get(ctx: db.column.chunk2D.ChunkedGrid2D, x: number, y: number): number | db.TypedArray {
    const cx = x >> ctx.chunkConfig.bits;
    const cy = y >> ctx.chunkConfig.bits;
    const key = getChunkKey(cx, cy);
    const chunk = ctx.chunks.get(key);
    if (!chunk) {
    if (ctx.chunkConfig.stride === 1) return ctx.chunkConfig.defaultValue;
    const temp = new ctx.factory(ctx.chunkConfig.stride);
    temp.fill(ctx.chunkConfig.defaultValue);
    return temp;
    }

    const localX = x & ctx.chunkConfig.mask;
    const localY = y & ctx.chunkConfig.mask;
    const localIdx = ((localY << ctx.chunkConfig.bits) | localX) * ctx.chunkConfig.stride;
    if (ctx.chunkConfig.stride === 1) {
    return chunk[localIdx];
    }

    return chunk.subarray(localIdx, localIdx + ctx.chunkConfig.stride);
}
