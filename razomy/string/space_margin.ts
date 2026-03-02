/**
 * Add space margin to the string.
 * @param {string} value The string to process.
 * @param {number} size The size of the space margin.
 * @returns {string} The string with space margin.
 * @example
 * ```ts
 * spaceMargin('a', 1); // => ' a '
 * ```
 * @example
 * ```ts
 * spaceMargin('b', 2); // => '  b  '
 * ```
 * @example
 * ```ts
 * spaceMargin('c', 0); // => 'c'
 * ```
 */
import { margin } from '@razomy/string';

export function spaceMargin(value: string, size: number): string {
  const margin_ = ' '.repeat(size);
  return margin(value, margin_);
}
