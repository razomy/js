/**
 * Splits string into an array of its words.
 * @param {string} value The string to process.
 * @returns {string[]} The array of words.
 * @example
 * ```ts
 * words('fred, barney, & pebbles'); // => ['fred', 'barney', 'pebbles']
 * ```
 * @example
 * ```ts
 * words('camelCase'); // => ['camel', 'Case']
 * ```
 * @example
 * ```ts
 * words('nested_snake_case'); // => ['nested', 'snake', 'case']
 * ```
 */
export function getWords(value: string): string[] {
  const wordPattern = /[A-Z]{2,}(?=[A-Z][a-z]+|\b)|[A-Z]?[a-z]+|[A-Z]+|\d+/g;
  return value.match(wordPattern) || [];
}
