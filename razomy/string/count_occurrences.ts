/**
 * Counts the number of occurrences of a substring within a text.
 * @param {string} text The text to search.
 * @param {string} substring The substring to count.
 * @returns {number} The number of occurrences.
 * @example
 * // => 3
 * countOccurrences('hello world', 'l');
 * @example
 * // => 2
 * countOccurrences('aaaa', 'aa');
 * @example
 * // => 0
 * countOccurrences('apple', 'z');
 */
export function countOccurrences(text: string, substring: string): number {
  return text.split(substring).length - 1;
}