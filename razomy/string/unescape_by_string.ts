/**
 * @summary Unescapes a specific string sequence by removing the preceding backslash.
 * @param string The string to process.
 * @param separateString The specific string sequence to unescape.
 * @returns The unescaped string.
 * @example
 * ```ts
 * unescapeString('Content \\"quoted"', '"'); // => 'Content "quoted"'
 * ```
 * @example
 * ```ts
 * unescapeString('a\\:b', ':'); // => 'a:b'
 * ```
 * @example
 * ```ts
 * unescapeString('key\\=value', '='); // => 'key=value'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
import type { String } from '@razomy/string';
import { replace } from '@razomy/string';

export function unescapeByString(string: String, separateString: String): String {
  return replace(string, '\\' + separateString, separateString);
}
