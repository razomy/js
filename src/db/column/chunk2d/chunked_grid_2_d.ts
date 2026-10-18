import * as db from "@razomy/db";

export type Chunk = db.TypedArray;

export interface ChunkedGrid2D extends db.IColumn {
  chunkConfig: db.column.chunk2D.ChunkConfig2D;
  chunks: Map<number, Chunk>;
}
