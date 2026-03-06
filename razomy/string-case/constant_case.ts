/**
 * @summary Convert string to CONSTANT_CASE (macro case).
 * @param text The text to convert.
 * @returns The constant cased string.
 * @example
 * ```ts
 * constantCase('hello world'); // => 'HELLO_WORLD'
 * ```
 * @example
 * ```ts
 * constantCase('camelCaseString'); // => 'CAMEL_CASE_STRING'
 * ```
 * @example
 * ```ts
 * constantCase('kebab-case-test'); // => 'KEBAB_CASE_TEST'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function constantCase(text: string): string {
  if (!text) return '';
  return (
    text
      // Вставляем пробел между маленькой и большой буквой (camelCase -> camel Case)
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Заменяем все не буквенно-цифровые символы на пробелы
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .split(/\s+/)
      .map((word) => word.toUpperCase())
      .join('_')
  );
}
