import * as random from '@razomy/random';

const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lower = 'abcdefghijklmnopqrstuvwxyz';
const digits = '0123456789';
const specials = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
const all = upper + lower + digits + specials;

const minLength = 4;

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
  if (length < minLength) {
    throw new RangeError(`Password length must be at least ${minLength}, got ${length}`);
  }

  let chars: string[] = [
    upper[random.createInt(0, upper.length - 1)],
    lower[random.createInt(0, lower.length - 1)],
    digits[random.createInt(0, digits.length - 1)],
    specials[random.createInt(0, specials.length - 1)],
  ];

  for (let i = chars.length; i < length; i++) {
    chars.push(all[random.createInt(0, all.length - 1)]);
  }

  chars = random.shuffleArray(chars);

  return chars.join('');
}
