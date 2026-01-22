/**
 * Reverses an array in place.
 * @param {T[]} array The array to reverse.
 * @returns {T[]} The reversed array.
 * @example
 * const array = [1, 2, 3];
 * // => [3, 2, 1]
 * reverseMut(array);
 * @example
 * const array = ['a', 'b'];
 * reverseMut(array);
 * // => ['b', 'a']
 * array;
 * @example
 * // => []
 * reverseMut([]);
 */
export function reverseMut<T>(array: T[]): T[] {
  return array.reverse();
}