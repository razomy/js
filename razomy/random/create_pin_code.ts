import {createInt} from './create_int';

export function createPinCode (length: number = 6) : string {
  let pin = '';
  let lastDigit = -1;

  for (let i = 0; i < length; i++) {
    let newDigit;
    do {
      newDigit = createInt(0, 9);
    } while (newDigit === lastDigit);
    pin += newDigit;
    lastDigit = newDigit;
  }
  return pin;
}