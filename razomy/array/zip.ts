/**
 * Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
 * @param {...T[]} arrays The arrays to process.
 * @returns {T[][]} The new array of grouped elements.
 * @example
 * // => [['a', 1], ['b', 2]]
 * zip(['a', 'b'], [1, 2]);
 * @example
 * // => [['a', 1]]
 * zip(['a', 'b'], [1]);
 * @example
 * // => []
 * zip([], [1, 2]);
 */
export function zip<T>(...arrays: T[][]): T[][] {
  const lengths = arrays.map((array) => array.length);
  const limit = lengths.length > 0 ? Math.min(...lengths) : 0;
  const zipped: T[][] = [];

  for (let index = 0; index < limit; index++) {
    zipped.push(arrays.map((array) => array[index]));
  }

  return zipped;
}