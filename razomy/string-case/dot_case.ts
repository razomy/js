/**
 * Convert string to dot.case.
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
 */
export function dotCase(text: string): string {
  if (!text) return '';
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((word) => word.toLowerCase())
    .join('.');
}