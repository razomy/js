/**
 * Replace all occurrences of a separator within a string with a replacement.
 * @param {String} text The input text.
 * @param {String} separator The substring to find and separate by.
 * @param {String} replacement The substring to join the parts with.
 * @returns {String} The modified string.
 * @example
 * // => 'a-b-c'
 * replaceString('a b c', ' ', '-');
 * @example
 * // => '12345'
 * replaceString('1,2,3,4,5', ',', '');
 * @example
 * // => 'foo'
 * replaceString('foo', 'bar', 'baz');
 */
import {String} from '@razomy/string';

export function replaceString(text: String, separator: String, replacement: String): String {
  return text.split(separator).join(replacement);
}