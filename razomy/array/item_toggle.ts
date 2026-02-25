/**
 * Toggles the presence of an item in an array.
 * If the item exists, it is removed. Otherwise, it is appended.
 * @param array The source array.
 * @param item The item to toggle.
 * @returns A new array with the item toggled.
 * @example
 * ```ts
 * itemToggle([1, 2], 3); // => [1, 2, 3]
 * ```
 * @example
 * ```ts
 * itemToggle(['a', 'b', 'c'], 'b'); // => ['a', 'c']
 * ```
 * @example
 * ```ts
 * itemToggle([], true); // => [true]
 * ```
 */
export function itemToggle<T>(array: T[], item: T): T[] {
  const index = array.indexOf(item);

  if (index === -1) {
    return [...array, item];
  }

  return [...array.slice(0, index), ...array.slice(index + 1)];
}
