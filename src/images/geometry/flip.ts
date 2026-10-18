import Vips from 'wasm-vips';
import * as images from '@razomy/images';

/**
 * @summary Flip an image along a specified axis.
 * @description Creates a new image that is flipped either horizontally or vertically based on the provided axis.
 * @param image The image to flip.
 * @param axis The axis to flip the image along.
 * @returns The flipped image.
 * @example
 * ```ts
 * flip(image, 'horizontal'); // => Image
 * ```
 * @example
 * ```ts
 * flip(image, 'vertical'); // => Image
 * ```
 * @example
 * ```ts
 * flip(flip(image, 'horizontal'), 'vertical'); // => Image
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function flip(image: images.Image, axis: 'horizontal' | 'vertical'): images.Image {
  const direction = axis === 'horizontal' ? Vips.Direction.horizontal : Vips.Direction.vertical;

  return image.flip(direction);
}
