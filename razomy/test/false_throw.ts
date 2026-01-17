import {ArgumentError} from './argument_error';

export function falseThrow(value) {
  if (value == false) {
    throw new ArgumentError(value);
  }

  return true;
}
