import {ArgumentError} from './argument_error';
import { and } from "razomy.boolean";

export function andFalseThrow(...value: boolean[]) {
  if (!and(...value)) {
    throw new ArgumentError(value);
  }

  return true;
}
