import { createInt } from './create_int';
import { shuffleArrayMut } from './shuffle_array_mut';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SPECIALS = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
const ALL = UPPER + LOWER + DIGITS + SPECIALS;

const MIN_LENGTH = 4;

/**
 * @summary Create a random password.
 * @description Generates a random password of the specified length containing at least one uppercase letter, one lowercase letter, one digit, and one special character. The result is shuffled to avoid predictable positions.
 * @param length The desired password length (minimum 4).
 * @returns A random password string.
 * @throws {RangeError} If length is less than 4.
 * @example
 * ```ts
 * createPassword(); // => 'aG3!xK9@mNq#pR7&' (16 characters)
 * ```
 * @example
 * ```ts
 * createPassword(4); // => 'k2A!' (4 characters, one from each group)
 * ```
 * @example
 * ```ts
 * createPassword(32); // => 'xP4!rQ8@wN2#mK7&jL5$tH9^yB1*zF6+' (32 characters)
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function createPassword(length: number = 16): string {
  if (length < MIN_LENGTH) {
    throw new RangeError(`Password length must be at least ${MIN_LENGTH}, got ${length}`);
  }

  const chars: string[] = [
    UPPER[createInt(0, UPPER.length - 1)],
    LOWER[createInt(0, LOWER.length - 1)],
    DIGITS[createInt(0, DIGITS.length - 1)],
    SPECIALS[createInt(0, SPECIALS.length - 1)],
  ];

  for (let i = chars.length; i < length; i++) {
    chars.push(ALL[createInt(0, ALL.length - 1)]);
  }

  shuffleArrayMut(chars);

  return chars.join('');
}
