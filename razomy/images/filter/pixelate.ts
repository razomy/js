import * as images from "@razomy/images";

/**
 * @summary Pixelate an image.
 * @description Creates a pixelated version of the provided image by scaling it down and then scaling it back up. Intermediate resources are safely freed.
 * @param image The image to pixelate.
 * @param pixelSize The scale factor to determine the size of the pixels.
 * @returns A new pixelated image.
 * @example
 * ```ts
 * pixelate(image); // => Image
 * ```
 * @example
 * ```ts
 * pixelate(image, 5); // => Image
 * ```
 * @example
 * ```ts
 * pixelate(image, 20); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function pixelate(image: images.Image, pixelSize: number = 10): images.Image {
  const small = image.shrink(pixelSize, pixelSize);

  try {
    return small.zoom(pixelSize, pixelSize);
  } finally {
    small.delete();
  }
}
