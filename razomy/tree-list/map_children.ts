import type {WithChildrenList} from './with_children_list';
import {map} from './map';

export function mapChildren<I extends WithChildrenList<any>, O extends WithChildrenList<any>>(
  children_: I[],
  cb: (input: I) => O
): O[] {
  const children: O[] = [];
  for (let child of children_) {
    children.push(map(child, cb))
  }
  return children;
}