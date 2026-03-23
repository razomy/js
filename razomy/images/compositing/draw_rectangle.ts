import type Vips from 'wasm-vips';
import * as images from "@razomy/images";

/**
 * @summary Draw a filled rectangle on an image.
 * @description Creates a copy of the given image and draws a filled rectangle at the specified coordinates with the provided dimensions and color.
 * @param image The source image.
 * @param x The x-coordinate of the top-left corner.
 * @param y The y-coordinate of the top-left corner.
 * @param width The width of the rectangle.
 * @param height The height of the rectangle.
 * @param color The color of the rectangle.
 * @returns The new image with the rectangle drawn.
 * @example
 * ```ts
 * drawRectangle(image, 0, 0, 10, 10, [0, 0, 0]); // => Image
 * ```
 * @example
 * ```ts
 * drawRectangle(image, 10, 10, 50, 50, [255, 0, 0]); // => Image
 * ```
 * @example
 * ```ts
 * drawRectangle(image, 5, 5, 100, 20, [0, 0, 255, 255]); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function drawRectangle(
  image: images.Image,
  x: number,
  y: number,
  width: number,
  height: number,
  color: Vips.ArrayConstant
): images.Image {
  const canvas = image.copy();
  
  canvas.drawRect(color, x, y, width, height, { fill: true });
  
  return canvas;
}