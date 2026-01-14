import {BranchDict, BranchDictOrLeaf, RootDict} from 'razomy.trees/dict/dict';
import {Leaf} from 'razomy.trees/leaf';

export interface WithAbsolutePath {
  absolute_path: string
}

export interface AbsolutePathDictRoot<T> extends RootDict<T, AbsolutePathDictRoot<T>>, WithAbsolutePath {
}

export type AbsolutePathLeaf<T> = Leaf<T> & WithAbsolutePath;
export type AbsolutePathBranch<T> = BranchDict<T, AbsolutePathDictLeafOrRoot<T>> & WithAbsolutePath;
export type AbsolutePathDictLeafOrRoot<T> = AbsolutePathBranch<T> | AbsolutePathLeaf<T>;

export default function leaf_tree_absolute_path<T>(input: Leaf<T>, absolute_path: string): AbsolutePathLeaf<T>;
export default function leaf_tree_absolute_path<T>(input: BranchDict<T>, absolute_path: string): AbsolutePathBranch<T>;
export default function leaf_tree_absolute_path<T>(input: BranchDictOrLeaf<T>, absolute_path: string): AbsolutePathDictLeafOrRoot<T>;
export default function leaf_tree_absolute_path<T>(input: BranchDictOrLeaf<T>, absolute_path: string): AbsolutePathDictLeafOrRoot<T> {
  if ('children' in input) {
    const otput: AbsolutePathBranch<T> = {...input, absolute_path, children: {}, value: input.value};
    for (let input_key in input.children) {
      const value: BranchDictOrLeaf<T> = input.children[input_key];
      const new_prefix = absolute_path ? absolute_path + '.' + input_key : input_key;
      otput.children[input_key] = leaf_tree_absolute_path(value, new_prefix)
    }
    return otput;
  } else {
    const otput: AbsolutePathLeaf<T> = {...input, absolute_path};
    return otput;
  }
}