/**
 * @summary Creates a slice of array with n elements dropped from the beginning.
 * @description Creates a slice of array with n elements dropped from the beginning.
 * @param array The source array.
 * @param count The number of elements to drop.
 * @returns Returns the new array.
 * @example
 * ```ts
 * drop([1, 2, 3], 1); // => [2, 3]
 * ```
 * @example
 * ```ts
 * drop([1, 2, 3], 2); // => [3]
 * ```
 * @example
 * ```ts
 * drop([1, 2, 3], 5); // => []
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function drop<T>(array: T[], count: number): T[] {
  return array.slice(count);
}
