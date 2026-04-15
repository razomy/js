import * as test from "@razomy/test";

export function emptyThrow(value) {
  if (!test.notEmpty(value)) {
    throw new test.ArgumentError(value);
  }

  return true;
}
