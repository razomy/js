/**
 * Removes whitespace from both ends of the string.
 * @param text - The string to trim.
 * @returns The trimmed string.
 * @example
 * ```ts
 * // => 'foo'
 * trim('  foo  ');
 * @example
 * ```ts
 * // => 'bar'
 * trim('\nbar\t');
 * @example
 * ```ts
 * // => ''
 * trim('   ');
 */
export function trim(text: string): string {
  return text.trim();
}
