/**
 * @summary Concatenate an array of strings into a single string.
 * @param strings The array of strings to concatenate.
 * @returns The concatenated string.
 * @example
 * ```ts
 * merge(['a', 'b', 'c']); // => 'abc'
 * ```
 * @example
 * ```ts
 * merge(['ra', 'zo', 'my']); // => 'razomy'
 * ```
 * @example
 * ```ts
 * merge([]); // => ''
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
import type { String } from '@razomy/string';

export function merge(strings: String[]): String {
  let result: String = '';

  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
  }

  return result;
}
