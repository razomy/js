/**
 * Convert string to upper case.
 * @param text The input string.
 * @returns The upper cased string.
 * @example
 * // => 'TEST'
 * upperCase('test');
 * @example
 * // => 'HELLO WORLD'
 * upperCase('Hello World');
 * @example
 * // => 'RAZOMY'
 * upperCase('razomy');
 */
export function upperCase(text: string): string {
  return text.toUpperCase();
}