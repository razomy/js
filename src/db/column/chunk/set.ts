import * as db from "@razomy/db";

export function set(ctx: db.column.chunk.ChunkedColumn, entityId: db.NodeId, value: number | ArrayLike<number>) {
    const index = entityId & 0xFFFFF;
    const chunkIdx = index >> ctx.chunkConfig.bits;
    let chunk = ctx.chunks[chunkIdx];
    if (!chunk) {
    chunk = db.column.chunk.createChunk(ctx);
    ctx.chunks[chunkIdx] = chunk;
    }

    const localIdx = (index & ctx.chunkConfig.mask) * ctx.chunkConfig.stride;
    if (ctx.chunkConfig.stride === 1) {
    chunk[localIdx] = value as number;
    } else {
    chunk.set(value as ArrayLike<number>, localIdx);
    }
}
