/**
 * Joins an array of strings into a single string using a separator.
 * @param items The array of strings to join.
 * @param separator The string to use as a separator.
 * @returns The joined string.
 * @example
 * // => 'a-b-c'
 * join(['a', 'b', 'c'], '-');
 * @example
 * // => 'hello world'
 * join(['hello', 'world'], ' ');
 * @example
 * // => 'one'
 * join(['one'], ',');
 */
export function join(items: string[], separator: string): string {
  return items.join(separator);
}