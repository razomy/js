/**
 * @summary Remove the first occurrence of a value from an array in place.
 * @description Mutates the given array by removing the first element that matches the provided value using strict equality. If the value is not found, the array remains unchanged.
 * @param arr The array to mutate.
 * @param value The value to remove.
 * @returns void
 * @example
 * ```ts
 * const arr = [1, 2, 3, 2];
 * removeFirstMut(arr, 2);
 * // arr => [1, 3, 2]
 * ```
 * @example
 * ```ts
 * const arr = ['a', 'b', 'c'];
 * removeFirstMut(arr, 'a');
 * // arr => ['b', 'c']
 * ```
 * @example
 * ```ts
 * const arr = [1, 2, 3];
 * removeFirstMut(arr, 99);
 * // arr => [1, 2, 3]
 * ```
 * @complexity time O(n)
 * @complexity memory O(1)
 */
export function removeFirstMut<T>(arr: T[], value: T): void {
  const index: number = arr.indexOf(value);

  if (index !== -1) {
    arr.splice(index, 1);
  }
}