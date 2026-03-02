/**
 * Creates a new array with elements shuffled using Fisher-Yates algorithm.
 * @param array The source array.
 * @returns A new shuffled array.
 * @example
 * ```ts
 * shuffle([1, 2, 3]); // => [2, 3, 1]
 * ```
 * @example
 * ```ts
 * shuffle(['a', 'b', 'c']); // => ['c', 'a', 'b']
 * ```
 * @example
 * ```ts
 * shuffle([]); // => []
 * ```
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
