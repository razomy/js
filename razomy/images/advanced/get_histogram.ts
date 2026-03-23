import * as images from "@razomy/images";

/**
 * @summary Get the histogram of an image.
 * @description Computes the frequency distribution of pixel intensities for the provided image.
 * @param image The image to process.
 * @returns The histogram array.
 * @example
 * ```ts
 * const img = new Image(2, 2);
 * getHistogram(img); // => Image
 * ```
 * @example
 * ```ts
 * getHistogram(darkImage); // => Image
 * ```
 * @example
 * ```ts
 * getHistogram(brightImage); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(1)
 */
export function getHistogram(image: images.Image): images.Image {
  return image.histFind();
}
