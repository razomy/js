import * as random from "@razomy/random";

const maxRgb = 0xffffff;
const maxAngle = 360;
const hexLength = 6;

/**
 * @summary Create a random CSS linear gradient string.
 * @description Generates a CSS linear-gradient with a random angle (0–360°) and two random hex colors.
 * @returns A CSS linear-gradient string.
 * @example
 * ```ts
 * createCssGradient(); // => 'linear-gradient(142deg, #a3f0b1, #0d44ec)'
 * ```
 * @example
 * ```ts
 * createCssGradient(); // => 'linear-gradient(0deg, #000000, #ffffff)'
 * ```
 * @example
 * ```ts
 * createCssGradient(); // => 'linear-gradient(270deg, #ff6347, #4682b4)'
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function createCssGradient(): string {
  const angle = random.createInt(0, maxAngle);
  const color1 = `#${random.createInt(0, maxRgb).toString(16).padStart(hexLength, '0')}`;
  const color2 = `#${random.createInt(0, maxRgb).toString(16).padStart(hexLength, '0')}`;

  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}
