/**
 * @summary Count occurrences of a string within a subarray of strings.
 * @description Counts how many times `equalString` appears in the `strings` array
 * between index `offset` (inclusive) and `maxOffset` (exclusive).
 * @param strings The array of strings to search within.
 * @param equalString The string to match against.
 * @param offset The starting index (inclusive).
 * @param maxOffset The ending index (exclusive).
 * @returns The number of occurrences found.
 * @example
 * ```ts
 * countString(['a', 'b', 'a', 'c'], 'a', 0, 4); // => 2
 * ```
 * @example
 * ```ts
 * countString(['hello', 'world', 'hello'], 'hello', 1, 3); // => 1
 * ```
 * @example
 * ```ts
 * countString(['x', 'y', 'z'], 'w', 0, 3); // => 0
 * ```
 * @complexity time O(maxOffset - offset)
 * @complexity memory O(1)
 */
export function countString(strings: string[], equalString: string, offset: number, maxOffset: number): number {
  let result = 0;

  for (let i = offset; i < maxOffset; i++) {
    if (strings[i] === equalString) {
      result++;
    }
  }

  return result;
}
