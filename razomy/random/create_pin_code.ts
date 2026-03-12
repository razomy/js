import * as random from '@razomy/random';

export function createPinCode(length: number = 6): string {
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
