import * as abstracts from "@razomy/abstracts";
import * as treeList from "@razomy/tree-list";

export interface ListTree<T> extends abstracts.domains.WithValue<T>, treeList.WithChildrenList<ListTree<T>> {}
