import * as images from '@razomy/images';

/**
 * @summary Applies gamma correction to an image.
 * @description Adjusts the gamma level of an image using the specified exponent value.
 * @param image The image to process.
 * @param value The gamma correction value.
 * @returns The processed image.
 * @example
 * ```ts
 * gamma(image); // => Image // Uses default value 2.2
 * ```
 * @example
 * ```ts
 * gamma(image, 1.5); // => Image
 * ```
 * @example
 * ```ts
 * gamma(image, 0.8); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function gamma(image: images.Image, value: number = 2.2): images.Image {
  return image.gamma({ exponent: 1 / value });
}
