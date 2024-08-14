import {ArgumentException} from "razomy.js/exceptions/argument_exception";
import {getKey, getValue, ListItem, RecursiveList} from "razomy.js/list/recursive/recursive";
import {assign} from "razomy.js/key/assign";

export function getItemByPath(node: ListItem, path: string[], offset: number): ListItem {
  if (offset >= path.length) {
    return node;
  }

  const value = getValue(node);
  return getItemByPathFromValue(value, path, offset)
}

export function getItemByPathFromValue(value: RecursiveList, path: string[], offset: number) {
  for (let node of value) {
    const key = getKey(node);
    if (key !== path[offset]) {
      continue;
    }

    return getItemByPath(node, path, offset + 1)
  }

  throw new ArgumentException('invalid arguments', {value, path, offset})
}


export function get(node: ListItem, path: string) {
  return getItemByPath(node, path.split(assign), 0);
}