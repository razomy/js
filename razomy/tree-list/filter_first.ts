import * as abstracts from '@razomy/abstracts';

export function filterFirst<T extends abstracts.graphs.HasChildren<any[]>>(node: T, cb: (node: T) => boolean): T[] {
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
