import {is_value_recursion, ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";
import {DictKey} from "razomy.js/dict/dict";

export function iterate<I>(input: ValueRecursiveDictOrValue<I>,
                           node_cb: (input: ValueRecursiveDict<I>, parent: DictKey) => void,
                           leaf_cb: (input: I, parent: DictKey) => void,
                           parent: string): void {
  if (is_value_recursion(input)) {
    node_cb(input, parent)
    for (let inputKey in input) {
      const value = input[inputKey];
      iterate(value, node_cb, leaf_cb, inputKey)
    }
  } else {
    leaf_cb(input, parent)
  }
}

