/**
 * @summary Convert string to CONSTANT_CASE (macro case).
 * @description Converts a given string from any common casing convention (camelCase, kebab-case,
 * snake_case, space-separated, etc.) to CONSTANT_CASE (also known as macro case or screaming snake case),
 * where all letters are uppercased and words are separated by underscores.
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
