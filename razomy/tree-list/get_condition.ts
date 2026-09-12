import * as abstracts from '@razomy/abstracts';

export function getCondition<T extends abstracts.graphs.HasChildren<any[]>>(node: T, path: string[], match) {
  if (path.length === 0 || !match(node, path[0])) {
    return null;
  }

  if (path.length === 1) {
    return node;
  }

  for (const childNode of node.children) {
    const foundNode = getCondition(childNode, path.slice(1), match);

    if (foundNode) {
      return foundNode;
    }
  }

  return null;
}
