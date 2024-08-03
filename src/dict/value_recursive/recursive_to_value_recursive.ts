import {ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";
import {RecursiveDict} from "razomy.js/dict/recursive/recursive";

export function recursive_to_value_recursive(dict: RecursiveDict, is_value: (t: RecursiveDict) => boolean): ValueRecursiveDictOrValue<string> {
  if (is_value(dict)) {
    return dict;
  }
  const v = new ValueRecursiveDict<string>();
  for (const dictKey in (dict as object)) {
    v[dictKey] = recursive_to_value_recursive(dict[dictKey], is_value);
  }
  return v;
}
