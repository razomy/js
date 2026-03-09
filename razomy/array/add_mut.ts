/**
 * @summary Add an element to the end of an array, modifying the original array.
 * @param array The array to modify.
 * @param value The value to add.
 * @returns The modified array.
 * @example
 * ```ts
 * const list = [1, 2];
 * addMut(list, 3);
 * // => [1, 2, 3]
 * ```
 * @example
 * ```ts
 * addMut(['a'], 'b'); // => ['a', 'b']
 * ```
 * @example
 * ```ts
 * const refs = [{ id: 1 }];
 * addMut(refs, { id: 2 });
 * // => [{ id: 1 }, { id: 2 }]
 * ```
 */
export function addMut<T>(array: T[], value: T): T[] {
  array.push(value);
  return array;
}
