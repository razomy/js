/**
 * Removes whitespace from both ends of the string.
 * @param text - The string to trim.
 * @returns The trimmed string.
 * @example
 * // => 'foo'
 * trim('  foo  ');
 * @example
 * // => 'bar'
 * trim('\nbar\t');
 * @example
 * // => ''
 * trim('   ');
 */
export function trim(text: string): string {
  return text.trim();
}