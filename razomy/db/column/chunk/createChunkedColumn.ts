import type {EdgeId, FieldId, IColumn, NodeId, TypedArray, TypedArrayConstructor} from "../../type";
import type {ChunkConfig} from "./createChunkConfig";

export type Chunk = TypedArray | undefined;

export interface CreateChunkedColumn extends IColumn {
  chunkConfig: ChunkConfig;
  chunks: Chunk[];
}

export function createChunkedColumn(
  id: FieldId,
  name: EdgeId,
  chunkConfig: ChunkConfig,
  factory: TypedArrayConstructor<TypedArray>,
): CreateChunkedColumn {
  return {
    id,
    name,
    chunks: [],
    factory,
    chunkConfig,
    // Чанки растут автоматически при обращении, resize не требует действий
    resize() {},
    clearElement(entityId: NodeId) {
      clearElement(this, entityId);
    },
    set(entityId: NodeId, v) {
      set(this, entityId, v);
    }
  } satisfies CreateChunkedColumn;
}

function createChunk(ctx: CreateChunkedColumn) {
  // Выделяем память с учетом шага (stride)
  const chunk = new ctx.factory((1 << ctx.chunkConfig.bits) * ctx.chunkConfig.stride);
  chunk.fill(ctx.chunkConfig.defaultValue);
  return chunk;
}

export function clearElement(ctx: CreateChunkedColumn, entityId: NodeId) {
  const index = entityId & 0xFFFFF;
  const chunkIdx = index >> ctx.chunkConfig.bits;
  const chunk = ctx.chunks[chunkIdx];

  if (!chunk) return; // Если чанка нет, данные и так дефолтные

  const localIdx = (index & ctx.chunkConfig.mask) * ctx.chunkConfig.stride;
  chunk.fill(ctx.chunkConfig.defaultValue, localIdx, localIdx + ctx.chunkConfig.stride);
}

export function get(ctx: CreateChunkedColumn, entityId: NodeId): number | TypedArray {
  const index = entityId & 0xFFFFF;
  const chunkIdx = index >> ctx.chunkConfig.bits;
  const chunk = ctx.chunks[chunkIdx];

  // Если чанка нет, можно было бы вернуть defaultValue.
  // Но для stride > 1 лучше вернуть временный массив, заполненный дефолтами
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

export function set(ctx: CreateChunkedColumn, entityId: NodeId, value: number | ArrayLike<number>) {
  const index = entityId & 0xFFFFF;
  const chunkIdx = index >> ctx.chunkConfig.bits;

  let chunk = ctx.chunks[chunkIdx];
  if (!chunk) {
    chunk = createChunk(ctx);
    ctx.chunks[chunkIdx] = chunk;
  }

  const localIdx = (index & ctx.chunkConfig.mask) * ctx.chunkConfig.stride;

  if (ctx.chunkConfig.stride === 1) {
    chunk[localIdx] = value as number;
  } else {
    chunk.set(value as ArrayLike<number>, localIdx);
  }
}

export function forEachChunk(ctx: CreateChunkedColumn, callback: (chunk: Chunk, offset: number) => void) {
  for (let i = 0; i < ctx.chunks.length; i++) {
    const chunk = ctx.chunks[i];
    if (chunk) {
      callback(chunk, i << ctx.chunkConfig.bits);
    }
  }
}
