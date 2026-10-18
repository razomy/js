import Vips from 'wasm-vips';
import * as images from '@razomy/images';

/**
 * @summary Remove the alpha channel from an image.
 * @description Removes the alpha channel from an image by flattening it against a specified background color. Returns the original image if it has no alpha channel.
 * @param image The input image.
 * @param background The background color used to replace the transparent areas.
 * @returns The image without an alpha channel.
 * @example
 * ```ts
 * const result = removeAlpha(image); // => Image
 * ```
 * @example
 * ```ts
 * const result = removeAlpha(image, [0, 0, 0]); // => Image
 * ```
 * @example
 * ```ts
 * const result = removeAlpha(image, [255, 0, 0]); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(1)
 */
export function removeAlpha(image: images.Image, background: Vips.ArrayConstant = [255, 255, 255]): images.Image {
  if (!image.hasAlpha()) {
    return image;
  }

  return image.flatten({ background });
}
