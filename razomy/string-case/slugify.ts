/**
 * Convert string to url friendly slug.
 * @param text The text to slugify.
 * @returns The slugified string.
 * @example
 * ```ts
 * slugify('Hello World'); // => 'hello-world'
 * ```
 * @example
 * ```ts
 * slugify('Foo & Bar'); // => 'foo-bar'
 * ```
 * @example
 * ```ts
 * slugify('Crème Brûlée'); // => 'creme-brulee'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
