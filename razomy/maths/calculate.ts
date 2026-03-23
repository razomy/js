import * as math from 'mathjs';

/**
 * @summary Evaluates a mathematical expression from a string.
 * @description Parses and evaluates the given string as a mathematical expression using the mathjs library. It supports basic arithmetic, advanced mathematical functions, units, and complex operations. More https://mathjs.org/examples/index.html
 * @param text The mathematical expression to evaluate.
 * @returns The evaluated result of the mathematical expression.
 * @example
 * ```ts
 * calculate('1.2 * (2 + 4.5)'); // => 7.8
 * ```
 * @example
 * ```ts
 * calculate('sin(45 deg) ^ 2'); // => 0.5
 * ```
 * @example
 * ```ts
 * calculate('5.08 cm to inch'); // => 2 inch
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function calculate(text: string): string {
  return math.evaluate(text) as string;
}
