/**
 * @summary Create a cryptographically secure random float in [0, 1).
 * @description Generates a random floating-point number between 0 (inclusive) and 1 (exclusive)
 * using the Web Crypto API for cryptographic randomness.
 * @returns A random float in the range [0, 1).
 * @example
 * ```ts
 * createFloat(); // => 0.7382194561
 * ```
 * @example
 * ```ts
 * createFloat(); // => 0.0231587943
 * ```
 * @example
 * ```ts
 * createFloat(); // => 0.9481726350
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function createFloat(): number {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] / 0x100000000;
}
