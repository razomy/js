import * as images from "@razomy/images";

/**
 * @summary Normalize image contrast.
 * @description Automatically stretches the image histogram to improve overall contrast.
 * @param image The input image.
 * @returns The normalized image.
 * @example
 * ```ts
 * const normalizedImage = normalize(image); // => Image
 * ```
 * @example
 * ```ts
 * const improvedImage = normalize(fadedImage); // => Image
 * ```
 * @example
 * ```ts
 * const result = normalize(sourceImage); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function normalize(image: images.Image): images.Image {
  return image.histNorm();
}
