/**
 * Strip HTML tags from a string.
 * @param content - The input string to strip tags from.
 * @returns The string without HTML tags.
 * @example
 * // => 'Hello world'
 * stripTags('<p>Hello world</p>');
 * @example
 * // => 'Link'
 * stripTags('<a href="https://example.com">Link</a>');
 * @example
 * // => 'content'
 * stripTags('<div><span>content</span></div>');
 */
export function stripTags(content: string): string {
  return content.replace(/<[^>]*>/g, '');
}