import {WithChildrenList} from "razomy/trees/list/with_children_list";

export function last<T extends WithChildrenList<any>>(node: T) {
  const last_child = node.children.at(-1);
  if (!last_child) {
    return node;
  }

  return last(last_child);
}

