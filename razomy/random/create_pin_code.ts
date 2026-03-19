import * as random from "@razomy/random";

/**
 * @summary Create a random PIN code of a given length with no consecutive repeated digits.
 * @description Generates a numeric PIN code string of the specified length (default 6).
 * Each digit is randomly chosen from 0–9, ensuring no two consecutive digits are the same.
 * @param length The number of digits in the PIN code.
 * @returns A string representing the generated PIN code.
 * @throws {RangeError} If length is less than 1.
 * @example
 * ```ts
 * createPinCode(); // => '482973' (6-digit PIN, no consecutive repeats)
 * ```
 * @example
 * ```ts
 * createPinCode(4); // => '3917' (4-digit PIN, no consecutive repeats)
 * ```
 * @example
 * ```ts
 * createPinCode(1); // => '7' (single-digit PIN)
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function createPinCode(length: number = 6): string {
  if (length < 1) {
    throw new RangeError(`Expected length >= 1, got ${length}`);
  }

  let pin = '';
  let lastDigit = -1;

  for (let i = 0; i < length; i++) {
    let digit: number;
    do {
      digit = random.createInt(0, 9);
    } while (digit === lastDigit);
    pin += digit;
    lastDigit = digit;
  }

  return pin;
}