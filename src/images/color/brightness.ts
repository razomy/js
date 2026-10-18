import * as images from '@razomy/images';

/**
 * @summary Adjust the brightness of an image.
 * @description Multiplies the pixel values of the image by a specified multiplier to adjust its brightness. A value of 1.0 indicates no change, values greater than 1.0 increase brightness, and values between 0.0 and 1.0 decrease brightness.
 * @param image The image to process.
 * @param value The brightness multiplier.
 * @returns The new image with adjusted brightness.
 * @example
 * ```ts
 * brightness(image, 1.0); // => Image (no change)
 * ```
 * @example
 * ```ts
 * brightness(image, 2.0); // => Image (double brightness)
 * ```
 * @example
 * ```ts
 * brightness(image, 0.5); // => Image (half brightness)
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function brightness(image: images.Image, value: number): images.Image {
  return image.linear([value], [0]);
}
