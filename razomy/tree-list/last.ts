import * as abstractions from '@razomy/abstractions';

export function last<T extends abstractions.graphs.HasChildren<any[]>>(node: T) {
  const lastChild = node.children.at(-1);
  if (!lastChild) {
    return node;
  }

  return last(lastChild);
}
