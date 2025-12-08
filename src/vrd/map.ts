import {is_value_recursion, ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/vrd/value";
import {isObject} from "razomy.js/object/object";
import {DictKey} from "razomy.js/dict/dict";

export function map<I, O>(input: ValueRecursiveDict<I>, leaf_value_cb: (input: I, parent: DictKey) => O, parent: DictKey): ValueRecursiveDict<O>;
export function map<I, O>(input: I, leaf_value_cb: (input: I, parent?: DictKey) => O, parent: DictKey): O;
export function map<I, O>(input: ValueRecursiveDictOrValue<I>, leaf_value_cb: (input: I, parent: DictKey) => O, parent: DictKey): ValueRecursiveDictOrValue<O> ;
export function map<I, O>(
  input: ValueRecursiveDictOrValue<I>,
  leaf_value_cb: (input: I, parent: DictKey) => O,
  parent: DictKey,
  node_cb: ((input: ValueRecursiveDict<I>, parent: DictKey) => ValueRecursiveDict<O> | O),
): ValueRecursiveDictOrValue<O>;
export function map<I, O>(
  input: ValueRecursiveDictOrValue<I>,
  leaf_value_cb: (input: I, parent: DictKey) => O,
  parent: DictKey,
  node_cb: ((input: ValueRecursiveDict<I>, parent: DictKey) => ValueRecursiveDict<O> | O) | undefined = undefined,
): ValueRecursiveDictOrValue<O> {
  if (is_value_recursion(input)) {
    let iter: any = input;
    if (node_cb) {
      iter = node_cb(iter, parent) as any;
      if (!is_value_recursion(iter)) {
        return iter;
      }
    }
    const otput: ValueRecursiveDict<O> = new ValueRecursiveDict<O>();
    for (let inputKey in iter) {
      const value = iter[inputKey];
      otput[inputKey] = map(value, leaf_value_cb, inputKey, node_cb!)
    }
    return otput;
  } else {
    return leaf_value_cb(input, parent)
  }
}
