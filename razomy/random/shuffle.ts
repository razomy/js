import {createInt} from './createInt';

/**
 * Creates a new array with elements shuffled using Fisher-Yates algorithm.
 * @param array The source array.
 * @returns A new shuffled array.
 * @example
 * ```ts
 * shuffleArray([1, 2, 3]); // => [2, 3, 1]
 * ```
 * @example
 * ```ts
 * shuffleArray(['a', 'b', 'c']); // => ['c', 'a', 'b']
 * ```
 * @example
 * ```ts
 * shuffleArray([]); // => []
 * ```
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = createInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};