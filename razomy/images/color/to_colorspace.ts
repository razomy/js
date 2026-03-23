import Vips from "wasm-vips";
import * as images from "@razomy/images";

/**
 * @summary Convert an image to a specified colorspace.
 * @description Transforms the color profile of the given image to the target colorspace interpretation using the libvips engine.
 * @param image The source image.
 * @param space The target colorspace interpretation.
 * @returns The new image in the specified colorspace.
 * @example
 * ```ts
 * toColorspace(image, Vips.Interpretation.srgb); // => Image
 * ```
 * @example
 * ```ts
 * toColorspace(image, Vips.Interpretation.cmyk); // => Image
 * ```
 * @example
 * ```ts
 * toColorspace(image, Vips.Interpretation.b_w); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function toColorspace(image: images.Image, space: Vips.Interpretation): images.Image {
  return image.colourspace(space);
}
