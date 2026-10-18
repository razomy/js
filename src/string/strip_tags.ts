/**
 * @summary Strip HTML tags from a string.
 * @description Removes all HTML tags from a given string.
 * @param content The input string potentially containing HTML tags.
 * @returns The string with all HTML tags removed.
 * @example
 * ```ts
 * stripTags('<p>Hello world</p>'); // => 'Hello world'
 * ```
 * @example
 * ```ts
 * stripTags('<a href="https://example.com">Link</a>'); // => 'Link'
 * ```
 * @example
 * ```ts
 * stripTags('<div><span>content</span></div>'); // => 'content'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function stripTags(content: string): string {
  return content.replace(/<[^>]*>/g, '');
}
