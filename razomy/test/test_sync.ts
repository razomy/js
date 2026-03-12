import { toStrictEqual } from './to_strict_equal';
import { toThrow } from './to_throw';
import * as function_ from '@razomy/function';

export function testSync<I extends Array<any>, O>(
  cb: function_.Function<I, O>,
  req: I,
  res: O | null = null,
  err: Error | null = null,
) {
  function resultFn() {
    return cb(...req);
  }

  if (res != null) {
    const result = resultFn();
    toStrictEqual(result, res);
  }

  if (err != null) {
    toThrow(resultFn, err);
  }
}
