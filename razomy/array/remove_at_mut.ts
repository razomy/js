/**
 * Remove an element at a specific index from an array in place.
 * @param array The mutable array.
 * @param index The zero-based index of the element to remove.
 * @returns The removed element.
 * @example
 * ```ts
 * const items = ['a', 'b', 'c'];
 * removeAtMut(items, 1);
 * // => 'b'
 * ```
 * @example
 * ```ts
 * const numbers = [10, 20, 30];
 * removeAtMut(numbers, -1);
 * // => 30
 * ```
 * @example
 * ```ts
 * const empty = [];
 * removeAtMut(empty, 0);
 * // => undefined
 * ```
 */
export function removeAtMut<T>(array: T[], index: number): T | undefined {
  return array.splice(index, 1)[0];
}
