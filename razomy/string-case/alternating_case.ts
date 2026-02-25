/**
 * Convert string to aLtErNaTiNg cAsE (SpongeBob case).
 * Alternates cases based on the index of the character (ignoring spaces is optional, this implementation alternates strictly by character position).
 * @param text The text to convert.
 * @returns The alternating cased string.
 * @example
 * ```ts
 * alternatingCase('hello world'); // => 'hElLo wOrLd'
 * ```
 * @example
 * ```ts
 * alternatingCase('typescript'); // => 'tYpEsCrIpT'
 * ```
 */
export function alternatingCase(text: string): string {
  return text
    .split('')
    .map((char, index) => {
      // Четные индексы - строчные, нечетные - заглавные
      return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
    })
    .join('');
}
