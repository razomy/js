/**
 * Creates a slice of array with n elements dropped from the beginning.
 * @param {T[]} array The source array.
 * @param {number} count The number of elements to drop.
 * @returns {T[]} Returns the new array.
 * @example
 * // => [2, 3]
 * drop([1, 2, 3], 1);
 * @example
 * // => [3]
 * drop([1, 2, 3], 2);
 * @example
 * // => []
 * drop([1, 2, 3], 5);
 */
export function drop<T>(array: T[], count: number): T[] {
  return array.slice(count);
}