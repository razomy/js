import * as images from '@razomy/images';

/**
 * @summary Apply morphological dilation to an image.
 * @description Performs morphological dilation, which expands bright areas and reduces dark areas in the image. It is implemented using a maximum rank filter over a square neighborhood of the specified size.
 * @param image The target image to process.
 * @param size The size of the structuring element (square neighborhood).
 * @returns The dilated image.
 * @example
 * ```ts
 * dilate(image); // => Image
 * ```
 * @example
 * ```ts
 * dilate(image, 5); // => Image
 * ```
 * @example
 * ```ts
 * dilate(image, 7); // => Image
 * ```
 * @complexity time O(w * h * size^2)
 * @complexity memory O(w * h)
 */
export function dilate(image: images.Image, size: number = 3): images.Image {
  const maxIndex = size * size - 1;
  return image.rank(size, size, maxIndex);
}
