import type Vips from 'wasm-vips';
import * as images from "@razomy/images";

/**
 * @summary Rotate an image.
 * @description Rotates an image by a specified angle in degrees. The empty space created by the rotation is filled with the provided background color.
 * @param image The source image.
 * @param angle The angle of rotation in degrees.
 * @param backgroundColor The background color to fill the empty space. Defaults to black [0, 0, 0].
 * @returns The newly rotated image.
 * @example
 * ```ts
 * rotate(image, 90); // => Image
 * ```
 * @example
 * ```ts
 * rotate(image, 45, [255, 255, 255]); // => Image
 * ```
 * @example
 * ```ts
 * rotate(image, 180, [255, 0, 0, 255]); // => Image
 * ```
 * @complexity time O(w * h)
 * @complexity memory O(w * h)
 */
export function rotate(
  image: images.Image,
  angle: number,
  backgroundColor: Vips.ArrayConstant = [0, 0, 0]
): images.Image {
  return image.rotate(angle, { background: backgroundColor });
}
