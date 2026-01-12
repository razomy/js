import {WithChildrenList} from "razomy/trees/list/with_children_list";

function get<T extends WithChildrenList<any>>(node: T, path: string[], offset: number): T {
  if (offset >= path.length) {
    return node;
  }

  for (let child_node of node.children) {
    if (child_node.value == path[offset]) {
      return get(child_node, path, offset + 1);
    }
  }

  throw new Error(`Node not found path="${path}".`);
}

export default get;
