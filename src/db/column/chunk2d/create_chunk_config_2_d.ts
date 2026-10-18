
// ============================================================================
// НАСТРОЙКИ 2D ЧАНКОВ И БИТОВАЯ МАГИЯ
// ============================================================================

export interface ChunkConfig2D {
  bits: number;         // Сдвиг (например, 5)
  size: number;         // Размер стороны (2^5 = 32)
  mask: number;         // Маска для остатка (32 - 1 = 31)
  area: number;         // Общее кол-во ячеек в чанке (32 * 32 = 1024)
  defaultValue: number; // Дефолтное значение для пустоты
  stride: number;
}

export function createChunkConfig2D(bits = 5, defaultValue: number = 0): ChunkConfig2D {
  const size = 1 << bits; // Сторона чанка (например, 32)
  return {
    bits,
    size,
    mask: size - 1,
    area: size * size,    // Выделяем память под 2D плоскость в 1D массиве
    defaultValue,
    stride: 1
  } satisfies ChunkConfig2D;
}
