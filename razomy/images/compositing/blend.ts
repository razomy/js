import Vips from 'wasm-vips';
import * as images from '@razomy/images';

/**
 * @summary Blends two images together using a specified blend mode and opacity.
 * @description Composites an overlay image onto a base image. Supports various blend modes (e.g., over, multiply, screen) and adjustable overlay opacity. Memory is automatically managed for temporary intermediate images.
 * @param base The base image.
 * @param overlay The overlay image to composite on top of the base image.
 * @param mode The blending mode to use.
 * @param opacity The opacity multiplier for the overlay image, ranging from 0.0 to 1.0.
 * @returns The newly blended image.
 * @example
 * ```ts
 * blend(baseImage, overlayImage); // => Image
 * ```
 * @example
 * ```ts
 * blend(baseImage, overlayImage, Vips.BlendMode.multiply); // => Image
 * ```
 * @example
 * ```ts
 * blend(baseImage, overlayImage, Vips.BlendMode.screen, 0.5); // => Image
 * ```
 * @complexity time O(w * h)
 * @complexity memory O(w * h)
 */
export function blend(
  base: images.Image,
  overlay: images.Image,
  mode: Vips.BlendMode = Vips.BlendMode.over,
  opacity: number = 1.0,
): images.Image {
  let top = overlay;

  if (opacity < 1.0) {
    top = overlay.linear([1, 1, 1, opacity], [0]);
  }

  const result = base.composite2(top, mode);

  if (opacity < 1.0) {
    top.delete();
  }

  return result;
}
