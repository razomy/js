import * as images from "@razomy/images";

/**
 * @summary Detect edges in an image.
 * @description Applies the Canny edge detection algorithm to the provided image and returns a new image with the detected edges.
 * @param image The image to process.
 * @returns The new image with detected edges.
 * @example
 * ```ts
 * detectEdges(image); // => Image
 * ```
 * @example
 * ```ts
 * detectEdges(photo); // => Image
 * ```
 * @example
 * ```ts
 * detectEdges(drawing); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function detectEdges(image: images.Image): images.Image {
  return image.canny();
}