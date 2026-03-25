/**
 * @summary Checks if two arrays are strictly equal.
 * @description Compares two arrays for shallow equality. It returns true if both arrays have the exact same length and every element in the first array is strictly equal (`===`) to the element at the corresponding index in the second array.
 * @param arr1 The first array to compare.
 * @param arr2 The second array to compare.
 * @returns True if the arrays are strictly equal, otherwise false.
 * @example
 * ```ts
 * isArrayEqual([1, 2, 3], [1, 2, 3]);
 * // => true
 * ```
 * @example
 * ```ts
 * isArrayEqual(['a', 'b'], ['a', 'c']);
 * // => false
 * ```
 * @example
 * ```ts
 * isArrayEqual([1, 2], [1, 2, 3]);
 * // => false
 * ```
 * @complexity time O(n)
 * @complexity memory O(1)
 */
export function isArrayEqual<T>(arr1: T[], arr2: T[]) {
  return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
}
