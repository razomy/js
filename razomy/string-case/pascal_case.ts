/**
 * Convert string to pascal case.
 * @param {string} string The string.
 * @returns {string} The pascal cased string.
 * @example
 * // => 'FooBar'
 * pascalCase('foo bar');
 * @example
 * // => 'FooBar'
 * pascalCase('foo_bar');
 * @example
 * // => 'FooBar'
 * pascalCase('FOO BAR');
 */
export function pascalCase(string: string): string {
  return (string.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) ?? [])
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}