import * as abstractions from "@razomy/abstractions";

export interface ListTree<T> extends abstractions.structure.HasValue<T>, abstractions.graph.HasChildren<ListTree<T>[]> {}

