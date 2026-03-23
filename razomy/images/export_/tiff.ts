import Vips from "wasm-vips";
import * as images from "@razomy/images";

/**
 * @summary Export an image to TIFF format buffer.
 * @description Converts the provided image to a TIFF format and returns it as a buffer array. Applies LZW compression and keeps all metadata by default.
 * @param image The image instance to export.
 * @returns The buffer containing the TIFF formatted image.
 * @example
 * ```ts
 * const tiffBuffer = tiff(image); // => Image
 * ```
 * @example
 * ```ts
 * await fs.promises.writeFile('output.tiff', tiff(image)); // => Image
 * ```
 * @example
 * ```ts
 * const response = new Response(tiff(image), { headers: { 'Content-Type': 'image/tiff' } }); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function tiff(image: images.Image): Uint8Array {
  return image.tiffsaveBuffer({
    keep: Vips.ForeignKeep.all,
    compression: Vips.ForeignTiffCompression.lzw,
    Q: 80
  });
}
