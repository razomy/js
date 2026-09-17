import * as db from "@razomy/db";

export function clearElement(ctx: db.column.chunk.ChunkedColumn, entityId: db.NodeId) {
    const index = entityId & 0xFFFFF;
    const chunkIdx = index >> ctx.chunkConfig.bits;
    const chunk = ctx.chunks[chunkIdx];
    if (!chunk) return;
    const localIdx = (index & ctx.chunkConfig.mask) * ctx.chunkConfig.stride;
    chunk.fill(ctx.chunkConfig.defaultValue, localIdx, localIdx + ctx.chunkConfig.stride);
}
