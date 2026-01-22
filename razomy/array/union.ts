/**
 * Create an array of unique values, in order, from all given arrays.
 * @param {Array<Array<T>>} arrays The arrays to inspect.
 * @returns {Array<T>} The new array of combined values.
 * @example
 * // => [2, 1]
 * union([2], [1, 2]);
 * @example
 * // => ['a', 'b']
 * union(['a'], ['b'], ['a']);
 * @example
 * // => [1, 2, 3]
 * union([1, 2], [2, 3]);
 */
export function union<T>(...arrays: T[][]): T[] {
  return Array.from(new Set(arrays.flat()));
}