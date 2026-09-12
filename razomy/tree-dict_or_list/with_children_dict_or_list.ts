import * as treeDict from '@razomy/tree-dict';
import * as abstracts from '@razomy/abstracts';

export type HasChildrenDictOrList<T> = abstracts.graphs.HasChildren<T[]> | treeDict.HasChildrenDict<T>;
