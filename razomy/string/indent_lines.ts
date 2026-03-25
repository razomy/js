import { prefixLines } from '@razomy/string';

/**
 * @summary Indent each line of a string.
 * @description Adds a specified number of space characters to the beginning of each line in a given string.
 * @param value The string to indent.
 * @param size The number of spaces to indent each line.
 * @returns The indented string.
 * @example
 * ```ts
 * indentLines('hello', 2); // => '  hello'
 * ```
 * @example
 * ```ts
 * indentLines('foo\nbar', 4); // => '    foo\n    bar'
 * ```
 * @example
 * ```ts
 * indentLines('a\nb\nc', 1); // => ' a\n b\n c'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function indentLines(value: string, size: number): string {
  return prefixLines(value, ' '.repeat(size));
}