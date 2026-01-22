/**
 * Unescapes a specific string sequence by removing the preceding backslash.
 * @param string The string to process.
 * @param separateString The specific string sequence to unescape.
 * @returns The unescaped string.
 * @example
 * // => 'Content "quoted"'
 * unescapeString('Content \\"quoted"', '"');
 * @example
 * // => 'a:b'
 * unescapeString('a\\:b', ':');
 * @example
 * // => 'key=value'
 * unescapeString('key\\=value', '=');
 */
import {replaceString} from 'razomy.string';
import {String} from 'razomy.string';

export function unescapeString(string: String, separateString: String): String {
  return replaceString(string, '\\' + separateString, separateString);
}