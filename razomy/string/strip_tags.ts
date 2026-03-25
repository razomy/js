/**
 * @summary Strip HTML tags from a string.
 * @description Strip HTML tags from a string.
 * @param content - The input string to strip tags from.
 * @returns The string without HTML tags.
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
