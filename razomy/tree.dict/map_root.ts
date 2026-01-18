import {Leaf} from 'razomy.tree';
import {mapBranch, RootDict, RootOrBranchDict} from './map_branch';

export function mapRoot<I, O>(input: RootDict<I>, leafValueCb: (input: Leaf<I>, parent: RootOrBranchDict<I>) => O) {
  const otput: RootDict<O> = {
    children: {}
  };
  for (let inputKey in input.children) {
    const value = input[inputKey];
    otput[inputKey] = mapBranch(otput, value, leafValueCb)
  }

  return otput;
}
