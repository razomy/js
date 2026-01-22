/**
 * Creates a new array with the elements in reverse order.
 * @param array The input array.
 * @returns A new reversed array.
 * @example
 * // => [3, 2, 1]
 * reverse([1, 2, 3]);
 * @example
 * // => ['z', 'y']
 * reverse(['y', 'z']);
 * @example
 * // => []
 * reverse([]);
 */
export function reverse<T>(array: T[]): T[] {
  return [...array].reverse();
}