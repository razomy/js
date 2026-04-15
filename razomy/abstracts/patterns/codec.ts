import * as abstracts from "@razomy/abstracts";

export interface Codec<D, E> extends abstracts.patterns.WithEncode<D, E>, abstracts.patterns.WithDecode<E, D> {}
