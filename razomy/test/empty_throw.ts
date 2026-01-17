import {ArgumentError, notEmpty} from './argument_error';

export function emptyThrow(value) {
  if (!notEmpty(value)) {
    throw new ArgumentError(value);
  }

  return true;
}
