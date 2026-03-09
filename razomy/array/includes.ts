/**
 * @summary Checks if value is in array.
 * @param array The array to query.
 * @param value The value to search for.
 * @param fromIndex The index to search from.
 * @returns True if value is found, else false.
 * @example
 * ```ts
 * includes([1, 2, 3], 1); // => true
 * ```
 * @example
 * ```ts
 * includes([1, 2, 3], 4); // => false
 * ```
 * @example
 * ```ts
 * includes(['a', 'b', 'c'], 'c', 1); // => true
 * ```
 */
export function includes<T>(array: T[], value: T, fromIndex?: number): boolean {
  return array.includes(value, fromIndex);
}
