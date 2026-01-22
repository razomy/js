/**
 * Checks if at least one element in the array satisfies the provided testing function.
 * @param array The array to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns True if any element passes the predicate check, false otherwise.
 * @example
 * // => true
 * some([1, 2, 3, 4], (n) => n % 2 === 0);
 * @example
 * // => false
 * some([1, 3, 5, 7], (n) => n % 2 === 0);
 * @example
 * // => true
 * some(['a', 'bc', 'd'], (s) => s.length > 1);
 */
export function some<T>(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): boolean {
  return array.some(predicate);
}