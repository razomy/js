import type { TypedArray, TypedArrayConstructor } from '@razomy/db';
import * as db from '@razomy/db';
import type { ChunkConfig } from './create_chunk_config';
import { clearElement } from './clear_element';
import { set } from './set';

export type Chunk = TypedArray | undefined;

export interface ChunkedColumn extends db.IColumn {
  chunkConfig: ChunkConfig;
  chunks: Chunk[];
}

export class ChunkedColumn implements ChunkedColumn {
  constructor(
    public id: db.FieldId,
    public name: db.EdgeId,
    public chunkConfig: ChunkConfig,
    public factory: TypedArrayConstructor<db.TypedArray>,
  ) {}
  // Чанки растут автоматически при обращении, resize не требует действий
  resize() {}
  clearElement(entityId: db.NodeId) {
    clearElement(this, entityId);
  }
  set(entityId: db.NodeId, v) {
    set(this, entityId, v);
  }
}

export function createChunkedColumn(
  id: db.FieldId,
  name: db.EdgeId,
  chunkConfig: ChunkConfig,
  factory: TypedArrayConstructor<db.TypedArray>,
): ChunkedColumn {
  return new ChunkedColumn(id, name, chunkConfig, factory);
}
