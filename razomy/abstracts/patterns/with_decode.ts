export type Decode<E, D> = (encoded: E) => D;

export interface HasDecode<E, D> {
  decode(encoded: E): D;
}
