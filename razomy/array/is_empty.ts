/**
 * @summary Check if array is empty.
 * @param array The array to check.
 * @returns True if array is empty.
 * @example
 * ```ts
 * isEmpty([]); // => true
 * ```
 * @example
 * ```ts
 * isEmpty([1]); // => false
 * ```
 * @example
 * ```ts
 * isEmpty(['a', 'b']); // => false
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function isEmpty<T>(array: ReadonlyArray<T>): boolean {
  return array.length === 0;
}
