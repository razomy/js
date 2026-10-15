import * as abstractions from "@razomy/abstractions";

export interface ListTree<T> extends abstractions.structures.HasValue<T>, abstractions.graphs.HasChildren<ListTree<T>[]> {}
