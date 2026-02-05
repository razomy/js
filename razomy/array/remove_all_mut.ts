/**
 * Removes the specified values from the array.
 * Note: This operation mutates the original array.
 * It iterates through the provided values and removes the first matching instance in the target array for each.
 * @param {T[]} array The array to modify.
 * @param {T[]} values The values to remove from the array.
 * @returns {void}
 * @example
 * // => [2, 4]
 * const list = [1, 2, 3, 4];
 * removeAllMut(list, [1, 3]);
 * @example
 * // => ['a', 'c']
 * const list = ['a', 'b', 'b', 'c'];
 * removeAllMut(list, ['b', 'b']);
 * @example
 * // => [1, 2]
 * const list = [1, 1, 2];
 * removeAllMut(list, [1]);
 */
import {removeFirstMut} from '@razomy/array';

export function removeAllMut<T>(array: T[], values: T[]): void {
  for (const value of values) {
    removeFirstMut(array, value);
  }
}