import {Vrd, VrdOrValue} from "razomy.js/vrd/vrd";
import {get_vrd} from "razomy.js/vrd/get_vrd";

export function set_vrd<T>(value: VrdOrValue<T>, path: string[], newValue: VrdOrValue<T>): void {
  const parent_path = path.slice(0, -1);
  let parent_node: Vrd<T>;
  if (parent_path.length !== 0) {
    parent_node = get_vrd(value, parent_path, 0) as Vrd<T>;
  } else {
    parent_node = value as Vrd<T>;
  }
  parent_node[path.at(-1)!] = newValue;
}
