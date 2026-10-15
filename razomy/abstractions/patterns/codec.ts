import * as abstractions from '@razomy/abstractions';

export interface Codec<D, E> extends abstractions.patterns.HasEncode<D, E>, abstractions.patterns.HasDecode<E, D> {}

export type Decode<E, D> = (encoded: E) => D;

export interface HasDecode<E, D>  extends abstractions.meta.IHas{
  decode(encoded: E): D;
}

export type Encode<D, E> = (data: D) => E;

export interface HasEncode<D, E> extends abstractions.meta.IHas {
  encode(data: D): E;
}
