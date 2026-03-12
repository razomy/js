import { test } from './test';
import * as function_ from '@razomy/function';
import * as dict from '@razomy/dict';
import * as spec from '@razomy/spec';

export function tests<I extends Array<any>, O>(
  cb: function_.Function<I, O>,
  array: dict.Dict<spec.FunctionSpec<I, O>>,
) {
  for (let key in array) {
    const spec = array[key];
    it(key, async () => await test(cb, spec.input, spec.otput, spec.error));
  }
}
