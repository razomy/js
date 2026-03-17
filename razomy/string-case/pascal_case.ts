/**
 * @summary Convert string to pascal case.
 * @description Converts a given string to PascalCase by splitting it into words
 * (handling spaces, underscores, and camelCase/UPPERCASE boundaries),
 * capitalizing the first letter of each word, lowercasing the rest,
 * and joining them together without any separator.
 * @param text The string.
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
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function pascalCase(text: string): string {
  return (text.match(/[A-Z][a-z]+|[A-Z]+(?=[A-Z][a-z])|[A-Z]+|[a-z]+|[0-9]+/g) ?? [])
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}