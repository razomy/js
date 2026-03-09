/**
 * @summary Splits an array into smaller arrays (chunks) of a specified size.
 * @description The last chunk may be smaller than the `size`.
 * @param array The array to process.
 * @param size The length of each chunk. Must be a positive integer.
 * @returns A new array of chunked arrays.
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2); // => [[1, 2], [3, 4], [5]]
 * ```
 * @example
 * ```ts
 * chunk(['a', 'b', 'c', 'd', 'e', 'f'], 3); // => [['a', 'b', 'c'], ['d', 'e', 'f']]
 * ```
 * @example
 * ```ts
 * chunk([true, false], 5); // => [[true, false]]
 * ```
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
