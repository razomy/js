import * as images from '@razomy/images';

/**
 * @summary Apply morphological erosion to an image.
 * @description Performs morphological erosion on the image using a square structuring element of the given size. This operation expands dark regions and shrinks bright regions by applying a local minimum filter.
 * @param image The input image.
 * @param size The size of the square structuring element.
 * @returns The eroded image.
 * @example
 * ```ts
 * erode(image); // => Image // instance with default kernel size 3
 * ```
 * @example
 * ```ts
 * erode(image, 5); // => Image // instance with kernel size 5
 * ```
 * @example
 * ```ts
 * erode(image, 7); // => Image // instance with kernel size 7
 * ```
 * @complexity time O(w * h * size^2)
 * @complexity memory O(w * h)
 */
export function erode(image: images.Image, size: number = 3): images.Image {
  return image.rank(size, size, 0);
}
