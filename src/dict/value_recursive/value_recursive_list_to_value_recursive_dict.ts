import {ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";
import {ValueRecursiveList, ValueRecursiveListOrValueItem} from "razomy.js/list/value_recursive/value";
import {isString} from "razomy.js/string/string";

export function value_recursive_list_to_value_recursive_dict(dict: ValueRecursiveListOrValueItem<string> | string): ValueRecursiveDictOrValue<string> {
  if (isString(dict)) {
    return dict;
  }

  const res = new ValueRecursiveDict<string>();
  for (const [key, v] of (dict as ValueRecursiveList<string>)) {
    res[key] = value_recursive_list_to_value_recursive_dict(v);
  }
  return res;
}
