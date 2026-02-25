/**
 * Joins all elements of an array into a string separated by the specified separator.
 * @param array The array of elements to join.
 * @param separator The string used to separate the elements.
 * @returns The joined string.
 * @example
 * ```ts
 * join(['a', 'b', 'c'], '-');
 * // => 'a-b-c'
 * ```
 * @example
 * ```ts
 * join([1, 2, 3], ', '); // => '1, 2, 3'
 * ```
 * @example
 * ```ts
 * join([], '/');
 * // => ''
 * ```
 */
export function join<T>(array: T[], separator: string): string {
  return array.join(separator);
}
