/**
 * Splits string into an array of its words.
 * @param {string} value The string to process.
 * @returns {string[]} The array of words.
 * @example
 * // => ['fred', 'barney', 'pebbles']
 * words('fred, barney, & pebbles');
 * @example
 * // => ['camel', 'Case']
 * words('camelCase');
 * @example
 * // => ['nested', 'snake', 'case']
 * words('nested_snake_case');
 */
export function words(value: string): string[] {
  const wordPattern = /[A-Z]{2,}(?=[A-Z][a-z]+|\b)|[A-Z]?[a-z]+|[A-Z]+|\d+/g;
  return value.match(wordPattern) || [];
}