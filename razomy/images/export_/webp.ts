import Vips from 'wasm-vips';
import * as images from "@razomy/images";

export interface WebpOptions {
  keep?: number;
  q?: number;
  effort?: number;
  lossless?: boolean;
  [key: string]: unknown;
}

/**
 * @summary Export image to WebP.
 * @description Encodes and exports the given image into a WebP formatted buffer.
 * @param image The Vips image instance.
 * @param options The optional WebP encoding options.
 * @returns The WebP encoded buffer.
 * @throws {Error} Throws if the image cannot be encoded to WebP.
 * @example
 * ```ts
 * webp(image); // => Uint8Array( [ ... ] )
 * ```
 * @example
 * ```ts
 * webp(image, { Q: 100 }); // => Uint8Array( [ ... ] )
 * ```
 * @example
 * ```ts
 * webp(image, { lossless: true, effort: 6 }); // => Uint8Array( [ ... ] )
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function webp(image: images.Image, options?: WebpOptions): Uint8Array {
  return image.webpsaveBuffer({
    keep: Vips.ForeignKeep.all,
    Q: 80,
    effort: 4,
    lossless: false,
    ...options
  });
}