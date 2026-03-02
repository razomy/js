/**
 * Removes whitespace from both ends of the string.
 * @param text - The string to trim.
 * @returns The trimmed string.
 * @example
 * ```ts
 * trim('  foo  '); // => 'foo'
 * ```
 * @example
 * ```ts
 * trim('\nbar\t'); // => 'bar'
 * ```
 * @example
 * ```ts
 * trim('   '); // => ''
 * ```
 */
export function trim(text: string): string {
  return text.trim();
}
