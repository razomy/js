import Vips from 'wasm-vips';
import * as images from '@razomy/images';

/**
 * @summary Convert an image file to a specified format.
 * @description Reads an image from the provided file path.
 * @param inputPath The file path of the input image.
 * @returns A Image instance.
 * @example
 * ```ts
 * await getFile('./input.jpg', 'png'); // => Image
 * ```
 * @example
 * ```ts
 * await getFile('./avatar.webp', 'jpeg'); // => Image
 * ```
 * @example
 * ```ts
 * await getFile('./photo.heic', 'avif'); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export async function getFile(inputPath: string) {
  const vips = await Vips();
  let image = vips.Image.newFromFile(inputPath, { access: 'sequential' });
  return image as images.Image;
}
