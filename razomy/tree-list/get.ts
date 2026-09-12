import * as abstracts from '@razomy/abstracts';

export function get<T extends abstracts.graphs.HasChildren<any[]>>(node: T, path: string[], offset: number): T {
  if (offset >= path.length) {
    return node;
  }

  for (const childNode of node.children) {
    if (childNode.value == path[offset]) {
      return get(childNode, path, offset + 1);
    }
  }

  throw new Error(`Node not found path="${path}".`);
}
