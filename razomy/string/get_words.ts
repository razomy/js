/**
 * @summary Splits string into an array of its words.
 * @description Splits string into an array of its words by matching sequences of letters or numbers.
 * @param value The string to process.
 * @returns An array of words found in the string.
 * @example
 * ```ts
 * getWords('fred, barney, & pebbles'); // => ['fred', 'barney', 'pebbles']
 * ```
 * @example
 * ```ts
 * getWords('camelCase'); // => ['camel', 'Case']
 * ```
 * @example
 * ```ts
 * getWords('nested_snake_case'); // => ['nested', 'snake', 'case']
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function getWords(value: string): string[] {
  const wordPattern = /[A-Z]{2,}(?=[A-Z][a-z]+|\b)|[A-Z]?[a-z]+|[A-Z]+|\d+/g;
  return value.match(wordPattern) || [];
}
