/**
 * @summary Get abbreviation from string.
 * @param text The full name string.
 * @returns The abbreviation joined by hyphens.
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
