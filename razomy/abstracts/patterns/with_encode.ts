export type Encode<D, E> = (data: D) => E;

export interface HasEncode<D, E> {
  encode(data: D): E;
}
