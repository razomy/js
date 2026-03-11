/**
 * @summary Returns the index of the first element in the array that satisfies the provided testing function.
 * @template T
 * @param array The array to search.
 * @param predicate The function to execute on each value.
 * @returns The index of the first element that passes the test, otherwise throws.
 * @throws {Error} If the item is not found.
 * @example
 * ```ts
 * findIndex([1, 2, 3], (x) => x === 2); // => 1
 * ```
 * @example
 * ```ts
 * findIndex(['a', 'b', 'c'], (x) => x !== 'b'); // => 0
 * ```
 * @example
 * ```ts
 * findIndex([1, 2, 3], (x) => x > 5); // => -1
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function findIndex<T>(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): number {
  const index = array.findIndex(predicate);

  if (index === -1) {
    throw new Error('Item not found.');
  }

  return index;
}
