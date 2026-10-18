/**
 * @summary Convert string to dot.case.
 * @description Converts a given string into dot.case format by splitting the input on
 * camelCase boundaries, non-alphanumeric characters, and whitespace, then joining
 * the resulting lowercase words with dots.
 * @param text The text to convert.
 * @returns The dot cased string.
 * @example
 * ```ts
 * dotCase('Hello World'); // => 'hello.world'
 * ```
 * @example
 * ```ts
 * dotCase('camelCaseString'); // => 'camel.case.string'
 * ```
 * @example
 * ```ts
 * dotCase('foo_bar'); // => 'foo.bar'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function dotCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((word) => word.toLowerCase())
    .join('.');
}
