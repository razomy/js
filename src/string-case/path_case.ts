/**
 * @summary Convert string to path/case.
 * @description Converts a given string into path/case format by splitting it on camelCase boundaries,
 * non-alphanumeric characters, and whitespace, then joining the resulting lowercase words with forward slashes.
 * @param text The text to convert.
 * @returns The path cased string.
 * @example
 * ```ts
 * pathCase('Hello World'); // => 'hello/world'
 * ```
 * @example
 * ```ts
 * pathCase('camelCaseString'); // => 'camel/case/string'
 * ```
 * @example
 * ```ts
 * pathCase('foo_bar'); // => 'foo/bar'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function pathCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((word) => word.toLowerCase())
    .join('/');
}
