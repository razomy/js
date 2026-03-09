/**
 * @summary Removes the specified values from the array.
 * @description It iterates through the provided values and removes the first matching instance in the target array for each.
 * @param array The array to modify.
 * @param values The values to remove from the array.
 * @returns
 * @example
 * ```ts
 * const list = [1, 2, 3, 4];
 * removeAllMut(list, [1, 3]);
 * // => [2, 4]
 * ```
 * @example
 * ```ts
 * const list = ['a', 'b', 'b', 'c'];
 * removeAllMut(list, ['b', 'b']);
 * // => ['a', 'c']
 * ```
 * @example
 * ```ts
 * const list = [1, 1, 2];
 * removeAllMut(list, [1]);
 * // => [1, 2]
 * ```
 */
import { removeFirstMut } from './remove_first_mut';

export function removeAllMut<T>(array: T[], values: T[]): void {
  for (const value of values) {
    removeFirstMut(array, value);
  }
}
