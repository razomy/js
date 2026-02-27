/**
 * Converts a string to lower case.
 * @param text - The string to convert.
 * @returns The lower cased string.
 * @example
 * ```ts
 * lowerCase('RAZOMY'); // => 'razomy'
 * ```
 * @example
 * ```ts
 * lowerCase('Test'); // => 'test'
 * ```
 * @example
 * ```ts
 * lowerCase('FOO Bar'); // => 'foo bar'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function lowerCase(text: string): string {
  return text.toLowerCase();
}
