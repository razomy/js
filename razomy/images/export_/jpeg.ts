import Vips from 'wasm-vips';
import * as images from "@razomy/images";

/**
 * @summary Export an image to JPEG format.
 * @description Exports the provided image into a JPEG buffer array using optimized coding, 80% quality, and no chroma subsampling.
 * @param image The Vips image object to export.
 * @returns The Uint8Array containing the JPEG image data.
 * @example
 * ```ts
 * const buffer = jpeg(sourceImage); // => Image
 * ```
 * @example
 * ```ts
 * const avatarBuffer = jpeg(resizedAvatar); // => Image
 * ```
 * @example
 * ```ts
 * const backgroundBuffer = jpeg(heroBanner); // => Image
 * ```
 * @complexity time O(w * h)
 * @complexity memory O(w * h)
 */
export function jpeg(image: images.Image): Uint8Array {
  return image.jpegsaveBuffer({
    Q: 80,
    keep: Vips.ForeignKeep.all,
    optimize_coding: true,
    subsample_mode: Vips.ForeignSubsample.off
  });
}
