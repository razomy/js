/**
 * Check if array is empty.
 * @param array The array to check.
 * @returns True if array is empty.
 * @example
 * // => true
 * isEmpty([]);
 * @example
 * // => false
 * isEmpty([1]);
 * @example
 * // => false
 * isEmpty(['a', 'b']);
 */
export function isEmpty<T>(array: ReadonlyArray<T>): boolean {
  return array.length === 0;
}