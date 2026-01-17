import {WithChildrenList} from 'razomy.tree/list/with_children_list';
import {mapChildren} from './map_children';


export function map<I extends WithChildrenList<any>, O extends WithChildrenList<any>>(
  input: I,
  cb: (input: I) => O
): O {
  const otput = cb(input);
  otput.children = mapChildren(input.children, cb);
  return otput;
}


