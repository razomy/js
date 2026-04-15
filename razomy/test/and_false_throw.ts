import * as boolean from '@razomy/boolean';
import * as test from '@razomy/test';

export function andFalseThrow(...value: boolean[]) {
  if (!boolean.and(...value)) {
    throw new test.ArgumentError(value);
  }

  return true;
}
