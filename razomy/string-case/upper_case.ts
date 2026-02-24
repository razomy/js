/**
 * Convert string to upper case.
 * @param text The input string.
 * @returns The upper cased string.
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
 */
export function upperCase(text: string): string {
  return text.toUpperCase();
}