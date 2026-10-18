export function getChunkKey(cx: number, cy: number): number {
  return ((cx & 0xFFFF) << 16) | (cy & 0xFFFF);
}
