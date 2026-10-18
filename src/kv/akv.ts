import * as abstractions from '@razomy/abstractions';

/** Array key recursive value */
export class Akv<KT, VT> extends Array<abstractions.structure.KeyValue<KT, VT>> {
  constructor(...kv: [KT, VT][]) {
    super(...kv);
  }
}

export function akv<T = any>(...items: abstractions.structure.KeyValue<T, T>[]): abstractions.structure.KeyValueArray<T, T>;
export function akv<K = any, V = any>(...items: abstractions.structure.KeyValue<K, V>[]): abstractions.structure.KeyValueArray<K, V>;
export function akv<K, V>(...items: abstractions.structure.KeyValue<K, V>[]): abstractions.structure.KeyValueArray<K, V> {
  return new Akv(...items);
}
