import {Function} from "razomy.js/function/function";
import {Dict} from "razomy.js/dict/dict";
import {FunctionSpec} from "razomy.js/spec/function_spec";


export async function test<I extends Array<any>, O>(cb: Function<I, O>, req: I, res: O | null = null, err: Error | null = null) {
  const resultFn = async () => await cb(...req);
  if (err != null) {
    expect(resultFn).toThrowError(err);
    return;
  }
  const result = await resultFn();
  if (res != null) {
    expect(result).toStrictEqual(res);
  }
}


export function tests<I extends Array<any>, O>(cb: Function<I, O>, array: Dict<FunctionSpec<I, O>>) {
  for (let key in array) {
    const spec = array[key];
    it(key, async () => await test(cb, spec.input, spec.otput, spec.error));
  }
}

function assert(condition: boolean, message = "Assertion failed") {
  if (!condition) {
    throw new Error(message);
  }
}