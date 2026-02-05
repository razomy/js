/**
 * Concatenate an array of strings into a single string.
 * @param {String[]} strings The array of strings to concatenate.
 * @returns {String} The concatenated string.
 * @example
 * // => 'abc'
 * stringsString(['a', 'b', 'c']);
 * @example
 * // => 'razomy'
 * stringsString(['ra', 'zo', 'my']);
 * @example
 * // => ''
 * stringsString([]);
 */
import {String} from '@razomy/string';

export function stringsString(strings: String[]): String {
  let result: String = '';

  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
  }

  return result;
}