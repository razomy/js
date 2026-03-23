import * as images from "@razomy/images";

/**
 * @summary Sharpen an image.
 * @description Applies a sharpening filter to the provided image using the specified intensity.
 * @param image The image to sharpen.
 * @param intensity The intensity of the sharpening effect.
 * @returns The sharpened image.
 * @example
 * ```ts
 * sharpen(image); // => Image
 * ```
 * @example
 * ```ts
 * sharpen(image, 2.5); // => Image
 * ```
 * @example
 * ```ts
 * sharpen(image, 0.5); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function sharpen(image: images.Image, intensity: number = 1): images.Image {
  return image.sharpen({ sigma: intensity });
}