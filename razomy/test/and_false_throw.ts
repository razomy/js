import * as test from '@razomy/test';
import * as array from "@razomy/array";

export function andFalseThrow(...value: boolean[]) {
  if (!array.and(...value)) {
    throw new test.ArgumentError(value);
  }

  return true;
}
