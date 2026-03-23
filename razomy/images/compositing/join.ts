import Vips from 'wasm-vips';
import * as images from "@razomy/images";

/**
 * @summary Join an array of images into a single image.
 * @description Concatenates multiple images either vertically or horizontally to create a single combined image.
 * @param images The array of images to join.
 * @param direction The direction to join the images.
 * @returns The joined image.
 * @example
 * ```ts
 * join([image1, image2]); // => Image
 * ```
 * @example
 * ```ts
 * join([image1, image2], Vips.Direction.horizontal); // => Image
 * ```
 * @example
 * ```ts
 * join([image1, image2, image3], Vips.Direction.vertical); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function join(
  images: images.Image[],
  direction: Vips.Direction = Vips.Direction.vertical
): images.Image {
  const across = direction === Vips.Direction.horizontal ? images.length : 1;

  return Vips.Image.arrayjoin(images as Vips.Image[], { across }) as unknown as images.Image;
}
