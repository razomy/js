import * as abstracts from '@razomy/abstracts';
import treeList from "@razomy/tree-list";

export function map<I extends abstracts.graphs.HasChildren<any[]>, O extends abstracts.graphs.HasChildren<any[]>>(
  input: I,
  cb: (input: I) => O,
): O {
  const otput = cb(input);
  otput.children = treeList.mapChildren(input.children, cb);
  return otput;
}
