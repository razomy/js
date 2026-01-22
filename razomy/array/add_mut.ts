/**
 * Add an element to the end of an array, modifying the original array.
 * @param {T[]} array The array to modify.
 * @param {T} value The value to add.
 * @returns {T[]} The modified array.
 * @example
 * // => [1, 2, 3]
 * const list = [1, 2];
 * addMut(list, 3);
 * @example
 * // => ['a', 'b']
 * addMut(['a'], 'b');
 * @example
 * // => [{ id: 1 }, { id: 2 }]
 * const refs = [{ id: 1 }];
 * addMut(refs, { id: 2 });
 */
export function addMut<T>(array: T[], value: T): T[] {
  array.push(value);
  return array;
}