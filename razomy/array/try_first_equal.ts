/**
 * @summary Find the first element in list2 that also exists in list1.
 * @description Iterates through list2 and for each element checks if it exists in list1 using strict equality. Returns the first matching element, or null if no match is found.
 * @param list1 The reference array to match against.
 * @param list2 The array to search through in order.
 * @returns The first element from list2 found in list1, or null if none match.
 * @example
 * ```ts
 * tryFirstEqual([1, 2, 3], [4, 2, 3]); // => 2
 * ```
 * @example
 * ```ts
 * tryFirstEqual(['a', 'b'], ['c', 'd']); // => null
 * ```
 * @example
 * ```ts
 * tryFirstEqual([10, 20, 30], [30, 20, 10]); // => 30
 * ```
 * @complexity time O(n * m)
 * @complexity memory O(1)
 */
export function tryFirstEqual<T>(list1: T[], list2: T[]): T | null {
  for (const item2 of list2) {
    for (const item1 of list1) {
      if (item2 === item1) {
        return item2;
      }
    }
  }

  return null;
}