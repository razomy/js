import * as images from '@razomy/images';

/**
 * @summary Apply threshold to an image.
 * @description Applies a fixed-level threshold to the image, returning a new binary image where values greater than the given level are evaluated.
 * @param image The source image.
 * @param level The threshold level.
 * @returns The thresholded image.
 * @example
 * ```ts
 * threshold(image); // => Image //  Uses default level 128
 * ```
 * @example
 * ```ts
 * threshold(image, 100); // => Image
 * ```
 * @example
 * ```ts
 * threshold(image, 200); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function threshold(image: images.Image, level: number = 128): images.Image {
  return image.more(level);
}
