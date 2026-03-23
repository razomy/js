import Vips from "wasm-vips";
import * as images from "@razomy/images";

/**
 * @summary Convert an image to grayscale.
 * @description Changes the colourspace of the provided image to black and white.
 * @param image The input image.
 * @returns The grayscale image.
 * @example
 * ```ts
 * const image = Vips.Image.newFromFile('input.jpg');
 * const grayImage = grayscale(image); // => Image
 * ```
 * @example
 * ```ts
 * const image = Vips.Image.black(100, 100);
 * const grayImage = grayscale(image); // => Image
 * ```
 * @example
 * ```ts
 * const image = Vips.Image.newFromMemory(buffer, 100, 100, 3, 'uchar');
 * const grayImage = grayscale(image); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function grayscale(image: images.Image): images.Image {
  return image.colourspace(Vips.Interpretation.b_w);
}
