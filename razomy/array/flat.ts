/**
 * Flattens an array of nested arrays by one level.
 * @param array The array to flatten.
 * @returns The flattened array.
 * @example
 * // => [1, 2, 3, 4]
 * flat([[1, 2], [3, 4]]);
 * @example
 * // => [1, 2, 3, [4]]
 * flat([1, 2, [3, [4]]]);
 * @example
 * // => ['a', 'b']
 * flat([['a'], 'b']);
 */
export function flat<T>(array: readonly (T | readonly T[])[]): T[] {
  return array.flat(1) as T[];
}