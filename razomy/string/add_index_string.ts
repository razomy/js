import {String} from 'razomy.string';
import {Index} from 'razomy.index';

/**
 * Insert a string into another string at a specific index.
 * @param {String} text The original string.
 * @param {Index} index The zero-based index at which to insert.
 * @param {string} insertion The string to insert.
 * @returns {String} The resulting string with the insertion.
 * @example
 * // => 'prefix-text'
 * addIndexString('-text', 0, 'prefix');
 * @example
 * // => 'hello world'
 * addIndexString('hello ', 6, 'world');
 * @example
 * // => 'foo bar baz'
 * addIndexString('foo baz', 4, 'bar ');
 */
export function addIndexString(text: String, index: Index, insertion: string): String {
  return text.substring(0, index) + insertion + text.substring(index);
}