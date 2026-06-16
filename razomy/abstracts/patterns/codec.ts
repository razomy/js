import * as abstracts from '@razomy/abstracts';

export interface Codec<D, E> extends abstracts.patterns.HasEncode<D, E>, abstracts.patterns.HasDecode<E, D> {}
