
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

export function isKv<KT, VT>(obj: unknown): obj is KeyValuable<KT, VT> {
  return obj instanceof Kv;
}
