import {WithChildrenList} from "razomy.js/trees/list/with_children_list";

export function get<T extends WithChildrenList<any>>(node: T, path: string[], match) {
  if (path.length === 0 || !match(node, path[0])) {
    return null;
  }

  if (path.length === 1) {
    return node;
  }

  for (const childNode of node.children) {
    const foundNode = get(childNode, path.slice(1), match);

    if (foundNode) {
      return foundNode;
    }
  }

  return null;
}

export function get_all<T extends WithChildrenList<any>>(node: T, path: string[], match) {
  if (path.length === 0) {
    return [];
  }

  const [currentValue, ...remainingPath] = path;
  let matchingNodes: T[] = [];

  if (match(node, currentValue)) {
    if (remainingPath.length === 0) {
      matchingNodes.push(node);
    } else {
      for (const childNode of node.children) {
        const foundNodes = get_all(childNode, remainingPath, match);
        matchingNodes.push(...foundNodes);
      }
    }
  }

  return matchingNodes;
}
