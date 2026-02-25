/**
 * Convert string to title case.
 * @param text The input string.
 * @returns The title cased string.
 * @example
 * ```ts
 * titleCase('foo bar'); // => 'Foo Bar'
 * ```
 * @example
 * ```ts
 * titleCase('HELLO WORLD'); // => 'Hello World'
 * ```
 * @example
 * ```ts
 * titleCase('one-two'); // => 'One-two'
 * ```
 */
export function titleCase(text: string): string {
  return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
