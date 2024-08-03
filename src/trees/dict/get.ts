import {ArgumentException} from "razomy.js/exceptions/argument_exception";
import {WithChildrenDict} from "razomy.js/trees/dict/with_children_dict";

export function get<T extends WithChildrenDict<T>>(node: T, path: string[], offset: number): T {
  if (offset >= path.length) {
    return node;
  }

  return get_value(node, path, offset)
}

export function get_value<T extends WithChildrenDict<T>>(value: T, path: string[], offset: number) {
  for (let key in value.children) {
    if (key !== path[offset]) {
      continue;
    }

    return get(value.children[key], path, offset + 1)
  }

  throw new ArgumentException('Node not found path.invalid arguments', {value, path, offset})
}


export function get_by_string<T extends WithChildrenDict<T>>(node: T, path: string, separator: string) {
  return get(node, path.split(separator), 0);
}

export function get_path(obj, path: string) {
  if (path === '') {
    return [];
  }

  const closingBracketIndex = path.indexOf(':');
  const slug = path.substring(0, closingBracketIndex);

  let childNode = Object.keys(obj).find(key => key === slug);

  if (!childNode) {
    throw new Error(`Node not found path="${path}".`);
  }

  const remainingString = path.substring(closingBracketIndex + 1);

  return [childNode, ...get_path(childNode, remainingString)];
}