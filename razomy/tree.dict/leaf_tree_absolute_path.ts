import {BranchDict, BranchDictOrLeaf, RootDict} from 'razomy.tree.dict';
import {Leaf} from 'razomy.tree';

export interface WithAbsolutePath {
  absolutePath: string
}

export interface AbsolutePathDictRoot<T> extends RootDict<T, AbsolutePathDictRoot<T>>, WithAbsolutePath {
}

export type AbsolutePathLeaf<T> = Leaf<T> & WithAbsolutePath;
export type AbsolutePathBranch<T> = BranchDict<T, AbsolutePathDictLeafOrRoot<T>> & WithAbsolutePath;
export type AbsolutePathDictLeafOrRoot<T> = AbsolutePathBranch<T> | AbsolutePathLeaf<T>;

export function leafTreeAbsolutePath<T>(input: Leaf<T>, absolutePath: string): AbsolutePathLeaf<T>;
export function leafTreeAbsolutePath<T>(input: BranchDict<T>, absolutePath: string): AbsolutePathBranch<T>;
export function leafTreeAbsolutePath<T>(input: BranchDictOrLeaf<T>, absolutePath: string): AbsolutePathDictLeafOrRoot<T>;
export function leafTreeAbsolutePath<T>(input: BranchDictOrLeaf<T>, absolutePath: string): AbsolutePathDictLeafOrRoot<T> {
  if ('children' in input) {
    const otput: AbsolutePathBranch<T> = {...input, absolutePath, children: {}, value: input.value};
    for (let inputKey in input.children) {
      const value: BranchDictOrLeaf<T> = input.children[inputKey];
      const newPrefix = absolutePath ? absolutePath + '.' + inputKey : inputKey;
      otput.children[inputKey] = leafTreeAbsolutePath(value, newPrefix)
    }
    return otput;
  } else {
    const otput: AbsolutePathLeaf<T> = {...input, absolutePath};
    return otput;
  }
}