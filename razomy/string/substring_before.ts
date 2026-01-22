/**
 * Gets the substring before the first occurrence of a separator.
 * @param {string} text The input string.
 * @param {string} separator The string to search for.
 * @returns {string} The substring before the separator or the original string if not found.
 * @example
 * // => 'razomy'
 * substringBefore('razomy.string', '.');
 * @example
 * // => 'user'
 * substringBefore('user@example.com', '@');
 * @example
 * // => 'atomic'
 * substringBefore('atomic', ' ');
 */
export function substringBefore(text: string, separator: string): string {
  const index = text.indexOf(separator);

  if (index === -1) {
    return text;
  }

  return text.slice(0, index);
}