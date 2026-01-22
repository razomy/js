/**
 * Splits an array into smaller arrays (chunks) of a specified size.
 * The last chunk may be smaller than the `size`.
 *
 * @param {T[]} array The array to process.
 * @param {number} size The length of each chunk. Must be a positive integer.
 * @returns {T[][]} A new array of chunked arrays.
 * @example
 * // => [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3, 4, 5], 2);
 * @example
 * // => [['a', 'b', 'c'], ['d', 'e', 'f']]
 * chunk(['a', 'b', 'c', 'd', 'e', 'f'], 3);
 * @example
 * // => [[true, false]]
 * chunk([true, false], 5);
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}