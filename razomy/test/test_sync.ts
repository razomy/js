import * as functions from '@razomy/functions';
import * as test from '@razomy/test';

export function testSync<I extends Array<any>, O>(
  cb: functions.Function<I, O>,
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
