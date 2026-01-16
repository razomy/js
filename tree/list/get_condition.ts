import {WithChildrenList} from 'razomy.trees/list/with_children_list';

export function get_condition<T extends WithChildrenList<any>>(node: T, path: string[], match) {
  if (path.length === 0 || !match(node, path[0])) {
    return null;
  }

  if (path.length === 1) {
    return node;
  }

  for (const child_node of node.children) {
    const found_node = get_condition(child_node, path.slice(1), match);

    if (found_node) {
      return found_node;
    }
  }

  return null;
}

