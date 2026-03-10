/**
 * @summary Generate a random float within a specified range.
 * @description Returns a random floating-point number in the range [from, to).
 * Uses `createFloat` to produce a base random value in [0, 1) and scales it to the given range.
 * @param from The lower bound (inclusive).
 * @param to The upper bound (exclusive).
 * @returns A random float in [from, to).
 * @example
 * ```ts
 * createFloatRange(0, 1); // => e.g. 0.7234
 * ```
 * @example
 * ```ts
 * createFloatRange(-10, 10); // => e.g. 3.1415
 * ```
 * @example
 * ```ts
 * createFloatRange(100, 200); // => e.g. 142.857
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
import { createFloat } from '@razomy/random';

export function createFloatRange(from: number, to: number): number {
  return createFloat() * (to - from) + from;
}
