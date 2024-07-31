export type Encode<D, E> = (data: D) => E

export interface IEncode<D, E> {
  encode(data: D): E;
}
