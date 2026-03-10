/**
 * @summary Gets the substring before the first occurrence of a separator.
 * @param text The input string.
 * @param separator The string to search for.
 * @returns The substring before the separator or the original string if not found.
 * @example
 * ```ts
 * takeBefore('@razomy/string', '.'); // => 'razomy'
 * ```
 * @example
 * ```ts
 * takeBefore('user@example.com', '@'); // => 'user'
 * ```
 * @example
 * ```ts
 * takeBefore('atomic', ' '); // => 'atomic'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function takeBefore(text: string, separator: string): string {
  const index = text.indexOf(separator);

  if (index === -1) {
    return text;
  }

  return text.slice(0, index);
}
