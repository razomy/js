/**
 * @summary Unescape occurrences of a specific string.
 * @description Removes the backslash preceding the specified string globally.
 * @param string The string to process.
 * @param separateString The string to unescape.
 * @returns The unescaped string.
 * @example
 * ```ts
 * unescapeByString('foo\\"bar', '"'); // => 'foo"bar'
 * ```
 * @example
 * ```ts
 * unescapeByString('a\\*b', '*'); // => 'a*b'
 * ```
 * @example
 * ```ts
 * unescapeByString('\\.ext', '.'); // => '.ext'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function unescapeByString(string: string, separateString: string): string {
  return string.split(`\\${separateString}`).join(separateString);
}
