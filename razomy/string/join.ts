/**
 * Joins an array of strings into a single string using a separator.
 * @param items The array of strings to join.
 * @param separator The string to use as a separator.
 * @returns The joined string.
 * @example
 * ```ts
 * join(['a', 'b', 'c'], '-'); // => 'a-b-c'
 * ```
 * @example
 * ```ts
 * join(['hello', 'world'], ' '); // => 'hello world'
 * ```
 * @example
 * ```ts
 * join(['one'], ','); // => 'one'
 * ```
 */
export function join(items: string[], separator: string): string {
  return items.join(separator);
}
