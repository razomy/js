import Vips from 'wasm-vips';
import * as images from '@razomy/images';

/**
 * @summary Draw a line on an image.
 * @description Creates a copy of the provided image and draws a line from the starting coordinates to the ending coordinates using the specified color.
 * @param image The source image.
 * @param x1 The starting X coordinate.
 * @param y1 The starting Y coordinate.
 * @param x2 The ending X coordinate.
 * @param y2 The ending Y coordinate.
 * @param color The color of the line.
 * @returns The new image with the drawn line.
 * @example
 * ```ts
 * drawLine(image, 0, 0, 100, 100, [255, 0, 0]); // => Image
 * ```
 * @example
 * ```ts
 * drawLine(image, 10, 20, 10, 80, [0, 255, 0]); // => Image
 * ```
 * @example
 * ```ts
 * drawLine(image, 0, 50, 100, 50, [0, 0, 255]); // => Image
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function drawLine(
  image: images.Image,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: Vips.ArrayConstant,
): images.Image {
  const canvas = image.copy();
  canvas.drawLine(color, x1, y1, x2, y2);
  return canvas;
}
