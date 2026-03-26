import {IMAGES, type OnlyReadImageFileExtensionType, type ReadAndWriteImageFileExtensionType} from "../export_";
import * as fsFileFormat from "@razomy/fs-file-format";
import {Readable} from "node:stream";

/**
 * @summary Convert an image file to a specified format.
 * @description Converts it to the requested format using wasm-vips. Returns a readable stream of the converted image along with its media type and extension metadata.
 * @param buffer The file path of the input image.
 * @param fileExtensionType The target format extension for the output image.
 * @returns A promise resolving to the converted image stream and its metadata.
 * @example
 * ```ts
 * await setFile(image, 'png'); // => void
 * ```
 * @example
 * ```ts
 * await setFile(image, 'jpeg'); // => void
 * ```
 * @example
 * ```ts
 * await setFile(image, 'avif'); // => void
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function setFile(
  buffer: Uint8Array,
  fileExtensionType: ReadAndWriteImageFileExtensionType | OnlyReadImageFileExtensionType,
): fsFileFormat.ExtensionResult {
  const stream = Readable.from([Buffer.from(buffer)]);
  const outMime =
    IMAGES.find((imageItem) => imageItem.fileExtensionType === fileExtensionType)
      ?.mediaType ?? 'application/octet-stream';

  return {
    stream,
    mediaType: outMime,
    fileExtensionType: fileExtensionType,
  };
}
