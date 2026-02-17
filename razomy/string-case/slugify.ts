/**
 * Convert string to url friendly slug.
 * @param {string} text The text to slugify.
 * @returns {string} The slugified string.
 * @example
 * // => 'hello-world'
 * slugify('Hello World');
 * @example
 * // => 'foo-bar'
 * slugify('Foo & Bar');
 * @example
 * // => 'creme-brulee'
 * slugify('Crème Brûlée');
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}