import type {TypedArray, TypedArrayConstructor} from "../../type";
import type {ChunkConfig} from "./create_chunk_config";
import {clearElement} from "./clear_element";
import {set} from "./set";
import * as db from "@razomy/db";

export type Chunk = TypedArray | undefined;

export interface ChunkedColumn extends db.IColumn {
  chunkConfig: ChunkConfig;
  chunks: Chunk[];
}


export function createChunkedColumn(id: db.FieldId, name: db.EdgeId, chunkConfig: ChunkConfig, factory: TypedArrayConstructor<db.TypedArray>): ChunkedColumn {
  return {
    id,
    name,
    chunks: [],
    factory,
    chunkConfig,
    // Чанки растут автоматически при обращении, resize не требует действий
    resize() {
    },
    clearElement(entityId: db.NodeId) {
      clearElement(this, entityId);
    },
    set(entityId: db.NodeId, v) {
      set(this, entityId, v);
    }
  } satisfies ChunkedColumn;
}
