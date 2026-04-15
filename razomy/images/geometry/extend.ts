import Vips from 'wasm-vips';
import * as images from '@razomy/images';

/**
 * @summary Extend image boundaries.
 * @description Extend image boundaries by adding padding to the left, right, top, and bottom with a specified background color.
 * @param image The source image.
 * @param left The number of pixels to add to the left edge.
 * @param right The number of pixels to add to the right edge.
 * @param top The number of pixels to add to the top edge.
 * @param bottom The number of pixels to add to the bottom edge.
 * @param background The background color array used for padding.
 * @returns The extended image.
 * @example
 * ```ts
 * extend(image, 10, 10, 10, 10); // => Image
 * ```
 * @example
 * ```ts
 * extend(image, 0, 50, 0, 50, [255, 255, 255, 255]); // => Image
 * ```
 * @example
 * ```ts
 * extend(image, 5, 5, 0, 0, [255, 0, 0]); // => Image
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function extend(
  image: images.Image,
  left: number,
  right: number,
  top: number,
  bottom: number,
  background: Vips.ArrayConstant = [0, 0, 0, 0],
): images.Image {
  return image.embed(left, top, image.width + left + right, image.height + top + bottom, {
    extend: Vips.Extend.background,
    background,
  }) as images.Image;
}
