import * as images from '@razomy/images';

/**
 * @summary Apply an unsharp mask filter to an image.
 * @description Enhances the sharpness of an image using an unsharp mask technique. The `sigma` parameter controls the radius of the blur, `x1` controls the sharpening strength, and `y2` sets the threshold level.
 * @param image The image to process.
 * @param sigma The standard deviation of the Gaussian blur.
 * @param x1 The strength of the sharpening effect.
 * @param y2 The threshold to apply the sharpening.
 * @returns The sharpened image.
 * @example
 * ```ts
 * unsharpMask(image); // => Image
 * ```
 * @example
 * ```ts
 * unsharpMask(image, 2.0); // => Image
 * ```
 * @example
 * ```ts
 * unsharpMask(image, 1.5, 2.0, 15); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function unsharpMask(image: images.Image, sigma: number = 1.0, x1: number = 1.5, y2: number = 20): images.Image {
  return image.sharpen({ sigma, x1, y2 });
}
