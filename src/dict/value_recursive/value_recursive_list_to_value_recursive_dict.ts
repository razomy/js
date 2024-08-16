import {ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";
import {ValueRecursiveList, ValueRecursiveListOrValueItem} from "razomy.js/list/value_recursive/value";
import {is_string} from "razomy.js/string/is_string";

export function value_recursive_list_to_value_recursive_dict(dict: ValueRecursiveListOrValueItem<string> | string): ValueRecursiveDictOrValue<string> {
  if (is_string(dict)) {
    return dict;
  }

  const res = new ValueRecursiveDict<string>();
  for (const [key, v] of (dict as ValueRecursiveList<string>)) {
    res[key] = value_recursive_list_to_value_recursive_dict(v);
  }
  return res;
}
