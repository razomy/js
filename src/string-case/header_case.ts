/**
 * @summary Convert string to Header-Case (Train-Case).
 * @description Converts a given string into Header-Case (also known as Train-Case), where each word is capitalized
 * and separated by hyphens. The function handles various input formats including camelCase, snake_case,
 * and strings with arbitrary delimiters by first splitting the text into individual words, capitalizing
 * the first letter of each word, lowercasing the rest, and then joining them with hyphens.
 * @param text The text to convert.
 * @returns The header cased string.
 * @example
 * ```ts
 * headerCase('hello world'); // => 'Hello-World'
 * ```
 * @example
 * ```ts
 * headerCase('camelCaseString'); // => 'Camel-Case-String'
 * ```
 * @example
 * ```ts
 * headerCase('session_id'); // => 'Session-Id'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function headerCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-');
}
