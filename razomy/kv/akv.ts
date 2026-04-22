import * as abstracts from '@razomy/abstracts';

/** Array key recursive value */
export class Akv<KT, VT> extends Array<abstracts.structures.KeyValue<KT, VT>> {
  constructor(...kv: [KT, VT][]) {
    super(...kv);
  }
}

export function akv<T = any>(...items: abstracts.structures.KeyValue<T, T>[]): abstracts.structures.KeyValueArray<T, T>;
export function akv<K = any, V = any>(...items: abstracts.structures.KeyValue<K, V>[]): abstracts.structures.KeyValueArray<K, V>;
export function akv<K, V>(...items: abstracts.structures.KeyValue<K, V>[]): abstracts.structures.KeyValueArray<K, V> {
  return new Akv(...items);
}
