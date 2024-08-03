import {WithChildrenList} from "razomy.js/trees/list/with_children_list";

export function get<T extends WithChildrenList<any>>(node: T, path: string[], offset: number): T {
  if (offset >= path.length) {
    return node;
  }

  for (let childNode of node.children) {
    if (childNode.value == path[offset]) {
      return get(childNode, path, offset + 1);
    }
  }

  throw new Error(`Node not found path="${path}".`);
}


