import * as images from "@razomy/images";

/**
 * @summary Extract a specific color channel from an image.
 * @description Extract a specific color channel from an image by its index.
 * @param image The source image.
 * @param channelIndex The index of the channel to extract.
 * @returns The extracted channel.
 * @example
 * ```ts
 * extractChannel(image, 0); // => Image
 * ```
 * @example
 * ```ts
 * extractChannel(image, 1); // => Image
 * ```
 * @example
 * ```ts
 * extractChannel(image, 3); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function extractChannel(image: images.Image, channelIndex: number): images.Image {
  return image.extractBand(channelIndex);
}