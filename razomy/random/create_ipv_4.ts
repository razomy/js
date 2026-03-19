import * as random from "@razomy/random";

/**
 * @summary Generate a random IPv4 address string.
 * @description Creates a random IPv4 address by generating four random integers in the range [0, 255] and joining them with dots.
 * @returns A random IPv4 address string.
 * @example
 * ```ts
 * createIpv4(); // => '192.168.1.42'
 * ```
 * @example
 * ```ts
 * createIpv4(); // => '10.0.254.3'
 * ```
 * @example
 * ```ts
 * createIpv4(); // => '0.127.255.12'
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function createIpv4(): string {
  return `${random.createInt(0, 255)}.${random.createInt(0, 255)}.${random.createInt(0, 255)}.${random.createInt(0, 255)}`;
}
