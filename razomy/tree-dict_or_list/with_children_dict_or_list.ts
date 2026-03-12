import * as treeDict from "@razomy/tree-dict";
import * as treeList from "@razomy/tree-list";

export type WithChildrenDictOrList<T> = treeList.WithChildrenList<T> | treeDict.WithChildrenDict<T>;
