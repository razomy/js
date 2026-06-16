import * as treeList from '@razomy/tree-list';

export function map<I extends treeList.HasChildrenList<any>, O extends treeList.HasChildrenList<any>>(
  input: I,
  cb: (input: I) => O,
): O {
  const otput = cb(input);
  otput.children = treeList.mapChildren(input.children, cb);
  return otput;
}
