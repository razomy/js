import {ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";
import {get} from "razomy.js/dict/value_recursive/get";

export function set<T>(value: ValueRecursiveDictOrValue<T>, path: string[], newValue: ValueRecursiveDictOrValue<T>): void {
  const parent_path = path.slice(0, -1);
  const parent_node = get(value, parent_path, 0);
  parent_node[path.at(-1)!] = newValue;
}
