/**
 * @summary Create a random CSS linear gradient string.
 * @description Generates a CSS linear-gradient with a random angle (0–360°) and two random hex colors.
 * @returns A CSS linear-gradient string.
 * @example
 * ```ts
 * createCssGradient(); // => 'linear-gradient(142deg, #a3f1b7, #5e20c9)'
 * ```
 * @example
 * ```ts
 * createCssGradient(); // => 'linear-gradient(0deg, #000000, #ffffff)'
 * ```
 * @example
 * ```ts
 * createCssGradient(); // => 'linear-gradient(359deg, #ff00ff, #00ff00)'
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
import { createInt } from '@razomy/random';

const maxRgb = 0xffffff;

export function createCssGradient(): string {
  const angle = createInt(0, 360);
  const color1 = `#${createInt(0, maxRgb).toString(16).padStart(6, '0')}`;
  const color2 = `#${createInt(0, maxRgb).toString(16).padStart(6, '0')}`;

  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}
