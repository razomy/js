/**
 * @summary Get abbreviation from string.
 * @description Takes a string of words separated by spaces, hyphens, or underscores,
 * and returns an abbreviation formed by concatenating the first letter of each word.
 * @param text The full name string.
 * @returns The abbreviation formed by the first letter of each word.
 * @example
 * ```ts
 * abbreviation('Hello World'); // => 'HW'
 * ```
 * @example
 * ```ts
 * abbreviation('node package manager'); // => 'npm'
 * ```
 * @example
 * ```ts
 * abbreviation('Read-Only_Memory'); // => 'ROM'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function abbreviation(text: string): string {
  // Split by spaces, hyphens, or underscores, filter out empty strings
  const words = text.split(/[\s_-]+/).filter(Boolean);

  // Get the first letter of each word
  const shortName = words.map((word) => word[0]).join('');

  return shortName;
}