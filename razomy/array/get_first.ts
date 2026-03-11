/**
 * @summary Get the first element of an array.
 * @param array The array to get the first element from.
 * @returns The first element.
 * @throws {Error} If the array is empty.
 * @example
 * ```ts
 * getFirst([1, 2, 3]); // => 1
 * ```
 * @example
 * ```ts
 * getFirst(['a', 'b', 'c']); // => 'a'
 * ```
 * @example
 * ```ts
 * getFirst([]); // => Error: Array is empty
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function getFirst<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error('Array is empty');
  }

  return array[0];
}
