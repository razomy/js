import * as string from '@razomy/string';

/**
 * @summary Calculate the similarity ratio between two strings.
 * @description Computes a similarity score between 0 and 1 for two strings based on their Levenshtein distance. A score of 1 indicates identical strings, while 0 indicates no commonality.
 * @param str1 The first string to compare.
 * @param str2 The second string to compare.
 * @returns A number between 0 and 1 representing the similarity ratio.
 * @example
 * ```ts
 * similarity('hello', 'hello'); // => 1
 * ```
 * @example
 * ```ts
 * similarity('hello', 'hallo'); // => 0.8
 * ```
 * @example
 * ```ts
 * similarity('test', ''); // => 0
 * ```
 * @complexity time O(n * m)
 * @complexity memory O(n * m)
 */
export function similarity(str1: string, str2: string): number {
  const maxLength: number = Math.max(str1.length, str2.length);

  if (maxLength === 0) {
    return 1;
  }

  const distance: number = string.levenshteinDistance(str1, str2);

  return 1 - distance / maxLength;
}
