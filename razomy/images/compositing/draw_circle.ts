import type Vips from 'wasm-vips';
import * as images from "@razomy/images";

/**
 * @summary Draw a filled circle on an image.
 * @description Creates a copy of the provided image and draws a filled circle at the specified coordinates with the given radius and color.
 * @param image The input image.
 * @param x The x-coordinate of the circle's center.
 * @param y The y-coordinate of the circle's center.
 * @param radius The radius of the circle.
 * @param color The color of the circle, represented as an array of color channel values.
 * @returns A new image instance with the drawn circle.
 * @example
 * ```ts
 * drawCircle(image, 50, 50, 25, [255, 0, 0]); // => Image
 * ```
 * @example
 * ```ts
 * drawCircle(image, 100, 100, 10, [0, 255, 0, 128]); // => Image
 * ```
 * @example
 * ```ts
 * drawCircle(image, 0, 0, 100, [0, 0, 255]); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function drawCircle(
  image: images.Image,
  x: number,
  y: number,
  radius: number,
  color: Vips.ArrayConstant
): images.Image {
  const canvas = image.copy();
  canvas.drawCircle(color, x, y, radius, { fill: true });
  return canvas;
}
