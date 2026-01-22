/**
 * Creates a duplicate-free version of an array.
 * @param {readonly T[]} array The array to inspect.
 * @returns {T[]} The new duplicate-free array.
 * @example
 * // => [1, 2]
 * getUniq([1, 2, 1]);
 * @example
 * // => ['a', 'b']
 * getUniq(['a', 'b', 'a']);
 * @example
 * // => [1, '1']
 * getUniq([1, '1', 1]);
 */
export function getUniq<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array));
}