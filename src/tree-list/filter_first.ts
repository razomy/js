import * as abstractions from '@razomy/abstractions';

export function filterFirst<T extends abstractions.graph.HasChildren<any[]>>(node: T, cb: (node: T) => boolean): T[] {
  let res: T[] = [];

  if (cb(node)) {
    res.push(node);
    return res;
  }
  for (const n of node.children) {
    res = res.concat(filterFirst(n, cb));
  }

  return res;
}
