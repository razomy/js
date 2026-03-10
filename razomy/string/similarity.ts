/**
 * @summary Compute similarity ratio between two strings.
 * @description Calculates a normalized similarity score between two strings based on Levenshtein distance. Returns a value between 0 and 1, where 1 means identical strings and 0 means completely different.
 * @param str1 The first string.
 * @param str2 The second string.
 * @returns A number between 0 and 1 representing the similarity.
 * @example
 * ```ts
 * similarity('hello', 'hello'); // => 1
 * ```
 * @example
 * ```ts
 * similarity('kitten', 'sitting'); // => 0.5714285714285714
 * ```
 * @example
 * ```ts
 * similarity('', ''); // => 1
 * ```
 * @complexity time O(n * m)
 * @complexity memory O(n * m)
 */
import { levenshteinDistance } from '@razomy/string';

export function similarity(str1: string, str2: string): number {
  const length: number = Math.max(str1.length, str2.length);

  if (length === 0) return 1;

  const distance: number = levenshteinDistance(str1, str2);

  return 1 - distance / length;
}
