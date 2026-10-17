import * as treeDict from '@razomy/tree-dict';
import * as abstractions from '@razomy/abstractions';

export interface HasAbsolutePath {
  absolutePath: abstractions.components.AbsolutePath;
}

export interface AbsolutePathDictRoot<T> extends treeDict.RootDict<T, AbsolutePathDictRoot<T>>, HasAbsolutePath {}

export type AbsolutePathLeaf<T> = abstractions.graphs.Leaf<T> & HasAbsolutePath;
export type AbsolutePathBranch<T> = treeDict.BranchDict<T, AbsolutePathDictLeafOrRoot<T>> & HasAbsolutePath;
export type AbsolutePathDictLeafOrRoot<T> = AbsolutePathBranch<T> | AbsolutePathLeaf<T>;

export function leafTreeAbsolutePath<T>(input: abstractions.graphs.Leaf<T>, absolutePath: string): AbsolutePathLeaf<T>;
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
    for (const inputKey in input.children) {
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
