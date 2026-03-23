import Vips from 'wasm-vips';
import * as images from "@razomy/images";

/**
 * @summary Apply an emboss filter to the image.
 * @description Applies an emboss convolution matrix to the given image to create a 3D shadow effect.
 * @param image The image to process.
 * @returns The embossed image.
 * @example
 * ```ts
 * emboss(image); // => Image
 * ```
 * @example
 * ```ts
 * emboss(Vips.Image.newFromFile('input.jpg')); // => Image
 * ```
 * @example
 * ```ts
 * emboss(Vips.Image.black(100, 100)); // => Image
 * ```
 * @complexity time O(w * h)
 * @complexity memory O(w * h)
 */
export function emboss(image: images.Image): images.Image {
  const matrix = Vips.Image.newFromArray([
    [-1, -1, 0],
    [-1, 1, 1],
    [0, 1, 1]
  ] as any);

  return image.conv(matrix);
}
