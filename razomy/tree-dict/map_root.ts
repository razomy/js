import * as abstracts from '@razomy/abstracts';
import * as treeDict from '@razomy/tree-dict';

export function mapRoot<I, O>(
  input: treeDict.RootDict<I>,
  leafValueCb: (input: abstracts.graphs.Leaf<I>, parent: treeDict.RootOrBranchDict<I>) => O,
) {
  const otput: treeDict.RootDict<O> = {
    children: {},
  };
  for (const inputKey in input.children) {
    const value = input[inputKey];
    otput[inputKey] = treeDict.mapBranch(otput, value, leafValueCb);
  }

  return otput;
}
