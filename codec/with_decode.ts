export type Decode<E, D> = (encoded: E) => D

export interface WithDecode<E, D> {
  decode(encoded: E): D;
}