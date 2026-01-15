export type Encode<D, E> = (data: D) => E

export interface WithEncode<D, E> {
  encode(data: D): E;
}
