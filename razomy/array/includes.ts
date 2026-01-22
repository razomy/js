/**
 * Checks if value is in array.
 * @param {T[]} array The array to query.
 * @param {T} value The value to search for.
 * @param {number} [fromIndex] The index to search from.
 * @returns {boolean} True if value is found, else false.
 * @example
 * // => true
 * includes([1, 2, 3], 1);
 * @example
 * // => false
 * includes([1, 2, 3], 4);
 * @example
 * // => true
 * includes(['a', 'b', 'c'], 'c', 1);
 */
export function includes<T>(array: T[], value: T, fromIndex?: number): boolean {
  return array.includes(value, fromIndex);
}