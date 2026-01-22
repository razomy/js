/**
 * Computes the difference between two arrays.
 * Returns a new array with elements that are in the first array but not in the second array.
 * The order of elements in the result is determined by the order in the first array.
 *
 * @template T The type of elements in the arrays.
 * @param {T[]} source The array to compare against.
 * @param {T[]} other The array to subtract from the source.
 * @returns {T[]} A new array containing elements unique to the source array.
 * @example
 * // => [1, 3]
 * difference([1, 2, 3], [2, 4]);
 * @example
 * // => ['apple', 'banana']
 * difference(['apple', 'banana', 'orange'], ['orange', 'grape']);
 * @example
 * // => [1, 5]
 * difference([1, 2, 3, 4, 5], [2, 3, 4]);
 */
export function difference<T>(source: T[], other: T[]): T[] {
  const otherSet = new Set(other);
  return source.filter((item) => !otherSet.has(item));
}