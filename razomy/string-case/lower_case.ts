/**
 * Converts a string to lower case.
 * @param input - The string to convert.
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
 */
export function lowerCase(input: string): string {
  return input.toLowerCase();
}
