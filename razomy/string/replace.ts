/**
 * @summary Replace all occurrences of a separator in a string.
 * @description Replace all occurrences of a separator string with a replacement string.
 * @param text The input string.
 * @param separator The substring to be replaced.
 * @param replacement The string to replace the separator with.
 * @returns The newly formatted string.
 * @example
 * ```ts
 * replace('hello world', 'world', 'there'); // => 'hello there'
 * ```
 * @example
 * ```ts
 * replace('a-b-c-d', '-', '_'); // => 'a_b_c_d'
 * ```
 * @example
 * ```ts
 * replace('foo', 'bar', 'baz'); // => 'foo'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function replace(text: string, separator: string, replacement: string): string {
  return text.split(separator).join(replacement);
}
