import * as fns from '@razomy/fns';
import * as dict from '@razomy/dict';
import * as spec from '@razomy/spec';
import * as testJest from "@razomy/test-jest";

export function tests<I extends Array<any>, O>(
  cb: fns.Function<I, O>,
  array: dict.Dict<spec.FunctionSpec<I, O>>,
) {
  for (const key in array) {
    const spec = array[key];
    it(key, async () => await testJest.test(cb, spec.input, spec.otput, spec.error));
  }
}
