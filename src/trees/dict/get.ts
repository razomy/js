import {ArgumentException} from "razomy/exceptions/argument_exception";
import {WithChildrenDict} from "razomy/trees/dict/with_children_dict";
import {assign} from "razomy/key/assign";

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

  const closing_bracket_index = path.indexOf(assign);
  const slug = path.substring(0, closing_bracket_index);

  let child_node = Object.keys(obj).find(key => key === slug);

  if (!child_node) {
    throw new Error(`Node not found path="${path}".`);
  }

  const remaining_string = path.substring(closing_bracket_index + 1);

  return [child_node, ...get_path(child_node, remaining_string)];
}