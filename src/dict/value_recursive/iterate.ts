import {is_value_recursion, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";
import {DictKey} from "razomy.js/dict/dict";

export function iterate<I, O>(input: ValueRecursiveDictOrValue<I>, cb: (input: I, parent: DictKey) => O, parent: string): void {
  if (is_value_recursion(input)) {
    for (let inputKey in input) {
      const value = input[inputKey];
      iterate(value, cb, inputKey)
    }
  } else {
    cb(input, parent)
  }
}

