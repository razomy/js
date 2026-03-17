/**
 * @summary Convert string to upper case.
 * @description Converts all characters in the given string to their upper-case equivalents using the built-in `String.prototype.toUpperCase` method. The original string is not modified; a new upper-cased string is returned.
 * @param text The input string.
 * @returns The upper-cased string.
 * @example
 * ```ts
 * upperCase('test'); // => 'TEST'
 * ```
 * @example
 * ```ts
 * upperCase('Hello World'); // => 'HELLO WORLD'
 * ```
 * @example
 * ```ts
 * upperCase('razomy'); // => 'RAZOMY'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function upperCase(text: string): string {
  return text.toUpperCase();
}