/**
 * Convert string to pascal case.
 * @param string The string.
 * @returns The pascal cased string.
 * @example
 * ```ts
 * pascalCase('foo bar'); // => 'FooBar'
 * ```
 * @example
 * ```ts
 * pascalCase('foo_bar'); // => 'FooBar'
 * ```
 * @example
 * ```ts
 * pascalCase('FOO BAR'); // => 'FooBar'
 * ```
 */
export function pascalCase(string: string): string {
  return (string.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) ?? []).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
}
