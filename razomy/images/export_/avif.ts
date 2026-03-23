import Vips from 'wasm-vips';
import * as images from "@razomy/images";

/**
 * @summary Export an image to AVIF format.
 * @description Encodes the provided image instance into an AVIF formatted buffer utilizing AV1 compression.
 * @param image The source image instance.
 * @returns The AVIF image buffer.
 * @example
 * ```ts
 * const buffer = avif(image); // => Image
 * ```
 * @example
 * ```ts
 * const response = new Response(avif(image)); // => Image
 * ```
 * @example
 * ```ts
 * const byteLength = avif(image).byteLength; // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function avif(image: images.Image): Uint8Array {
  return image.heifsaveBuffer({
    keep: Vips.ForeignKeep.all,
    compression: Vips.ForeignHeifCompression.av1,
    Q: 60,
    effort: 4
  });
}
