import {WithChildrenList} from 'razomy.tree/list/with_children_list';

export function getAll<T extends WithChildrenList<any>>(node: T, path: string[], match) {
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
        const foundNodes = getAll(childNode, remainingPath, match);
        matchingNodes.push(...foundNodes);
      }
    }
  }

  return matchingNodes;
}
