import {ArgumentError} from './argument_error';
import {and} from './and';

export function andFalseThrow(...value: boolean[]) {
  if (!and(...value)) {
    throw new ArgumentError(value);
  }

  return true;
}
