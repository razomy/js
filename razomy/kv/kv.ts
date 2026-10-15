import * as abstractions from '@razomy/abstractions';

/** Key recursive value */
  //@ts-ignore
export class Kv<KT, VT> extends Array<any> implements abstractions.structures.KeyValue <KT, VT> {
  [0]: abstractions.structures.Key<KT>;
  [1]: abstractions.structures.KvaOrValue<KT, VT>;

  constructor(...kv: [abstractions.structures.Key<KT>, abstractions.structures.KvaOrValue<KT, VT>]) {
    super(2);
    this[0] = kv[0];
    this[1] = kv[1];
  }
}

export function isKv<KT, VT>(obj: unknown): obj is Kv<KT, VT> {
  return obj instanceof Kv;
}
