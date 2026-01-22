/**
 * Creates a slice of array with n elements taken from the beginning.
 * @param array The array to query.
 * @param n The number of elements to take.
 * @returns The slice of array.
 * @example
 * // => [1]
 * take([1, 2, 3], 1);
 * @example
 * // => [1, 2]
 * take([1, 2, 3], 2);
 * @example
 * // => [1, 2, 3]
 * take([1, 2, 3], 5);
 */
export function take<T>(array: T[], n: number): T[] {
  return array.slice(0, n);
}