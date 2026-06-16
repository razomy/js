import * as treeDict from '@razomy/tree-dict';
import * as treeList from '@razomy/tree-list';

export type HasChildrenDictOrList<T> = treeList.HasChildrenList<T> | treeDict.HasChildrenDict<T>;
