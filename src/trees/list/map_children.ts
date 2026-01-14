import {WithChildrenList} from './with_children_list';
import map from './map';

export default function map_children<I extends WithChildrenList<any>, O extends WithChildrenList<any>>(
  _children: I[],
  cb: (input: I) => O
): O[] {
  const children: O[] = [];
  for (let child of _children) {
    children.push(map(child, cb))
  }
  return children;
}