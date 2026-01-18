import {Function} from 'razomy.function';
import {Dict} from 'razomy.dict';
import {test} from 'razomy.test';
import {FunctionSpec} from 'razomy.spec';

export function tests<I extends Array<any>, O>(cb: Function<I, O>, array: Dict<FunctionSpec<I, O>>) {
  for (let key in array) {
    const spec = array[key];
    it(key, async () => await test(cb, spec.input, spec.otput, spec.error));
  }
}


