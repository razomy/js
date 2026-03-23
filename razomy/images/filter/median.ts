import * as images from "@razomy/images";

/**
 * @summary Apply a median filter to an image.
 * @description Applies a median filter to the given image to reduce noise, using a square matrix of the specified size.
 * @param image The source image.
 * @param size The size of the median filter matrix (default is 3).
 * @returns A new image with the median filter applied.
 * @example
 * ```ts
 * median(image); // => Image
 * ```
 * @example
 * ```ts
 * median(image, 5); // => Image
 * ```
 * @example
 * ```ts
 * median(image, 7); // => Image
 * ```
 * @complexity time O(w * h * s^2)
 * @complexity memory O(w * h)
 */
export function median(image: images.Image, size: number = 3): images.Image {
  return image.median(size);
}