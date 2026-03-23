import * as images from "@razomy/images";

/**
 * @summary Apply a Gaussian blur filter to an image.
 * @description Apply a Gaussian blur filter to an image with the specified radius.
 * @param image The image to apply the blur to.
 * @param radius The radius of the blur effect.
 * @returns The blurred image.
 * @example
 * ```ts
 * blur(image); // => Image
 * ```
 * @example
 * ```ts
 * blur(image, 3); // => Image
 * ```
 * @example
 * ```ts
 * blur(image, 10); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function blur(image: images.Image, radius: number = 1): images.Image {
  return image.gaussblur(radius);
}
