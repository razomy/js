/**
 * Strip HTML tags from a string.
 * @param content - The input string to strip tags from.
 * @returns The string without HTML tags.
 * @example
 * ```ts
 * // => 'Hello world'
 * stripTags('<p>Hello world</p>');
 * @example
 * ```ts
 * // => 'Link'
 * stripTags('<a href="https://example.com">Link</a>');
 * @example
 * ```ts
 * // => 'content'
 * stripTags('<div><span>content</span></div>');
 */
export function stripTags(content: string): string {
  return content.replace(/<[^>]*>/g, '');
}
