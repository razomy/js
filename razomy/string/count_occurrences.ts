/**
 * Counts the number of occurrences of a substring within a text.
 * @param {string} text The text to search.
 * @param {string} substring The substring to count.
 * @returns {number} The number of occurrences.
 * @example
 * ```ts
 * countOccurrences('hello world', 'l'); // => 3
 * ```
 * @example
 * ```ts
 * countOccurrences('aaaa', 'aa'); // => 2
 * ```
 * @example
 * ```ts
 * countOccurrences('apple', 'z'); // => 0
 * ```
 */
export function countOccurrences(text: string, substring: string): number {
  return text.split(substring).length - 1;
}
