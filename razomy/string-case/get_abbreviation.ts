/**
 * Get abbreviation from string.
 * @param text The full name string.
 * @returns The abbreviation joined by hyphens.
 * @example
 * ```ts
 * getAbbreviation('Hello World'); // => 'HW'
 * ```
 * @example
 * ```ts
 * getAbbreviation('node package manager'); // => 'npm'
 * ```
 * @example
 * ```ts
 * getAbbreviation('Read-Only_Memory'); // => 'ROM'
 * ```
 */
export function getAbbreviation(text: string): string {
  // Split by spaces, hyphens, or underscores, filter out empty strings
  const words = text.split(/[\s_-]+/).filter(Boolean);

  // Get the first letter of each word
  const shortName = words.map((word) => word[0]).join('');

  return shortName;
}
