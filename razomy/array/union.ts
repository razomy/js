/**
 * @summary Create an array of unique values, in order, from all given arrays.
 * @param {Array<Array<T>>} arrays The arrays to inspect.
 * @returns {Array<T>} The new array of combined values.
 * @example
 * ```ts
 * union([2], [1, 2]);
 * // => [2, 1]
 * ```
 * @example
 * ```ts
 * union(['a'], ['b'], ['a']);
 * // => ['a', 'b']
 * ```
 * @example
 * ```ts
 * union([1, 2], [2, 3]); // => [1, 2, 3]
 * ```
 */
export function union<T>(...arrays: T[][]): T[] {
  return Array.from(new Set(arrays.flat()));
}
