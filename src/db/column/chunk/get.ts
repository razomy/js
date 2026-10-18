import * as db from "@razomy/db";

export function get(ctx: db.column.chunk.ChunkedColumn, entityId: db.NodeId): number | db.TypedArray {
    const index = entityId & 0xFFFFF;
    const chunkIdx = index >> ctx.chunkConfig.bits;
    const chunk = ctx.chunks[chunkIdx];
    if (!chunk) {
    if (ctx.chunkConfig.stride === 1) return ctx.chunkConfig.defaultValue;
    const temp = new ctx.factory(ctx.chunkConfig.stride);
    temp.fill(ctx.chunkConfig.defaultValue);
    return temp;
    }

    const localIdx = (index & ctx.chunkConfig.mask) * ctx.chunkConfig.stride;
    if (ctx.chunkConfig.stride === 1) {
    return chunk[localIdx];
    }

    return chunk.subarray(localIdx, localIdx + ctx.chunkConfig.stride);
}
