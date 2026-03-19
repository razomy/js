import { createInt } from './create_int';
/**
 * @summary Create a random light hex color string.
 * @description Generates a random hex color in the light spectrum by constraining
 * each RGB channel to the range [127, 255], producing pastel/light colors.
 * @returns A hex color string in the format `#rrggbb`.
 * @example
 * ```ts
 * createLightHexColor(); // => '#a3f0c7'
 * ```
 * @example
 * ```ts
 * createLightHexColor(); // => '#e2b4ff'
 * ```
 * @example
 * ```ts
 * createLightHexColor(); // => '#7ff89d'
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */

export function createLightHexColor(): string {
  const r: string = createInt(127, 255).toString(16).padStart(2, '0');
  const g: string = createInt(127, 255).toString(16).padStart(2, '0');
  const b: string = createInt(127, 255).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
}
