import * as test from '@razomy/test';
import * as abstracts from "@razomy/abstracts";

export function testSync<I extends Array<any>, O>(
  cb: abstracts.functions.Function<I, O>,
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
