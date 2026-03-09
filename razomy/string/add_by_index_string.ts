import type { String } from '@razomy/string';
import type { Index } from '@razomy/index';

/**
 * @summary Insert a string into another string at a specific index.
 * @param text The original string.
 * @param index The zero-based index at which to insert.
 * @param insertion The string to insert.
 * @returns The resulting string with the insertion.
 * @example
 * ```ts
 * addByIndexString('-text', 0, 'prefix'); // => 'prefix-text'
 * ```
 * @example
 * ```ts
 * addByIndexString('hello ', 6, 'world'); // => 'hello world'
 * ```
 * @example
 * ```ts
 * addByIndexString('foo baz', 4, 'bar '); // => 'foo bar baz'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function addByIndexString(text: String, index: Index, insertion: string): String {
  return text.substring(0, index) + insertion + text.substring(index);
}
