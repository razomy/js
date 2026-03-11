/**
 * @summary Remove the first occurrence of a value from an array in place.
 * @description Mutates the given array by removing the first element that matches the provided value using strict equality. If the value is not found, the array remains unchanged.
 * @param array The array to mutate.
 * @param value The value to remove.
 * @returns void
 * @example
 * ```ts
 * const array = [1, 2, 3, 2];
 * removeFirstMut(array, 2);
 * array; // => [1, 3, 2]
 * ```
 * @example
 * ```ts
 * const array = ['a', 'b', 'c'];
 * removeFirstMut(array, 'a');
 * array; // => ['b', 'c']
 * ```
 * @example
 * ```ts
 * const array = [1, 2, 3];
 * removeFirstMut(array, 99);
 * array; // => [1, 2, 3]
 * ```
 * @complexity time O(n)
 * @complexity memory O(1)
 */
export function removeFirstMut<T>(array: T[], value: T): void {
  const index: number = array.indexOf(value);

  if (index !== -1) {
    array.splice(index, 1);
  }
}
