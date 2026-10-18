import * as abstractions from '@razomy/abstractions';

export function filter<T extends abstractions.graph.HasChildren<any[]>>(node: T, cb: (node: T) => boolean): T[] {
  let res: T[] = [];

  if (cb(node)) {
    res.push(node);
  }

  for (const n of node.children) {
    res = res.concat(filter(n, cb));
  }

  return res;
}
