import * as functions from '@razomy/functions';
import * as testJest from '@razomy/test-jest';
import * as abstracts from '@razomy/abstracts';

export interface FunctionSpec<i, O> {
  input: any;
  otput: any;
  error: any;
}

export function tests<I extends Array<any>, O>(cb: functions.Function<I, O>, array: abstracts.structures.Dict<FunctionSpec<I, O>>) {
  for (const key in array) {
    const spec = array[key];
    it(key, async () => await testJest.test(cb, spec.input, spec.otput, spec.error));
  }
}
