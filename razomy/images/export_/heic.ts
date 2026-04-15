import Vips from 'wasm-vips';
import * as images from "@razomy/images";
import * as fsFileFormat from "@razomy/fs-file-format";

/**
 * @summary Export image to HEIC format.
 * @description Converts and exports the given image to a HEIC format buffer using HEVC compression.
 * @param image The image to export.
 * @param quality The compression quality of the exported image.
 * @returns The HEIC image buffer.
 * @example
 * ```ts
 * const buffer = heic(image); // => Image
 * ```
 * @example
 * ```ts
 * const buffer = heic(image, 80); // => Image
 * ```
 * @example
 * ```ts
 * const buffer = heic(image, 100); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function heic(image: images.Image, quality: number = 65): fsFileFormat.ExtensionResult {
  return images.import_.setFile(image.heifsaveBuffer({
    keep: Vips.ForeignKeep.all,
    compression: Vips.ForeignHeifCompression.hevc,
    Q: quality
  }), 'heic');
}
