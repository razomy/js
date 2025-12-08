import {is_value_recursion, ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/vrd/value";
import {DictKey} from "razomy.js/dict/dict";

export function filter<I>(input: ValueRecursiveDict<I>, is_keep: (input: ValueRecursiveDictOrValue<I>, parent: DictKey) => boolean): ValueRecursiveDict<I>;
export function filter<I>(input: I, is_keep: (input: ValueRecursiveDictOrValue<I>, parent: DictKey) => boolean): I;
export function filter<I>(input: ValueRecursiveDictOrValue<I>, is_keep: (input: ValueRecursiveDictOrValue<I>, parent: DictKey) => boolean): ValueRecursiveDictOrValue<I> ;
export function filter<I>(input: ValueRecursiveDictOrValue<I>, is_keep: (input: ValueRecursiveDictOrValue<I>, parent: DictKey) => boolean): ValueRecursiveDictOrValue<I> {
  if (is_value_recursion(input)) {
    for (let inputKey in input) {
      const value = input[inputKey];
      if (!is_keep(value, inputKey)) {
        delete input[inputKey];
        continue;
      }
      input[inputKey] = filter(value, is_keep);
    }
    return input;
  } else {
    return input;
  }
}

