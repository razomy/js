import * as abstracts from "@razomy/abstracts";

export interface ListTree<T> extends abstracts.structures.HasValue<T>, abstracts.graphs.HasChildren<ListTree<T>[]> {}
