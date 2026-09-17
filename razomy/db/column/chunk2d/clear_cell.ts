import * as db from "@razomy/db";

function getChunkKey(cx: number, cy: number): number {
  return ((cx & 0xFFFF) << 16) | (cy & 0xFFFF);
}

export function clearCell(ctx: db.column.chunk2D.ChunkedGrid2D, x: number, y: number): void {
    const cx = x >> ctx.chunkConfig.bits;
    const cy = y >> ctx.chunkConfig.bits;
    const key = getChunkKey(cx, cy);
    const chunk = ctx.chunks.get(key);
    if (!chunk) return;
    const localX = x & ctx.chunkConfig.mask;
    const localY = y & ctx.chunkConfig.mask;
    const localIdx = ((localY << ctx.chunkConfig.bits) | localX) * ctx.chunkConfig.stride;
    chunk.fill(ctx.chunkConfig.defaultValue, localIdx, localIdx + ctx.chunkConfig.stride);
}
