import * as testJest from '@razomy/test-jest';
import * as abstractions from '@razomy/abstractions';

export interface FunctionSpec<i, O> {
  input: any;
  otput: any;
  error: any;
}

export function tests<I extends Array<any>, O>(cb: abstractions.function_.Function<I, O>, array: abstractions.structure.Dict<FunctionSpec<I, O>>) {
  for (const key in array) {
    const spec = array[key];
    it(key, async () => await testJest.test(cb, spec.input, spec.otput, spec.error));
  }
}
