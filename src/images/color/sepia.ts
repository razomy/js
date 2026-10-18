import * as images from '@razomy/images';

/**
 * @summary Apply a sepia filter to an image.
 * @description Recombines the color channels of the image using a sepia transformation matrix to produce a vintage, warm-toned effect.
 * @param image The input image to be processed.
 * @returns The processed image with the sepia effect applied.
 * @example
 * ```ts
 * const image = new Image(100, 100);
 * sepia(image); // => Image
 * ```
 * @example
 * ```ts
 * const image = await readImage('input.png');
 * sepia(image); // => Image
 * ```
 * @example
 * ```ts
 * const image = parseImage(rawBuffer);
 * sepia(image); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function sepia(image: images.Image): images.Image {
  const matrix = [
    [0.3588, 0.7044, 0.1368],
    [0.299, 0.587, 0.114],
    [0.2392, 0.4696, 0.0912],
  ] as const;

  return image.recomb(matrix as unknown as number[]);
}
