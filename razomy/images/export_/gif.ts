import Vips from 'wasm-vips';
import * as images from "@razomy/images";
import * as fsFileFormat from "@razomy/fs-file-format";
import {setFile} from "../import_";

/**
 * @summary Export image to GIF format buffer.
 * @description Converts and saves the provided image as a GIF buffer with maximum metadata retention and high compression effort.
 * @param image The image to export.
 * @returns The exported GIF buffer as a Uint8Array.
 * @example
 * ```ts
 * const buffer = gif(image); // => Image
 * ```
 * @example
 * ```ts
 * await fs.promises.writeFile('output.gif', gif(image)); // => Image
 * ```
 * @example
 * ```ts
 * const base64 = Buffer.from(gif(image)).toString('base64'); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function gif(image: images.Image): fsFileFormat.ExtensionResult {
  return setFile(image.gifsaveBuffer({
    keep: Vips.ForeignKeep.all,
    effort: 7
  }), 'gif');
}
