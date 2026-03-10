/**
 * @summary Generate a random integer within a range.
 * @description Generates a random integer between min (inclusive) and max (inclusive) using uniform distribution.
 * @param min The minimum value (inclusive).
 * @param max The maximum value (inclusive).
 * @returns A random integer in the range [min, max].
 * @example
 * ```ts
 * createInt(0, 10); // => 7
 * ```
 * @example
 * ```ts
 * createInt(-5, 5); // => -2
 * ```
 * @example
 * ```ts
 * createInt(); // => 42 (random integer between 0 and 100)
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
import { createFloat } from '@razomy/random';

export function createInt(min: number = 0, max: number = 100): number {
  return Math.floor(createFloat() * (max - min + 1)) + min;
}
