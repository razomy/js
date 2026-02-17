/**
 * Convert string to title case.
 * @param {string} text The input string.
 * @returns {string} The title cased string.
 * @example
 * // => 'Foo Bar'
 * titleCase('foo bar');
 * @example
 * // => 'Hello World'
 * titleCase('HELLO WORLD');
 * @example
 * // => 'One-two'
 * titleCase('one-two');
 */
export function titleCase(text: string): string {
  return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}