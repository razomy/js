import { mapBranch, type RootDict, type RootOrBranchDict } from './map_branch';
import * as abstracts from '@razomy/abstracts';

export function mapRoot<I, O>(
  input: RootDict<I>,
  leafValueCb: (input: abstracts.graphs.Leaf<I>, parent: RootOrBranchDict<I>) => O,
) {
  const otput: RootDict<O> = {
    children: {},
  };
  for (const inputKey in input.children) {
    const value = input[inputKey];
    otput[inputKey] = mapBranch(otput, value, leafValueCb);
  }

  return otput;
}
