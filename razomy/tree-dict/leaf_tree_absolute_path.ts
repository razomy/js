import * as treeDict from '@razomy/tree-dict';
import * as abstracts from '@razomy/abstracts';

export interface WithAbsolutePath {
  absolutePath: abstracts.graphs.AbsolutePathString;
}

export interface AbsolutePathDictRoot<T> extends treeDict.RootDict<T, AbsolutePathDictRoot<T>>, WithAbsolutePath {}

export type AbsolutePathLeaf<T> = abstracts.graphs.Leaf<T> & WithAbsolutePath;
export type AbsolutePathBranch<T> = treeDict.BranchDict<T, AbsolutePathDictLeafOrRoot<T>> & WithAbsolutePath;
export type AbsolutePathDictLeafOrRoot<T> = AbsolutePathBranch<T> | AbsolutePathLeaf<T>;

export function leafTreeAbsolutePath<T>(input: abstracts.graphs.Leaf<T>, absolutePath: string): AbsolutePathLeaf<T>;
export function leafTreeAbsolutePath<T>(input: treeDict.BranchDict<T>, absolutePath: string): AbsolutePathBranch<T>;
export function leafTreeAbsolutePath<T>(
  input: treeDict.BranchDictOrLeaf<T>,
  absolutePath: string,
): AbsolutePathDictLeafOrRoot<T>;
export function leafTreeAbsolutePath<T>(
  input: treeDict.BranchDictOrLeaf<T>,
  absolutePath: string,
): AbsolutePathDictLeafOrRoot<T> {
  if ('children' in input) {
    const otput: AbsolutePathBranch<T> = { ...input, absolutePath, children: {}, value: input.value };
    for (let inputKey in input.children) {
      const value: treeDict.BranchDictOrLeaf<T> = input.children[inputKey];
      const newPrefix = absolutePath ? absolutePath + '.' + inputKey : inputKey;
      otput.children[inputKey] = leafTreeAbsolutePath(value, newPrefix);
    }
    return otput;
  } else {
    const otput: AbsolutePathLeaf<T> = { ...input, absolutePath };
    return otput;
  }
}
