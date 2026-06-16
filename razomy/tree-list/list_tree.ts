import * as abstracts from '@razomy/abstracts';
import * as treeList from '@razomy/tree-list';

export interface ListTree<T> extends abstracts.domains.HasValue<T>, treeList.HasChildrenList<ListTree<T>> {}
