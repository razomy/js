/**
 * @summary Find the first element in array2 that also exists in array1.
 * @description Iterates through array2 and for each element checks if it exists in array1 using strict equality. Returns the first matching element, or null if no match is found.
 * @param array1 The reference array to match against.
 * @param array2 The array to search through in order.
 * @returns The first element from array2 found in array1, or null if none match.
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
export function tryFirstEqual<T>(array1: T[], array2: T[]): T | null {
  for (const item2 of array2) {
    for (const item1 of array1) {
      if (item2 === item1) {
        return item2;
      }
    }
  }

  return null;
}
