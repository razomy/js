/**
 * @summary Convert string to title case.
 * @description Converts the input string to title case by first lowercasing the entire string,
 * then capitalizing the first letter of each word. Word boundaries are determined by the `\b`
 * regex anchor, so hyphenated words and other non-alphabetic separators only trigger
 * capitalization at the start of each word boundary segment.
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
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function titleCase(text: string): string {
  return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
