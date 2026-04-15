import * as images from '@razomy/images';

/**
 * @summary Create an optimized thumbnail of an image.
 * @description Generates a scaled-down version of the provided image using a fast, highly optimized reduction algorithm.
 * @param image The source image to generate the thumbnail from.
 * @param width The target width of the thumbnail.
 * @param height The target height of the thumbnail.
 * @returns The newly created thumbnail image.
 * @example
 * ```ts
 * const thumb = thumbnail(image, 150, 150); // => Image
 * ```
 * @example
 * ```ts
 * const avatar = thumbnail(image, 64, 64); // => Image
 * ```
 * @example
 * ```ts
 * const preview = thumbnail(image, 1280, 720); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function thumbnail(image: images.Image, width: number, height: number): images.Image {
  return image.thumbnailImage(width, { height });
}
