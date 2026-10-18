/**
 * @summary Count leading space margin of a string.
 * @description Counts the number of leading space characters before the first non-space character in a string.
 * @param string The input string to count the leading spaces of.
 * @returns The number of leading space characters.
 * @example
 * ```ts
 * countSpaceMargin('hello'); // => 0
 * ```
 * @example
 * ```ts
 * countSpaceMargin('   hello'); // => 3
 * ```
 * @example
 * ```ts
 * countSpaceMargin('     '); // => 5
 * ```
 * @complexity time O(n)
 * @complexity memory O(1)
 */
export function countSpaceMargin(string: string): number {
  let count = 0;

  for (const chr of string) {
    if (chr !== ' ') break;
    count++;
  }

  return count;
}
