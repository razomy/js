import * as treeDict from "@razomy/tree-dict";
import * as abstracts from "@razomy/abstracts";

export interface BranchDict<T, R = BranchDictOrLeaf<T>> extends RootDict<T, R> {
  value: string;
}

export type BranchDictOrLeaf<T> = BranchDict<T> | abstracts.graphs.Leaf<T>;
export type RootOrBranchDict<T> = RootDict<T> | BranchDict<T>;
export type RootDictOrLeaf<T> = RootDict<T> | abstracts.graphs.Leaf<T>;

export interface RootDict<T, R = unknown> extends treeDict.WithChildrenDict<R> {}

export function mapBranch<I, O>(
  parent: RootDict<O>,
  input: BranchDictOrLeaf<I>,
  leafValueCb: (input: abstracts.graphs.Leaf<I>, parent: RootOrBranchDict<I>) => O,
): BranchDictOrLeaf<O> {
  if ('children' in input) {
    const otput: BranchDict<O> = {
      value: input.value,
      children: {},
    };
    for (let inputKey in input.children) {
      const value = input[inputKey];
      otput[inputKey] = mapBranch(otput, value, leafValueCb);
    }

    return otput;
  } else {
    return {
      value: leafValueCb(input, parent),
    };
  }
}
