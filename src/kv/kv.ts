import * as abstractions from '@razomy/abstractions';

/** Key recursive value */
  //@ts-ignore
export class Kv<KT, VT> extends Array<any> implements abstractions.structure.KeyValue <KT, VT> {
  [0]: abstractions.structure.Key<KT>;
  [1]: abstractions.structure.KvaOrValue<KT, VT>;

  constructor(...kv: [abstractions.structure.Key<KT>, abstractions.structure.KvaOrValue<KT, VT>]) {
    super(2);
    this[0] = kv[0];
    this[1] = kv[1];
  }
}

export function isKv<KT, VT>(obj: unknown): obj is Kv<KT, VT> {
  return obj instanceof Kv;
}
