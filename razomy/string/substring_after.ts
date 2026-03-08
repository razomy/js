/**
 * @summary Get the substring after the first occurrence of a separator.
 * @param text The input string.
 * @param separator The separator to look for.
 * @returns The substring after the separator, or the original string if separator is not found.
 * @example
 * ```ts
 * substringAfter('foo.bar', '.'); // => 'bar'
 * ```
 * @example
 * ```ts
 * substringAfter('foo.bar.baz', '.bar.'); // => 'baz'
 * ```
 * @example
 * ```ts
 * substringAfter('foo', ','); // => 'foo'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function substringAfter(text: string, separator: string): string {
  const index = text.indexOf(separator);

  return index === -1 ? text : text.slice(index + separator.length);
}
