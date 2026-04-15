import * as images from '@razomy/images';

/**
 * @summary Add an alpha channel to an image.
 * @description Evaluates the number of bands in the given image and appends an alpha channel with the specified value if it does not already exist.
 * @param image The source image.
 * @param alphaValue The alpha channel value to apply.
 * @returns The image with an alpha channel.
 * @example
 * ```ts
 * const image = { bands: 3, bandjoin: (v) => ({ bands: 4 }) } as Image;
 * addAlpha(image); // => returns image with 4 bands
 * ```
 * @example
 * ```ts
 * const image = { bands: 1, bandjoin: (v) => ({ bands: 2 }) } as Image;
 * addAlpha(image, 128); // => returns image with 2 bands and 128 alpha
 * ```
 * @example
 * ```ts
 * const image = { bands: 4, bandjoin: (v) => ({ bands: 5 }) } as Image;
 * addAlpha(image); // => returns the original image (already has alpha)
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function addAlpha(image: images.Image, alphaValue: number = 255): images.Image {
  if (image.bands === 4 || image.bands === 2) {
    return image;
  }

  return image.bandjoin(alphaValue);
}
