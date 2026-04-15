import * as random from '@razomy/random';

/**
 * @summary Shuffle an array using the Fisher-Yates algorithm.
 * @description Creates a new array with elements randomly shuffled using the Fisher-Yates algorithm. The original array is not modified.
 * @param array The array to shuffle.
 * @returns A new array with elements in random order.
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
 * shuffleArray([42]); // => [42]
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result: T[] = [...array];

  for (let i: number = result.length - 1; i > 0; i--) {
    const j: number = random.createInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
