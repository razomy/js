/**
 * Get abbreviation from string.
 * @param {string} fullName The full name string.
 * @returns {string} The abbreviation joined by hyphens.
 * @example
 * // => 'H-W'
 * getAbriviation('Hello World');
 * @example
 * // => 'n-p-m'
 * getAbriviation('node package manager');
 * @example
 * // => 'R-O-M'
 * getAbriviation('Read Only Memory');
 */
export function getAbriviation(fullName: string): string {
  const shortName = fullName.match(/\b\w/g)?.join('-');

  if (!shortName) {
    throw new Error('String is not provided');
  }

  return shortName;
}