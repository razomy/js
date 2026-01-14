export type Value<T> = T
export type Key<T> = T

export type KeyValuable<KT, VT> = [Key<KT>, Valuable<KT, VT>]
export type ArrayKeyValuable<KT, VT> = KeyValuable<KT, VT>[]

export type ArrayOrKeyValuable<KT, VT> =
  KeyValuable<KT, VT>
  | ArrayKeyValuable<KT, VT>

export type Valuable<KT, VT> = Value<VT>
  | ArrayOrKeyValuable<KT, VT>

/** Key recursive value */
export class Kv<KT, VT> extends Array<any> {
  [0]: Key<KT>;
  [1]: Valuable<KT, VT>;

  constructor(...kv: [Key<KT>, Valuable<KT, VT>]) {
    super(2);
    this[0] = kv[0];
    this[1] = kv[1];
  }
}

export function is_kv<KT, VT>(obj: unknown): obj is KeyValuable<KT, VT> {
  return obj instanceof Kv;
}
