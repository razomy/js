import Vips from "wasm-vips";
import * as images from "@razomy/images";
import * as fsFileFormat from "@razomy/fs-file-format";
import {setFile} from "../import_";

/**
 * @summary Export image as a 256x256 PNG buffer for icons.
 * @description Resizes the provided image to a strict 256x256 pixel dimension while retaining metadata, and encodes it into a PNG buffer suitable for use as an application icon or favicon.
 * @param image The source image to be converted.
 * @returns The generated 256x256 PNG image buffer.
 * @example
 * ```ts
 * const iconBuffer = ico(image); // => Image
 * ```
 * @example
 * ```ts
 * const buffer = ico(image);
 * await fs.promises.writeFile('favicon.png', buffer); // => Image
 * ```
 * @example
 * ```ts
 * const buffer = ico(image);
 * res.setHeader('Content-Type', 'image/png');
 * res.send(buffer); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function ico(image: images.Image): fsFileFormat.ExtensionResult {
  const resizer = image.thumbnailImage(256, {
    height: 256,
    size: Vips.Size.both
  });

  const buffer = resizer.pngsaveBuffer({keep: Vips.ForeignKeep.all,});
  resizer.delete();

  return setFile(buffer, 'ico');
}
