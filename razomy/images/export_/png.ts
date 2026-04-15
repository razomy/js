import Vips from 'wasm-vips';
import * as images from "@razomy/images";
import * as fsFileFormat from "@razomy/fs-file-format";

/**
 * @summary Export image to PNG buffer.
 * @description Exports the given image to a Uint8Array buffer formatted as a PNG. It uses a compression level of 8, palette optimization, and an effort level of 7 while keeping all foreign metadata.
 * @param image The image to export.
 * @returns The PNG image buffer.
 * @example
 * ```ts
 * const buffer = png(image); // => Image
 * ```
 * @example
 * ```ts
 * const size = png(image).byteLength; // => Image
 * ```
 * @example
 * ```ts
 * await fs.promises.writeFile('output.png', png(image)); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function png(image: images.Image): fsFileFormat.ExtensionResult {
  return images.import_.setFile(image.pngsaveBuffer({
    keep: Vips.ForeignKeep.all,
    compression: 8,
    palette: true,
    effort: 7
  }), 'png');
}
