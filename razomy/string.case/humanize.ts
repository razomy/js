import { capitalize } from './capitalize';

/**
 * Convert a string to a human-readable form.
 * @param input The string to humanize.
 * @returns The humanized string.
 * @example
 * // => 'Camel case'
 * humanize('camelCase');
 * @example
 * // => 'Snake case string'
 * humanize('snake_case_string');
 * @example
 * // => 'Kebab case string'
 * humanize('kebab-case-string');
 */
export function humanize(input: string): string {
  const separated = input
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  return capitalize(separated);
}