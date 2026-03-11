/**
 * @summary Check if the source array contains all elements of the sub array in the same relative order.
 * @param source The array to search in.
 * @param array The sequence of elements to look for.
 * @returns True if the subsequence exists.
 * @example
 * ```ts
 * hasArray([1, 2, 3, 4], [2, 4]); // => true
 * ```
 * @example
 * ```ts
 * hasArray(['a', 'b', 'c'], ['c', 'a']); // => false
 * ```
 * @example
 * ```ts
 * hasArray([true, false], []); // => true
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function hasArray<T>(source: T[], array: T[]): boolean {
  let offset = 0;

  for (const item of array) {
    const foundIndex = source.indexOf(item, offset);

    if (foundIndex === -1) {
      return false;
    }

    offset = foundIndex + 1;
  }

  return true;
}
