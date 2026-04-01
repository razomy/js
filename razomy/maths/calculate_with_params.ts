import nerdamer from "nerdamer/all.min.js";

/**
 * @summary Evaluates a mathematical expression from a string.
 * @description Parses and evaluates the given string as a mathematical expression using the mathjs library. It supports basic arithmetic, advanced mathematical functions, units, and complex operations. More https://nerdamer.com/examples.html
 * @param text The mathematical expression to evaluate.
 * @param arguments_ Mapping variable and its value.
 * @returns The evaluated result of the mathematical expression.
 * @example
 * ```ts
 * calculateWithParams('2+2'); // => 4
 * ```
 * @example
 * ```ts
 * calculateWithParams('x^2+y',{y:'x^2+8'}); // => 2*x^2+8
 * ```
 * @example
 * ```ts
 * calculateWithParams('x^2+2*(cos(x)+x*x)', {x:6}); // => 109.92034057330073
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function calculateWithParams(text: string, arguments_: object | null = null): string {
  return nerdamer(text, arguments_).text();
}
