import * as abstracts from '@razomy/abstracts';

export interface Codec<D, E> extends abstracts.patterns.HasEncode<D, E>, abstracts.patterns.HasDecode<E, D> {}

export type Decode<E, D> = (encoded: E) => D;

export interface HasDecode<E, D>  extends abstracts.meta.IHas{
  decode(encoded: E): D;
}

export type Encode<D, E> = (data: D) => E;

export interface HasEncode<D, E> extends abstracts.meta.IHas {
  encode(data: D): E;
}
