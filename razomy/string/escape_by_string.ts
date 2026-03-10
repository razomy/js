/**
 * @summary Escape occurrences of a substring by prepending a backslash.
 * @description Escapes every occurrence of `separator` within `string` by inserting a backslash (`\`) before it.
 * @param string The input string to process.
 * @param separator The substring to escape.
 * @returns A new string with all occurrences of `separator` prefixed by a backslash.
 * @example
 * ```ts
 * escapeByString('hello.world', '.'); // => 'hello\\.world'
 * ```
 * @example
 * ```ts
 * escapeByString('a|b|c', '|'); // => 'a\\|b\\|c'
 * ```
 * @example
 * ```ts
 * escapeByString('no match here', ','); // => 'no match here'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
import type { String } from '@razomy/string';
import { replace } from '@razomy/string';

export function escapeByString(string: String, separator: String): String {
  return replace(string, separator, '\\' + separator);
}
