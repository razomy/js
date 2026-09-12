import * as abstracts from '@razomy/abstracts';

export function filter<T extends abstracts.graphs.HasChildren<any[]>>(node: T, cb: (node: T) => boolean): T[] {
  let res: T[] = [];

  if (cb(node)) {
    res.push(node);
  }

  for (const n of node.children) {
    res = res.concat(filter(n, cb));
  }

  return res;
}
