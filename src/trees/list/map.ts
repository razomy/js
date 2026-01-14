import {WithChildrenList} from "razomy.trees/list/with_children_list";

export function map_children<I extends WithChildrenList<any>, O extends WithChildrenList<any>>(
  _children: I[],
  cb: (input: I) => O
): O[] {
  const children: O[] = [];
  for (let child of _children) {
    children.push(map(child, cb))
  }
  return children;
}


export function map<I extends WithChildrenList<any>, O extends WithChildrenList<any>>(
  input: I,
  cb: (input: I) => O
): O {
  const otput = cb(input);
  otput.children = map_children(input.children, cb);
  return otput;
}

export default map;
