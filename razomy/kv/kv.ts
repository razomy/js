import * as abstracts from '@razomy/abstracts';

/** Key recursive value */
export class Kv<KT, VT> extends Array<any> implements abstracts.structures.KeyValue <KT, VT> {
  [0]: abstracts.structures.Key<KT>;
  [1]: abstracts.structures.KvaOrValue<KT, VT>;

  //@ts-ignore
  public override length: 2;
  constructor(...kv: [abstracts.structures.Key<KT>, abstracts.structures.KvaOrValue<KT, VT>]) {
    super(2);
    this[0] = kv[0];
    this[1] = kv[1];
  }
}

export function isKv<KT, VT>(obj: unknown): obj is Kv<KT, VT> {
  return obj instanceof Kv;
}
