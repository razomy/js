import * as db from "@razomy/db";

export function createChunkedGrid2D(id: db.FieldId, name: db.EdgeId, chunkConfig: db.column.chunk2D.ChunkConfig2D, factory: db.TypedArrayConstructor<db.TypedArray>): db.column.chunk2D.ChunkedGrid2D {
    return {
    id,
    name,
    factory,
    chunkConfig,
    chunks: new Map<number, db.column.chunk2D.Chunk>(),
    resize() {
    }, // Для 2D Map не требуется
    clearElement() {
    },
    set() {
    }
    } satisfies db.column.chunk2D.ChunkedGrid2D;
}
