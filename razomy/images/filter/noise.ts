import Vips from 'wasm-vips';
import * as images from "@razomy/images";

/**
 * @summary Add Gaussian noise to an image.
 * @description Generates a Gaussian noise layer based on the specified amount and adds it to the provided image to simulate film grain or sensor noise.
 * @param image The input image.
 * @param amount The standard deviation of the Gaussian noise (sigma). Default is 10.
 * @returns A new image with the applied Gaussian noise.
 * @example
 * ```ts
 * const result = noise(image); // => Image
 * ```
 * @example
 * ```ts
 * const result = noise(image, 20); // => Image
 * ```
 * @example
 * ```ts
 * const result = noise(image, 50); // => Image
 * ```
 * @complexity time O(w * h)
 * @complexity memory O(w * h)
 */
export function noise(image: images.Image, amount: number = 10): images.Image {
  const noiseLayer = Vips.Image.gaussnoise(image.width, image.height, { sigma: amount });
  const result = image.add(noiseLayer);
  
  noiseLayer.delete();
  
  return result;
}
