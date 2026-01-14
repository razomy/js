import {WithChildrenList} from 'razomy.trees/list/with_children_list';
import map_children from './map_children';


export default function map<I extends WithChildrenList<any>, O extends WithChildrenList<any>>(
  input: I,
  cb: (input: I) => O
): O {
  const otput = cb(input);
  otput.children = map_children(input.children, cb);
  return otput;
}


