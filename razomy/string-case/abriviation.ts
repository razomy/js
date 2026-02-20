/**
 * Get abbreviation from string.
 * @param {string} fullName The full name string.
 * @returns {string} The abbreviation joined by hyphens.
 * @example
 * // => 'HW'
 * getAbriviation('Hello World');
 * @example
 * // => 'npm'
 * getAbbreviation('node package manager', false);
 * @example
 * // => 'ROM'
 * getAbbreviation('Read-Only_Memory'); // => 'ROM'
 */
export function abriviation(fullName: string): string {
  // Split by spaces, hyphens, or underscores, filter out empty strings
  const words = fullName.split(/[\s_-]+/).filter(Boolean);

  // Get the first letter of each word
  const shortName = words.map(word => word[0]).join('');

  return shortName;
}