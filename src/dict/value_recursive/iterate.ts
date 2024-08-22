import {is_value_recursion, ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";
import {DictKey} from "razomy.js/dict/dict";

export function iterate<T>(input: ValueRecursiveDictOrValue<T>,
                           node_cb: (input: ValueRecursiveDict<T>, parents: DictKey[]) => void,
                           leaf_cb: (input: T, parent: DictKey[]) => void,
                           parents: DictKey[],
                           ): void {
  if (is_value_recursion(input)) {
    node_cb(input, parents)
    for (let inputKey in input) {
      const value = input[inputKey];
      iterate(value, node_cb, leaf_cb, [...parents, inputKey])
    }
  } else {
    leaf_cb(input, parents)
  }
}

