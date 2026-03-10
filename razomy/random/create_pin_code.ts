/**
 * @summary Create a random PIN code of specified length.
 * @description Generates a random numeric PIN code where no two consecutive digits are the same.
 * @param length The length of the PIN code (default: 6).
 * @returns A string representing the PIN code.
 * @throws {never}
 * @example
 * ```ts
 * createPinCode(); // => '482917' (6 digits, no consecutive duplicates)
 * ```
 * @example
 * ```ts
 * createPinCode(4); // => '3819' (4 digits, no consecutive duplicates)
 * ```
 * @example
 * ```ts
 * createPinCode(1); // => '7' (single digit)
 * ```
 * @complexity time O(n) average, where n is the length
 * @complexity memory O(n)
 */
import { createInt } from '@razomy/random';

export function createPinCode(length: number = 6): string {
  let pin = '';
  let lastDigit = -1;

  for (let i = 0; i < length; i++) {
    let digit: number;
    do {
      digit = createInt(0, 9);
    } while (digit === lastDigit);
    pin += digit;
    lastDigit = digit;
  }

  return pin;
}
