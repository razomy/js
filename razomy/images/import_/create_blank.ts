import Vips from 'wasm-vips';

/**
 * @summary Create a blank image.
 * @description Creates a new blank Vips image with specified dimensions and background color.
 * @param width The width of the newly created image.
 * @param height The height of the newly created image.
 * @param background The background color represented as a single number or an array of numbers.
 * @returns The generated Vips image.
 * @example
 * ```ts
 * createBlank(100, 100); // => Image
 * ```
 * @example
 * ```ts
 * createBlank(800, 600, [255, 255, 255]); // => Image
 * ```
 * @example
 * ```ts
 * createBlank(500, 500, [255, 0, 0, 255]); // => Image
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function createBlank(
  width: number,
  height: number,
  background: number[] = [0, 0, 0, 0]
): Vips.Image {
  const bands =  background.length ;
  const canvas = Vips.Image.black(width, height, { bands }).add(background);

  if (bands === 3 || bands === 4) {
    return canvas.copy({ interpretation: Vips.Interpretation.srgb });
  }

  return canvas;
}
