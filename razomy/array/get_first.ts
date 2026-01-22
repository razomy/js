/**
 * Get the first element of an array.
 * @param array The array to get the first element from.
 * @returns The first element.
 * @throws {Error} If the array is empty.
 * @example
 * // => 1
 * getFirst([1, 2, 3]);
 * @example
 * // => 'a'
 * getFirst(['a', 'b', 'c']);
 * @example
 * // => Error: Array is empty
 * getFirst([]);
 */
export function getFirst<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error('Array is empty');
  }

  return array[0];
}