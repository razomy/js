import Vips from 'wasm-vips';
import * as images from "@razomy/images";

/**
 * @summary Resize an image to a specific width and optional height.
 * @description Scales an image uniformly if only width is provided, or non-uniformly if both width and height are specified. Uses Lanczos3 interpolation by default.
 * @param image The source image to resize.
 * @param width The target width in pixels.
 * @param height The optional target height in pixels.
 * @param mode The interpolation kernel to use.
 * @returns The resized image.
 * @example
 * ```ts
 * resize(image, 800); // => Image
 * ```
 * @example
 * ```ts
 * resize(image, 800, 600); // => Image
 * ```
 * @example
 * ```ts
 * resize(image, 1920, 1080, Vips.Kernel.nearest); // => Image
 * ```
 * @complexity time O(w * h)
 * @complexity memory O(w * h)
 */
export function resize(
  image: images.Image,
  width: number,
  height?: number,
  mode: Vips.Kernel = Vips.Kernel.lanczos3
): images.Image {
  const scale = width / image.width;
  const vscale = height !== undefined ? height / image.height : scale;

  return image.resize(scale, { vscale, kernel: mode });
}
