import * as test from '@razomy/test';
import * as abstractions from '@razomy/abstractions';

export interface FunctionSpec<i, O> {
  input: any;
  otput: any;
  error: any;
}

export function testIts<I extends Array<any>, O>(cb: abstractions.function_.Function<I, O>, array: abstractions.structure.Dict<FunctionSpec<I, O>>) {
  for (const key in array) {
    const spec = array[key];
    it(key, async () => await test.testIt(cb, spec.input, spec.otput, spec.error));
  }
}
