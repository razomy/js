import Vips from 'wasm-vips';
import * as images from "@razomy/images";

/**
 * @summary Smartly crop an image to the specified dimensions.
 * @description Crops an image down to a given width and height by removing the least interesting areas based on the provided strategy.
 * @param image The source image to crop.
 * @param width The target width of the cropped image.
 * @param height The target height of the cropped image.
 * @param interesting The strategy to determine the most interesting area (defaults to centre).
 * @returns The smartly cropped image.
 * @example
 * ```ts
 * smartCrop(image, 300, 300); // => Image
 * ```
 * @example
 * ```ts
 * smartCrop(image, 800, 600, Vips.Interesting.entropy); // => Image
 * ```
 * @example
 * ```ts
 * smartCrop(image, 150, 150, Vips.Interesting.attention); // => Image
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function smartCrop(
  image: images.Image,
  width: number,
  height: number,
  interesting: Vips.Interesting = Vips.Interesting.centre
): images.Image {
  return image.smartcrop(width, height, { interesting });
}
