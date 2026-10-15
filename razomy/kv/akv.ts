import * as abstractions from '@razomy/abstractions';

/** Array key recursive value */
export class Akv<KT, VT> extends Array<abstractions.structures.KeyValue<KT, VT>> {
  constructor(...kv: [KT, VT][]) {
    super(...kv);
  }
}

export function akv<T = any>(...items: abstractions.structures.KeyValue<T, T>[]): abstractions.structures.KeyValueArray<T, T>;
export function akv<K = any, V = any>(...items: abstractions.structures.KeyValue<K, V>[]): abstractions.structures.KeyValueArray<K, V>;
export function akv<K, V>(...items: abstractions.structures.KeyValue<K, V>[]): abstractions.structures.KeyValueArray<K, V> {
  return new Akv(...items);
}
