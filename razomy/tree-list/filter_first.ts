import {WithChildrenList} from './with_children_list';

export function filterFirst<T extends WithChildrenList<any>>(node: T, cb: (node: T) => boolean): T[] {
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