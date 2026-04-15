import Vips from 'wasm-vips';
import * as images from '@razomy/images';

/**
 * @summary Composite an overlay image onto a base image.
 * @description Blends an overlay image onto a base image at the specified x and y coordinates using a given blend mode.
 * @param baseImage The base image to be drawn upon.
 * @param overlayImage The image to overlay onto the base image.
 * @param x The x-coordinate where the overlay should be placed.
 * @param y The y-coordinate where the overlay should be placed.
 * @param mode The blending mode to apply.
 * @returns The resulting composited image.
 * @example
 * ```ts
 * composite(baseImage, overlayImage, 0, 0); // => Image
 * ```
 * @example
 * ```ts
 * composite(baseImage, overlayImage, 10, 10, Vips.BlendMode.multiply); // => Image
 * ```
 * @example
 * ```ts
 * composite(baseImage, overlayImage, 50, 100, Vips.BlendMode.screen); // => Image
 * ```
 * @complexity time O(w * h)
 * @complexity memory O(w * h)
 */
export function composite(
  baseImage: images.Image,
  overlayImage: images.Image,
  x: number,
  y: number,
  mode: Vips.BlendMode = Vips.BlendMode.over,
): images.Image {
  return baseImage.composite(overlayImage, mode, { x, y });
}
