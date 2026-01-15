export function flat<T>(array: T[][]): T[] {
  return array.flat(1)
}
