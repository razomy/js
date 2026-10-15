import * as abstractions from '@razomy/abstractions';
import treeList from "@razomy/tree-list";

export function map<I extends abstractions.graphs.HasChildren<any[]>, O extends abstractions.graphs.HasChildren<any[]>>(
  input: I,
  cb: (input: I) => O,
): O {
  const otput = cb(input);
  otput.children = treeList.mapChildren(input.children, cb);
  return otput;
}
