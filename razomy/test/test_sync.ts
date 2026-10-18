import * as test from '@razomy/test';
import * as abstractions from "@razomy/abstractions";

export function testSync<I extends Array<any>, O>(
  cb: abstractions.function_.Function<I, O>,
  req: I,
  res: O | null = null,
  err: Error | null = null,
) {
  function resultFn() {
    return cb(...req);
  }

  if (res != null) {
    const result = resultFn();
    test.toStrictEqual(result, res);
  }

  if (err != null) {
    test.toThrow(resultFn, err);
  }
}
