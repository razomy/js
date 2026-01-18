import {WithChildrenList} from 'razomy.tree.list';

export function last<T extends WithChildrenList<any>>(node: T) {
  const lastChild = node.children.at(-1);
  if (!lastChild) {
    return node;
  }

  return last(lastChild);
}


