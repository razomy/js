/**
 * Remove an element at a specific index from an array in place.
 * @param array The mutable array.
 * @param index The zero-based index of the element to remove.
 * @returns The removed element.
 * @example
 * const items = ['a', 'b', 'c'];
 * // => 'b'
 * removeAtMut(items, 1);
 * @example
 * const numbers = [10, 20, 30];
 * // => 30
 * removeAtMut(numbers, -1);
 * @example
 * const empty = [];
 * // => undefined
 * removeAtMut(empty, 0);
 */
export function removeAtMut<T>(array: T[], index: number): T | undefined {
  return array.splice(index, 1)[0];
}