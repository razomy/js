import { ArgumentError } from './argument_error';
import * as boolean from "@razomy/boolean";

export function andFalseThrow(...value: boolean[]) {
  if (!boolean.and(...value)) {
    throw new ArgumentError(value);
  }

  return true;
}
