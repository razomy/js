import * as random from "@razomy/random";

/**
 * @summary Generate a random integer within a range.
 * @description Generates a random integer between `min` (inclusive) and `max` (inclusive) using a uniform distribution.
 * @param min The minimum value (inclusive). Defaults to `0`.
 * @param max The maximum value (inclusive). Defaults to `100`.
 * @returns A random integer in the range [min, max].
 * @example
 * ```ts
 * createInt(); // => 42 (random integer between 0 and 100)
 * ```
 * @example
 * ```ts
 * createInt(1, 10); // => 7 (random integer between 1 and 10)
 * ```
 * @example
 * ```ts
 * createInt(-5, 5); // => -3 (random integer between -5 and 5)
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function createInt(min: number = 0, max: number = 100): number {
  return Math.floor(random.createFloat() * (max - min + 1)) + min;
}
