import { mapChildren } from './map_children';
import * as treeList from "@razomy/tree-list";

export function map<I extends treeList.WithChildrenList<any>, O extends treeList.WithChildrenList<any>>(
  input: I,
  cb: (input: I) => O,
): O {
  const otput = cb(input);
  otput.children = mapChildren(input.children, cb);
  return otput;
}
