export type Decode<E, D> = (encoded: E) => D

export interface IDecode<E, D> {
  decode(encoded: E): D;
}