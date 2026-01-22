/**
 * Inserts an item into an array at the specified index by mutating the array.
 * @param array The array to mutate.
 * @param index The index at which to insert the item.
 * @param item The item to insert.
 * @returns The mutated array.
 * @example
 * // => [1, 2, 3]
 * insertMut([1, 3], 1, 2);
 * @example
 * // => ['a', 'b', 'c']
 * insertMut(['a', 'c'], 1, 'b');
 * @example
 * // => [{ id: 1 }, { id: 2 }]
 * insertMut([{ id: 1 }], 1, { id: 2 });
 */
export function insertMut<T>(array: T[], index: number, item: T): T[] {
  array.splice(index, 0, item);
  return array;
}