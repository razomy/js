/**
 * Joins all elements of an array into a string separated by the specified separator.
 * @param array The array of elements to join.
 * @param separator The string used to separate the elements.
 * @returns The joined string.
 * @example
 * // => 'a-b-c'
 * join(['a', 'b', 'c'], '-');
 * @example
 * // => '1, 2, 3'
 * join([1, 2, 3], ', ');
 * @example
 * // => ''
 * join([], '/');
 */
export function join<T>(array: T[], separator: string): string {
  return array.join(separator);
}