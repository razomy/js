import {Readable} from 'node:stream';
import Vips from 'wasm-vips';
import {
  images,
  type OnlyReadImageFileExtensionType,
  type ReadAndWriteImageFileExtensionType,
} from './types';
import * as fsFileFormat from "@razomy/fs-file-format";

/**
 * @summary Convert an image file to a specified format.
 * @description Reads an image from the provided file path, automatically rotates it according to EXIF data, and converts it to the requested format using wasm-vips. Returns a readable stream of the converted image along with its media type and extension metadata.
 * @param inputPath The file path of the input image.
 * @param format The target format extension for the output image.
 * @returns A promise resolving to the converted image stream and its metadata.
 * @example
 * ```ts
 * await toImageByFormat('./input.jpg', 'png'); // => Image
 * ```
 * @example
 * ```ts
 * await toImageByFormat('./avatar.webp', 'jpeg'); // => Image
 * ```
 * @example
 * ```ts
 * await toImageByFormat('./photo.heic', 'avif'); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export async function toImageByFormat(
  inputPath: string,
  format: ReadAndWriteImageFileExtensionType | OnlyReadImageFileExtensionType,
): Promise<fsFileFormat.ExtensionResult> {
  const vips = await Vips();
  let image = vips.Image.newFromFile(inputPath, {access: 'sequential'});

  try {
    const rotated = image.autorot();

    image.delete();
    image = rotated;

    let buffer: Uint8Array;
    const saveOptions = {
      keep: vips.ForeignKeep.all,
    };

    switch (format) {
      case 'jpg':
      case 'jpeg':
        buffer = image.jpegsaveBuffer({
          ...saveOptions,
          Q: 80,
          optimize_coding: true,
          subsample_mode: vips.ForeignSubsample.off,
        });
        break;

      case 'png':
        buffer = image.pngsaveBuffer({
          ...saveOptions,
          compression: 8,
          palette: true,
          effort: 7,
        });
        break;

      case 'webp':
        buffer = image.webpsaveBuffer({
          ...saveOptions,
          Q: 80,
          effort: 4,
          lossless: false,
        });
        break;

      case 'avif':
        buffer = image.heifsaveBuffer({
          ...saveOptions,
          compression: vips.ForeignHeifCompression.av1,
          Q: 60,
          effort: 4,
        });
        break;

      case 'tiff':
      case 'tif':
        buffer = image.tiffsaveBuffer({
          ...saveOptions,
          compression: vips.ForeignTiffCompression.lzw,
          Q: 80,
        });
        break;

      case 'heif':
      case 'heic':
        buffer = image.heifsaveBuffer({
          ...saveOptions,
          compression: vips.ForeignHeifCompression.hevc,
          Q: 65,
        });
        break;

      case 'gif':
        buffer = image.gifsaveBuffer({
          ...saveOptions,
          effort: 7,
        });
        break;

      case 'ico': {
        const resizer = image.thumbnailImage(256, {
          height: 256,
          size: vips.Size.both,
        });

        buffer = resizer.pngsaveBuffer();
        resizer.delete();
        break;
      }

      default:
        buffer = image.writeToBuffer(`.${format}`);
    }

    const stream = Readable.from([Buffer.from(buffer)]);
    const outExt = format === 'ico' ? 'ico' : format;
    const outMime =
      images.find((imageItem) => imageItem.fileExtensionType === outExt)
        ?.mediaType ?? 'application/octet-stream';

    return {
      stream,
      mediaType: outMime,
      fileExtensionType: outExt,
    };
  } finally {
    if (image) {
      image.delete();
    }
  }
}
