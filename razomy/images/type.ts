import Vips from 'wasm-vips';

/**
 * @summary Represents an instance of a Vips image.
 * @description Type alias for the `wasm-vips` Image class. Used to type image instances across the package.
 * @example
 * ```ts
 * let image: Image;
 * ```
 * @example
 * ```ts
 * function processImage(img: Image): void {
 *   console.log(img.width);
 * }
 * ```
 * @example
 * ```ts
 * const images: Image[] = [];
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export type Image = Vips.Image;