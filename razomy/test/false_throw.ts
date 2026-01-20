import {ArgumentError} from './argument_error';

export function falseThrow(value: boolean) {
  if (!value) {
    throw new ArgumentError(value);
  }

  return true;
}
