/**
 * @summary Add space margin to the string.
 * @param value The string to process.
 * @param size The size of the space margin.
 * @returns The string with space margin.
 * @example
 * ```ts
 * spaceMargin('a', 1); // => ' a'
 * ```
 * @example
 * ```ts
 * spaceMargin('b', 2); // => '  b'
 * ```
 * @example
 * ```ts
 * spaceMargin('c', 0); // => 'c'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
import { marginLeft } from '@razomy/string';

export function spaceMarginLeft(value: string, size: number): string {
  const margin_ = ' '.repeat(size);
  return marginLeft(value, margin_);
}
