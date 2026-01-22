/**
 * Returns the index of the first element in the array that satisfies the provided testing function.
 * @template T
 * @param {T[]} array The array to search.
 * @param {(item: T, index: number, array: T[]) => boolean} predicate The function to execute on each value.
 * @returns {number} The index of the first element that passes the test, otherwise -1.
 * @example
 * // => 1
 * findIndex([1, 2, 3], (x) => x === 2);
 * @example
 * // => 0
 * findIndex(['a', 'b', 'c'], (x) => x !== 'b');
 * @example
 * // => -1
 * findIndex([1, 2, 3], (x) => x > 5);
 */
export function findIndex<T>(
  array: T[],
  predicate: (item: T, index: number, array: T[]) => boolean
): number {
  return array.findIndex(predicate);
}