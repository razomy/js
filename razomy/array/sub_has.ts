/**
 * Check if the master array contains all elements of the sub array in the same relative order.
 * @param {T[]} master The array to search in.
 * @param {T[]} sub The sequence of elements to look for.
 * @returns {boolean} True if the subsequence exists.
 * @example
 * // => true
 * subHas([1, 2, 3, 4], [2, 4]);
 * @example
 * // => false
 * subHas(['a', 'b', 'c'], ['c', 'a']);
 * @example
 * // => true
 * subHas([true, false], []);
 */
export function subHas<T>(master: T[], sub: T[]): boolean {
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