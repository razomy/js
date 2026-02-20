import type {Function} from '@razomy/function';
import {toStrictEqual} from './to_strict_equal';
import {toThrow} from './to_throw';

export function testSync<I extends Array<any>, O>(cb: Function<I, O>, req: I, res: O | null = null, err: Error | null = null) {
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