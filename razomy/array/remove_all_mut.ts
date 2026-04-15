import * as array_ from "@razomy/array";

/**
 * @summary Removes the specified values from the array.
 * @description It iterates through the provided values and removes the first matching instance in the target array for each.
 * @param array The array to modify.
 * @param values The values to remove from the array.
 * @returns void
 * @example
 * ```ts
 * const array = [1, 2, 3, 4];
 * removeAllMut(array, [1, 3]);
 * array; // => [2, 4]
 * ```
 * @example
 * ```ts
 * const array = ['a', 'b', 'b', 'c'];
 * removeAllMut(array, ['b', 'b']);
 * array; // => ['a', 'c']
 * ```
 * @example
 * ```ts
 * const array = [1, 1, 2];
 * removeAllMut(array, [1]);
 * array; // => [1, 2]
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */

export function removeAllMut<T>(array: T[], values: T[]): void {
  for (const value of values) {
    array_.removeFirstMut(array, value);
  }
}
