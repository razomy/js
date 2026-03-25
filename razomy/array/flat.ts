/**
 * @summary Flattens an array of nested arrays by one level.
 * @description Flattens an array of nested arrays by one level.
 * @param array The array to flatten.
 * @returns The flattened array.
 * @example
 * ```ts
 * flat([[1, 2], [3, 4]]); // => [1, 2, 3, 4]
 * ```
 * @example
 * ```ts
 * flat([1, 2, [3, [4]]]); // => [1, 2, 3, [4]]
 * ```
 * @example
 * ```ts
 * flat([['a'], 'b']); // => ['a', 'b']
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function flat<T>(array: readonly (T | readonly T[])[]): T[] {
  return array.flat(1) as T[];
}
