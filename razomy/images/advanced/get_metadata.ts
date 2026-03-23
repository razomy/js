import * as images from "@razomy/images";

export interface ImageMetadata {
  width: number;
  height: number;
  bands: number;
  space: string;
  hasAlpha: boolean;
}

/**
 * @summary Get metadata from an image.
 * @description Extracts and returns the metadata properties of the provided image, such as dimensions, band count, color space, and alpha channel presence.
 * @param image The source image.
 * @returns The image metadata.
 * @example
 * ```ts
 * const image = { width: 1920, height: 1080, bands: 3, interpretation: 'srgb', hasAlpha: () => false };
 * getMetadata(image); // => { width: 1920, height: 1080, bands: 3, space: 'srgb', hasAlpha: false }
 * ```
 * @example
 * ```ts
 * const image = { width: 500, height: 500, bands: 4, interpretation: 'rgba', hasAlpha: () => true };
 * getMetadata(image); // => { width: 500, height: 500, bands: 4, space: 'rgba', hasAlpha: true }
 * ```
 * @example
 * ```ts
 * const image = { width: 128, height: 128, bands: 1, interpretation: 'b-w', hasAlpha: () => false };
 * getMetadata(image); // => { width: 128, height: 128, bands: 1, space: 'b-w', hasAlpha: false }
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function getMetadata(image: images.Image): ImageMetadata {
  return {
    width: image.width,
    height: image.height,
    bands: image.bands,
    space: image.interpretation,
    hasAlpha: image.hasAlpha()
  };
}