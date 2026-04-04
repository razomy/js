/**
 * @summary Count occurrences of a char at string.
 * @description Counts how many times `equalChar` appears in the `string`
 * between index `offset` (inclusive) and `maxOffset` (exclusive).
 * @param string The string to search within.
 * @param equalChar The string to match against.
 * @param offset The starting index (inclusive).
 * @param maxOffset The ending index (exclusive).
 * @returns The number of occurrences found.
 * @example
 * ```ts
 * countChar('abac', 'a', 0, 4); // => 2
 * ```
 * @example
 * ```ts
 * countChar('helloworldhello', 'h', 0, 3); // => 1
 * ```
 * @example
 * ```ts
 * countChar(['xyz', 'w', 0, 3); // => 0
 * ```
 * @complexity time O(maxOffset - offset)
 * @complexity memory O(1)
 */
export function countChar(string: string, equalChar: string, offset: number, maxOffset: number): number {
  let result = 0;

  for (let i = offset; i < maxOffset; i++) {
    if (string[i] === equalChar) {
      result++;
    }
  }

  return result;
}
