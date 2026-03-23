import { toStrictEqual } from './to_strict_equal';
import { toThrow } from './to_throw';
import * as fns from '@razomy/fns';

export function testSync<I extends Array<any>, O>(
  cb: fns.Function<I, O>,
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
