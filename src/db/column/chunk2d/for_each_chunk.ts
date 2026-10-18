import * as db from "@razomy/db";

export function forEachChunk(ctx: db.column.chunk2D.ChunkedGrid2D, callback: (chunk: db.column.chunk2D.Chunk, offsetX: number, offsetY: number) => void): void {
    ctx.chunks.forEach((chunk, key) => {
    // Распаковываем с сохранением знака (arithmetic shift)
    const cx = key >> 16;
    const cy = (key << 16) >> 16;

    const offsetX = cx << ctx.chunkConfig.bits;
    const offsetY = cy << ctx.chunkConfig.bits;

    callback(chunk, offsetX, offsetY);
    });
}
