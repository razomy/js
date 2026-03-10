/**
 * @summary Shuffle an array using Fisher-Yates algorithm.
 * @description Creates a new array with elements randomly rearranged using the Fisher-Yates shuffle algorithm.
 * @param array The array to shuffle.
 * @returns A new shuffled array.
 * @example
 * ```ts
 * shuffleArray([1, 2, 3, 4, 5]); // => [3, 1, 5, 2, 4]
 * ```
 * @example
 * ```ts
 * shuffleArray(['a', 'b', 'c']); // => ['c', 'a', 'b']
 * ```
 * @example
 * ```ts
 * shuffleArray([true, false, true]); // => [false, true, true]
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
import { createInt } from '@razomy/random';

export function shuffleArray<T>(array: readonly T[]): T[] {
  const result: T[] = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j: number = createInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
