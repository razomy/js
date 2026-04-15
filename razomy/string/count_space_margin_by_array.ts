import * as string from "@razomy/string";

/**
 * @summary Count leading space margins for each string in an array.
 * @description Maps an array of strings to an array of numbers representing the count of leading spaces (margin) for each string.
 * @param strings The array of strings to count leading space margins for.
 * @returns An array of numbers where each number is the leading space count of the corresponding string.
 * @example
 * ```ts
 * countSpaceMarginByArray(['  hello', '    world', 'foo']); // => [2, 4, 0]
 * ```
 * @example
 * ```ts
 * countSpaceMarginByArray(['', '   ', ' a']); // => [0, 3, 1]
 * ```
 * @example
 * ```ts
 * countSpaceMarginByArray([]); // => []
 * ```
 * @complexity time O(n * m) where n is the array length and m is the average string length
 * @complexity memory O(n)
 */

export function countSpaceMarginByArray(strings: string[]): number[] {
  return strings.map(string.countSpaceMargin);
}
