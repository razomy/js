/**
 * Convert string to Sentence case.
 * Only the first letter of the result is capitalized, the rest is lowercase.
 * @param text The text to convert.
 * @returns The sentence cased string.
 * @example
 * ```ts
 * sentenceCase('helloWorld'); // => 'Hello world'
 * ```
 * @example
 * ```ts
 * sentenceCase('HELLO WORLD'); // => 'Hello world'
 * ```
 * @example
 * ```ts
 * sentenceCase('foo_bar_baz'); // => 'Foo bar baz'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function sentenceCase(text: string): string {
  if (!text) return '';
  const cleanedText = text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase();

  return cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1);
}
