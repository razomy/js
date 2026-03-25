/**
 * @summary Escapes all occurrences of a separator within a string.
 * @description Inserts a backslash character before every instance of the specified separator substring.
 * @param string The target string to be escaped.
 * @param separator The substring that needs to be escaped.
 * @returns The escaped string.
 * @example
 * ```ts
 * escapeByString('a.b.c', '.'); // => 'a\\.b\\.c'
 * ```
 * @example
 * ```ts
 * escapeByString('foo"bar', '"'); // => 'foo\\"bar'
 * ```
 * @example
 * ```ts
 * escapeByString('hello', '-'); // => 'hello'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function escapeByString(string: string, separator: string): string {
  return string.replaceAll(separator, '\\' + separator);
}