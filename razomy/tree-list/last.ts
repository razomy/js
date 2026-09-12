import * as abstracts from '@razomy/abstracts';

export function last<T extends abstracts.graphs.HasChildren<any[]>>(node: T) {
  const lastChild = node.children.at(-1);
  if (!lastChild) {
    return node;
  }

  return last(lastChild);
}
