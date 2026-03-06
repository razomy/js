/**
 * @summary Convert string to aLtErNaTiNg cAsE (SpongeBob case).
 * @description Alternates cases based on the index of the character (ignoring spaces is optional, this implementation alternates strictly by character position).
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
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function alternatingCase(text: string): string {
  return text
    .split(/([\s-]+)/)
    .map((word) =>
      word
        .split('')
        .map((char, index) => {
          // Четные индексы - строчные, нечетные - заглавные
          return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        })
        .join(''),
    )
    .join('');
}
