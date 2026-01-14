import {Function} from "razomy.function/function";
import {Dict} from "razomy.dict/dict";
import test from "razomy.test/test";
import {FunctionSpec} from "razomy.spec/function_spec";

function tests<I extends Array<any>, O>(cb: Function<I, O>, array: Dict<FunctionSpec<I, O>>) {
  for (let key in array) {
    const spec = array[key];
    it(key, async () => await test(cb, spec.input, spec.otput, spec.error));
  }
}

export default tests;
