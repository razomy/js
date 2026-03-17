/**
 * @summary Convert string to kebab case.
 * @description Converts a given string to kebab-case by handling acronyms, camelCase, letter-number boundaries,
 * and various delimiters (spaces, underscores, hyphens, dots). Leading and trailing separators are stripped,
 * and the result is lowercased.
 * @param text The text to convert.
 * @returns The kebab cased string.
 * @example
 * ```ts
 * kebabCase('fooBar'); // => 'foo-bar'
 * ```
 * @example
 * ```ts
 * kebabCase('Foo Bar'); // => 'foo-bar'
 * ```
 * @example
 * ```ts
 * kebabCase('__FOO_BAR__'); // => 'foo-bar'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function kebabCase(text: string): string {
  return (
    text // 1. Handle Acronyms: 'JSONData' -> 'JSON_Data'
      // Looks for Capital followed by Capital+Lower
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')

      // 2. Handle CamelCase: 'camelCase' -> 'camel_Case'
      // Looks for Lower followed by Capital
      .replace(/([a-z])([A-Z])/g, '$1-$2')

      // 3. Handle Letters to Numbers: 'version2' -> 'version_2'
      .replace(/([a-zA-Z])([0-9])/g, '$1-$2')

      // 4. Handle Numbers to Letters: '2beta' -> '2_beta'
      .replace(/([0-9])([a-zA-Z])/g, '$1-$2')

      // 5. Replace delimiters (spaces, hyphens, dots) with a single underscore
      // This collapses multiple separators (e.g. ' - ' becomes '-')
      .replace(/[ |_\-\.]+/g, '-')
      // from _text_ -> text
      .replace(/^[_-]+|[_-]+$/g, '')

      // 6. Final lowercase
      .toLowerCase()
  );
}
