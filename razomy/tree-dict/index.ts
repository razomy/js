// Imports
import { dictToGraph } from './dict_to_graph';
import { foreachDeepDictOptional } from './foreach_deep_dict_optional';
import { get } from './get';
import { getByString } from './get_by_string';
import { getPath } from './get_path';
import { getValue } from './get_value';
import { iterate } from './iterate';
import { iterateChildren } from './iterate_children';
import { leafTreeAbsolutePath } from './leaf_tree_absolute_path';
import type { AbsolutePathBranch, AbsolutePathDictLeafOrRoot, AbsolutePathDictRoot, AbsolutePathLeaf, HasAbsolutePath } from './leaf_tree_absolute_path';
import { mapBranch } from './map_branch';
import type { BranchDict, BranchDictOrLeaf, RootDict, RootDictOrLeaf, RootOrBranchDict } from './map_branch';
import { mapRoot } from './map_root';
import type { HasChildrenDict } from './with_children_dict';

// Named exports
export {
  dictToGraph,
  foreachDeepDictOptional,
  get,
  getByString,
  getPath,
  getValue,
  iterate,
  iterateChildren,
  leafTreeAbsolutePath,
  mapBranch,
  mapRoot
};
export type {
  AbsolutePathBranch,
  AbsolutePathDictLeafOrRoot,
  AbsolutePathDictRoot,
  AbsolutePathLeaf,
  BranchDict,
  BranchDictOrLeaf,
  HasAbsolutePath,
  HasChildrenDict,
  RootDict,
  RootDictOrLeaf,
  RootOrBranchDict
};

// Default export
const treeDict = {
  dictToGraph,
  foreachDeepDictOptional,
  get,
  getByString,
  getPath,
  getValue,
  iterate,
  iterateChildren,
  leafTreeAbsolutePath,
  mapBranch,
  mapRoot,
};


export default treeDict;
