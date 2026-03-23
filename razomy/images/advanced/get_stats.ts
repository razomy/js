import * as images from "@razomy/images";

export interface ImageStats {
  min: number;
  max: number;
  avg: number;
}

/**
 * @summary Get basic statistics of an image.
 * @description Retrieves the minimum, maximum, and average pixel values from the provided image instance.
 * @param image The image to calculate statistics for.
 * @returns An object containing the minimum, maximum, and average pixel values.
 * @example
 * ```ts
 * getStats({ min: () => 0, max: () => 255, avg: () => 127.5 } as Image); // => { min: 0, max: 255, avg: 127.5 }
 * ```
 * @example
 * ```ts
 * getStats({ min: () => 10, max: () => 240, avg: () => 100 } as Image); // => { min: 10, max: 240, avg: 100 }
 * ```
 * @example
 * ```ts
 * getStats({ min: () => 50, max: () => 50, avg: () => 50 } as Image); // => { min: 50, max: 50, avg: 50 }
 * ```
 * @complexity time O(n)
 * @complexity memory O(1)
 */
export function getStats(image: images.Image): ImageStats {
  return {
    min: image.min(),
    max: image.max(),
    avg: image.avg()
  };
}
