import * as random from '@razomy/random';

/**
 * @summary Generate a random float within a specified range [from, to).
 * @description Creates a random floating-point number between `from` (inclusive) and `to` (exclusive)
 * using uniform distribution.
 * @param from The lower bound (inclusive).
 * @param to The upper bound (exclusive).
 * @returns A random float in the range [from, to).
 * @example
 * ```ts
 * createFloatRange(0, 1); // => 0.7234...
 * ```
 * @example
 * ```ts
 * createFloatRange(-5, 5); // => -2.318...
 * ```
 * @example
 * ```ts
 * createFloatRange(100, 200); // => 142.857...
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function createFloatRange(from: number = 0, to: number = 1): number {
  return random.createFloat() * (to - from) + from;
}
