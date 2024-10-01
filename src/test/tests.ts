import {Function} from "razomy.js/function/function";
import {Dict} from "razomy.js/dict/dict";
import {test} from "razomy.js/test/test";
import {FunctionSpec} from "razomy.js/spec/function_spec";

export function tests<I extends Array<any>, O>(cb: Function<I, O>, array: Dict<FunctionSpec<I, O>>) {
  for (let key in array) {
    const spec = array[key];
    it(key, async () => await test(cb, spec.input, spec.otput, spec.error));
  }
}
