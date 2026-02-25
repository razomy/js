/**
 * Concatenate an array of strings into a single string.
 * @param {String[]} strings The array of strings to concatenate.
 * @returns {String} The concatenated string.
 * @example
 * ```ts
 * // => 'abc'
 * stringsString(['a', 'b', 'c']);
 * @example
 * ```ts
 * // => 'razomy'
 * stringsString(['ra', 'zo', 'my']);
 * @example
 * ```ts
 * // => ''
 * stringsString([]);
 */
import type { String } from '@razomy/string';

export function stringsString(strings: String[]): String {
  let result: String = '';

  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
  }

  return result;
}
