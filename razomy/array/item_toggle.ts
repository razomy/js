/**
 * Toggles the presence of an item in an array.
 * If the item exists, it is removed. Otherwise, it is appended.
 * @param {T[]} array The source array.
 * @param {T} item The item to toggle.
 * @returns {T[]} A new array with the item toggled.
 * @example
 * // => [1, 2, 3]
 * itemToggle([1, 2], 3);
 * @example
 * // => ['a', 'c']
 * itemToggle(['a', 'b', 'c'], 'b');
 * @example
 * // => [true]
 * itemToggle([], true);
 */
export function itemToggle<T>(array: T[], item: T): T[] {
  const index = array.indexOf(item);

  if (index === -1) {
    return [...array, item];
  }

  return [
    ...array.slice(0, index),
    ...array.slice(index + 1),
  ];
}