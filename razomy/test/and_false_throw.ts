import * as test from '@razomy/test';
import {and} from "@razomy/array";

export function andFalseThrow(...value: boolean[]) {
  if (!and(...value)) {
    throw new test.ArgumentError(value);
  }

  return true;
}
