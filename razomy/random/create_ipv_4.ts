/**
 * @summary Generate a random IPv4 address string.
 * @description Creates a random IPv4 address by generating four random integers in the range [0, 255] and joining them with dots.
 * @returns A random IPv4 address string in the format "x.x.x.x".
 * @example
 * ```ts
 * createIpv4(); // => '192.168.1.42'
 * ```
 * @example
 * ```ts
 * createIpv4(); // => '10.0.255.3'
 * ```
 * @example
 * ```ts
 * createIpv4(); // => '0.127.64.200'
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
import { createInt } from '@razomy/random';

export function createIpv4(): string {
  return `${createInt(0, 255)}.${createInt(0, 255)}.${createInt(0, 255)}.${createInt(0, 255)}`;
}
