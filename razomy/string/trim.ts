/**
 * @summary Removes whitespace from both ends of the string.
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
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function trim(text: string): string {
  return text.trim();
}
