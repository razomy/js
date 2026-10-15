import * as treeDict from '@razomy/tree-dict';
import * as abstractions from '@razomy/abstractions';

export type HasChildrenDictOrList<T> = abstractions.graphs.HasChildren<T[]> | treeDict.HasChildrenDict<T>;
