import * as images from '@razomy/images';

/**
 * @summary Trim an image by removing its monotonous background.
 * @description Finds the trim boundaries of an image using a threshold and extracts the trimmed area.
 * @param image The image to trim.
 * @param threshold The background detection threshold.
 * @returns The trimmed image.
 * @example
 * ```ts
 * trim(image); // => Image
 * ```
 * @example
 * ```ts
 * trim(image, 20); // => Image
 * ```
 * @example
 * ```ts
 * trim(image, 5); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function trim(image: images.Image, threshold: number = 10): images.Image {
  const { left, top, width, height } = image.findTrim({ threshold });

  return image.extractArea(left, top, width, height);
}
