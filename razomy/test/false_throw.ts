import * as test from "@razomy/test";

export function falseThrow(value: boolean) {
  if (!value) {
    throw new test.ArgumentError(value);
  }

  return true;
}
