import { capitalize } from './capitalize';

/**
 * Convert a string to a human-readable form.
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

  return capitalize(separated);
}
