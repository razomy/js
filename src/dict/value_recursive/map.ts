import {is_value_recursion, ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";
import {isObject} from "razomy.js/object/object";
import {DictKey} from "razomy.js/dict/dict";

export function map<I, O>(parent: DictKey, input: ValueRecursiveDict<I>, leaf_value_cb: (input: I, parent: DictKey) => O): ValueRecursiveDict<O>;
export function map<I, O>(parent: DictKey, input: I, leaf_value_cb: (input: I, parent: DictKey) => O): O;
export function map<I, O>(parent: DictKey, input: ValueRecursiveDictOrValue<I>, leaf_value_cb: (input: I, parent: DictKey) => O): ValueRecursiveDictOrValue<O> ;
export function map<I, O>(parent: DictKey, input: ValueRecursiveDictOrValue<I>, leaf_value_cb: (input: I, parent: DictKey) => O): ValueRecursiveDictOrValue<O> {
  if (is_value_recursion(input)) {
    const otput: ValueRecursiveDict<O> = new ValueRecursiveDict<O>();
    for (let inputKey in input) {
      const value = input[inputKey];
      otput[inputKey] = map(inputKey, value, leaf_value_cb)
    }
    return otput;
  } else {
    return leaf_value_cb(input, parent)
  }
}

