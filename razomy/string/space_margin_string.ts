/**
 * Add space margin to the string.
 * @param {string} value The string to process.
 * @param {number} size The size of the space margin.
 * @returns {string} The string with space margin.
 * @example
 * // => ' a '
 * spaceMarginString('a', 1);
 * @example
 * // => '  b  '
 * spaceMarginString('b', 2);
 * @example
 * // => 'c'
 * spaceMarginString('c', 0);
 */
import {marginString} from '@razomy/string';

export function spaceMarginString(value: string, size: number): string {
  const margin = ' '.repeat(size);
  return marginString(value, margin);
}
