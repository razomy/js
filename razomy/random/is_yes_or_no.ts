import * as random from "@razomy/random";

/**
 * @summary Randomly returns true or false with equal probability.
 * @description Generates a random float and returns true if it exceeds 0.5, false otherwise.
 * @returns A random boolean value.
 * @example
 * ```ts
 * isYesOrNo(); // => true
 * ```
 * @example
 * ```ts
 * isYesOrNo(); // => false
 * ```
 * @example
 * ```ts
 * const answer: boolean = isYesOrNo(); // => true | false
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function isYesOrNo(): boolean {
  return random.createFloat() > 0.5;
}
