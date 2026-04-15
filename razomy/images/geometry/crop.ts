import * as images from '@razomy/images';

/**
 * @summary Crop an image to the specified dimensions.
 * @description Crops the given image starting at coordinates (x, y) with the specified width and height.
 * @param image The source image to crop.
 * @param x The x-coordinate of the top-left corner of the crop box.
 * @param y The y-coordinate of the top-left corner of the crop box.
 * @param width The width of the cropped image.
 * @param height The height of the cropped image.
 * @returns The new cropped image.
 * @example
 * ```ts
 * crop(image, 0, 0, 100, 100); // => Image
 * ```
 * @example
 * ```ts
 * crop(image, 50, 50, 200, 150); // => Image
 * ```
 * @example
 * ```ts
 * crop(image, 10, 20, 30, 40); // => Image
 * ```
 * @complexity time O(width * height)
 * @complexity memory O(width * height)
 */
export function crop(image: images.Image, x: number, y: number, width: number, height: number): images.Image {
  return image.crop(x, y, width, height);
}
