import {BranchDict, BranchDictOrLeaf, RootDict} from "razomy.js/trees/dict/dict";
import {Leaf} from "razomy.js/trees/leaf";

export interface WithAbsolutePath {
  absolute_path: string
}

export interface AbsolutePathDictRoot<T> extends RootDict<T, AbsolutePathDictRoot<T>>, WithAbsolutePath {
}

export type AbsolutePathLeaf<T> = Leaf<T> & WithAbsolutePath;
export type AbsolutePathBranch<T> = BranchDict<T, AbsolutePathDictLeafOrRoot<T>> & WithAbsolutePath;
export type AbsolutePathDictLeafOrRoot<T> = AbsolutePathBranch<T> | AbsolutePathLeaf<T>;

export function leafTreeAbsolutePath<T>(input: Leaf<T>, absolute_path: string): AbsolutePathLeaf<T>;
export function leafTreeAbsolutePath<T>(input: BranchDict<T>, absolute_path: string): AbsolutePathBranch<T>;
export function leafTreeAbsolutePath<T>(input: BranchDictOrLeaf<T>, absolute_path: string): AbsolutePathDictLeafOrRoot<T>;
export function leafTreeAbsolutePath<T>(input: BranchDictOrLeaf<T>, absolute_path: string): AbsolutePathDictLeafOrRoot<T> {
  if ('children' in input) {
    const otput: AbsolutePathBranch<T> = {...input, absolute_path, children: {}, value: input.value};
    for (let inputKey in input.children) {
      const value: BranchDictOrLeaf<T> = input.children[inputKey];
      const newPrefix = absolute_path ? absolute_path + '.' + inputKey : inputKey;
      otput.children[inputKey] = leafTreeAbsolutePath(value, newPrefix)
    }
    return otput;
  } else {
    const otput: AbsolutePathLeaf<T> = {...input, absolute_path};
    return otput;
  }
}