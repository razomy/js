/**
 * @summary Check if the master array contains all elements of the sub array in the same relative order.
 * @param master The array to search in.
 * @param sub The sequence of elements to look for.
 * @returns True if the subsequence exists.
 * @example
 * ```ts
 * subHas([1, 2, 3, 4], [2, 4]); // => true
 * ```
 * @example
 * ```ts
 * subHas(['a', 'b', 'c'], ['c', 'a']); // => false
 * ```
 * @example
 * ```ts
 * subHas([true, false], []); // => true
 * ```
 */
export function hasSub<T>(master: T[], sub: T[]): boolean {
  let offset = 0;

  for (const item of sub) {
    const foundIndex = master.indexOf(item, offset);

    if (foundIndex === -1) {
      return false;
    }

    offset = foundIndex + 1;
  }

  return true;
}
