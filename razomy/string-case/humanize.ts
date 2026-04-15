import * as stringCase from "@razomy/string-case";

/**
 * @summary Convert a string to a human-readable form.
 * @description Transforms a string from common programming naming conventions (camelCase, snake_case, kebab-case)
 * into a human-readable sentence. It splits words by detecting camelCase boundaries, underscores, and hyphens,
 * normalizes whitespace, converts the result to lowercase, and capitalizes the first letter.
 * @param text The string to humanize.
 * @returns The humanized string.
 * @example
 * ```ts
 * humanize('camelCase'); // => 'Camel case'
 * ```
 * @example
 * ```ts
 * humanize('snake_case_string'); // => 'Snake case string'
 * ```
 * @example
 * ```ts
 * humanize('kebab-case-string'); // => 'Kebab case string'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function humanize(text: string): string {
  const separated = text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  return stringCase.capitalize(separated);
}
