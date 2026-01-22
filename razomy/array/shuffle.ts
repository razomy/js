/**
 * Creates a new array with elements shuffled using Fisher-Yates algorithm.
 * @param {T[]} array The source array.
 * @returns {T[]} A new shuffled array.
 * @example
 * // => [2, 3, 1]
 * shuffle([1, 2, 3]);
 * @example
 * // => ['c', 'a', 'b']
 * shuffle(['a', 'b', 'c']);
 * @example
 * // => []
 * shuffle([]);
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}