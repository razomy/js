import * as random from '@razomy/random';

/**
 * @summary Create a random MAC address.
 * @description Generates a random MAC address string in uppercase with colon-separated octets.
 * @returns A random MAC address in the format `XX:XX:XX:XX:XX:XX`.
 * @example
 * ```ts
 * createMac(); // => 'A3:4F:B2:00:CC:91'
 * ```
 * @example
 * ```ts
 * createMac(); // => '0E:7D:3A:F1:58:C4'
 * ```
 * @example
 * ```ts
 * createMac(); // => 'FF:12:9B:6E:D0:47'
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function createMac(): string {
  return Array.from({ length: 6 }, () => random.createInt(0, 255).toString(16).padStart(2, '0'))
    .join(':')
    .toUpperCase();
}
