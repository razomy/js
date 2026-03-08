/**
 * @summary Replace all occurrences of a separator within a string with a replacement.
 * @param text The input text.
 * @param separator The substring to find and separate by.
 * @param replacement The substring to join the parts with.
 * @returns The modified string.
 * @example
 * ```ts
 * replace('a b c', ' ', '-'); // => 'a-b-c'
 * ```
 * @example
 * ```ts
 * replace('1,2,3,4,5', ',', ''); // => '12345'
 * ```
 * @example
 * ```ts
 * replace('foo', 'bar', 'baz'); // => 'foo'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
import type { String } from '@razomy/string';

export function replace(text: String, separator: String, replacement: String): String {
  return text.split(separator).join(replacement);
}
