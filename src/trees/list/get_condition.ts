import {WithChildrenList} from "razomy.trees/list/with_children_list";

export function get<T extends WithChildrenList<any>>(node: T, path: string[], match) {
  if (path.length === 0 || !match(node, path[0])) {
    return null;
  }

  if (path.length === 1) {
    return node;
  }

  for (const child_node of node.children) {
    const found_node = get(child_node, path.slice(1), match);

    if (found_node) {
      return found_node;
    }
  }

  return null;
}

export function get_all<T extends WithChildrenList<any>>(node: T, path: string[], match) {
  if (path.length === 0) {
    return [];
  }

  const [current_value, ...remaining_path] = path;
  let matching_nodes: T[] = [];

  if (match(node, current_value)) {
    if (remaining_path.length === 0) {
      matching_nodes.push(node);
    } else {
      for (const child_node of node.children) {
        const found_nodes = get_all(child_node, remaining_path, match);
        matching_nodes.push(...found_nodes);
      }
    }
  }

  return matching_nodes;
}
