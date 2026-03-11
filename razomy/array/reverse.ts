/**
 * @summary Creates a new array with the elements in reverse order.
 * @param array The input array.
 * @returns A new reversed array.
 * @example
 * ```ts
 * reverse([1, 2, 3]); // => [3, 2, 1]
 * ```
 * @example
 * ```ts
 * reverse(['y', 'z']); // => ['z', 'y']
 * ```
 * @example
 * ```ts
 * reverse([]); // => []
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function reverse<T>(array: T[]): T[] {
  return [...array].reverse();
}
