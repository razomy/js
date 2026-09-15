import type {EdgeId, FieldId, IColumn, NodeId, TypedArray, TypedArrayConstructor} from "../../type";
import type {ChunkConfig2D} from "./createChunkConfig";


export type Chunk = TypedArray;

export interface ChunkedGrid2D extends IColumn {
  chunkConfig: ChunkConfig2D;
  chunks: Map<number, Chunk>;
}

export function createChunkedGrid2D(
  id: FieldId,
  name: EdgeId,
  chunkConfig: ChunkConfig2D,
  factory: TypedArrayConstructor<TypedArray>,
): ChunkedGrid2D {
  return {
    id,
    name,
    factory,
    chunkConfig,
    chunks: new Map<number, Chunk>(),
    resize() {
    }, // Для 2D Map не требуется
    clearElement(entityId: NodeId) {
    },
    set(entityId: NodeId, v) {
    }
  } satisfies ChunkedGrid2D;
}

function getChunkKey(cx: number, cy: number): number {
  return ((cx & 0xFFFF) << 16) | (cy & 0xFFFF);
}

function createChunk(ctx: ChunkedGrid2D): TypedArray {
  // Физический размер массива = площадь * шаг (stride)
  const chunk = new ctx.factory(ctx.chunkConfig.area * ctx.chunkConfig.stride);
  chunk.fill(ctx.chunkConfig.defaultValue);
  return chunk;
}

// ============================================================================
// СВЕРХБЫСТРЫЕ ОПЕРАЦИИ ЧТЕНИЯ И ЗАПИСИ (O(1))
// ============================================================================

export function clearCell(ctx: ChunkedGrid2D, x: number, y: number): void {
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

export function get(ctx: ChunkedGrid2D, x: number, y: number): number | TypedArray {
  const cx = x >> ctx.chunkConfig.bits;
  const cy = y >> ctx.chunkConfig.bits;
  const key = getChunkKey(cx, cy);
  const chunk = ctx.chunks.get(key);

  if (!chunk) {
    if (ctx.chunkConfig.stride === 1) return ctx.chunkConfig.defaultValue;
    const temp = new ctx.factory(ctx.chunkConfig.stride);
    temp.fill(ctx.chunkConfig.defaultValue);
    return temp;
  }

  const localX = x & ctx.chunkConfig.mask;
  const localY = y & ctx.chunkConfig.mask;

  // localY сдвигается на биты X-координаты. Итоговый индекс домножается на stride.
  const localIdx = ((localY << ctx.chunkConfig.bits) | localX) * ctx.chunkConfig.stride;

  if (ctx.chunkConfig.stride === 1) {
    return chunk[localIdx];
  }
  return chunk.subarray(localIdx, localIdx + ctx.chunkConfig.stride);
}

export function set(ctx: ChunkedGrid2D, x: number, y: number, value: number | ArrayLike<number>): void {
  const cx = x >> ctx.chunkConfig.bits;
  const cy = y >> ctx.chunkConfig.bits;
  const key = getChunkKey(cx, cy);

  let chunk = ctx.chunks.get(key);
  if (!chunk) {
    chunk = createChunk(ctx);
    ctx.chunks.set(key, chunk);
  }

  const localX = x & ctx.chunkConfig.mask;
  const localY = y & ctx.chunkConfig.mask;

  const localIdx = ((localY << ctx.chunkConfig.bits) | localX) * ctx.chunkConfig.stride;

  if (ctx.chunkConfig.stride === 1) {
    chunk[localIdx] = value as number;
  } else {
    chunk.set(value as ArrayLike<number>, localIdx);
  }
}

// ============================================================================
// ИТЕРАТОР ДЛЯ СИСТЕМ (ДЛЯ МАССОВОЙ ОБРАБОТКИ)
// ============================================================================

export function forEachChunk(
  ctx: ChunkedGrid2D,
  callback: (chunk: Chunk, offsetX: number, offsetY: number) => void
): void {
  ctx.chunks.forEach((chunk, key) => {
    // Распаковываем с сохранением знака (arithmetic shift)
    const cx = key >> 16;
    const cy = (key << 16) >> 16;

    const offsetX = cx << ctx.chunkConfig.bits;
    const offsetY = cy << ctx.chunkConfig.bits;

    callback(chunk, offsetX, offsetY);
  });
}
