import type {Function} from '@razomy/function';
import type {Dict} from '@razomy/dict';
import {test} from './test';
import type {FunctionSpec} from '@razomy/spec';

export function tests<I extends Array<any>, O>(cb: Function<I, O>, array: Dict<FunctionSpec<I, O>>) {
  for (let key in array) {
    const spec = array[key];
    it(key, async () => await test(cb, spec.input, spec.otput, spec.error));
  }
}


