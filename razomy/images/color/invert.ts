import * as images from "@razomy/images";

/**
 * @summary Invert image colors.
 * @description Invert the colors of the given image.
 * @param image The image.
 * @returns The inverted image.
 * @example
 * ```ts
 * invert(image); // => Image
 * ```
 * @example
 * ```ts
 * invert(createImage(100, 100)); // => Image
 * ```
 * @example
 * ```ts
 * invert(decode('image.png')); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function invert(image: images.Image): images.Image {
  return image.invert();
}
