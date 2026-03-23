import * as images from "@razomy/images";

/**
 * @summary Adjust the contrast of an image.
 * @description Applies a linear transformation to adjust the contrast of an image based on a multiplier value.
 * @param image The image to process.
 * @param value The contrast multiplier.
 * @returns The image with adjusted contrast.
 * @example
 * ```ts
 * contrast(image, 1.5); // => Image
 * ```
 * @example
 * ```ts
 * contrast(image, 0.8); // => Image
 * ```
 * @example
 * ```ts
 * contrast(image, 1.0); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function contrast(image: images.Image, value: number): images.Image {
  return image.linear([value], [128 * (1 - value)]);
}