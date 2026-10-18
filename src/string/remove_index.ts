/**
 * @summary Remove characters from a string at a given index.
 * @description Removes a specified number of characters from a string starting at the given index, returning the resulting string.
 * @param string The source string.
 * @param index The starting index from which to remove characters.
 * @param length The number of characters to remove.
 * @returns A new string with the specified characters removed.
 * @example
 * ```ts
 * removeIndex('hello', 1, 1); // => 'hllo'
 * ```
 * @example
 * ```ts
 * removeIndex('abcdef', 2, 3); // => 'abf'
 * ```
 * @example
 * ```ts
 * removeIndex('world', 0, 2); // => 'rld'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function removeIndex(string: string, index: number, length: number): string {
  return string.substring(0, index) + string.substring(index + length);
}
