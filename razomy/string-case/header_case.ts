/**
 * @summary Convert string to Header-Case (Train-Case).
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
  if (!text) return '';
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-');
}
