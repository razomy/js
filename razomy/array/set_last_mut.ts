/**
 * Sets the value of the last element of an array mutably, with an optional offset.
 * @param {T[]} array The array to mutate.
 * @param {T} value The value to assign.
 * @param {number} [offset=0] The offset from the last index.
 * @returns {T[]} The mutated array.
 * @example
 * // => [1, 2, 4]
 * setLastMut([1, 2, 3], 4);
 * @example
 * // => ['a', 'c']
 * setLastMut(['a', 'b'], 'c');
 * @example
 * // => [1, 5, 3]
 * setLastMut([1, 2, 3], 5, -1);
 */
export function setLastMut<T>(array: T[], value: T, offset: number = 0): T[] {
  array[array.length - 1 + offset] = value;
  return array;
}