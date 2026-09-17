export interface ChunkConfig {
  bits: number,
  size: number,
  mask: number,
  defaultValue: number,
  stride: number;
}

export function createChunkConfig(bits = 32, defaultValue: number = 0,) {
  const size = 1 << bits; // 1024
  return {
    bits,
    size,
    defaultValue,
    mask: size - 1,  // 1023,
    stride: 1
  } satisfies ChunkConfig
}
