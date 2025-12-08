import {ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/vrd/value";
import {get} from "razomy.js/vrd/get";

export function set<T>(value: ValueRecursiveDictOrValue<T>, path: string[], newValue: ValueRecursiveDictOrValue<T>): void {
  const parent_path = path.slice(0, -1);
  let parent_node: ValueRecursiveDict<T>;
  if (parent_path.length !== 0) {
    parent_node = get(value, parent_path, 0) as ValueRecursiveDict<T>;
  } else {
    parent_node = value as ValueRecursiveDict<T>;
  }
  parent_node[path.at(-1)!] = newValue;
}
