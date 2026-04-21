import * as kv from '@razomy/kv';

/** Array key recursive value */
export class Akv<KT, VT> extends Array<kv.KeyValue<KT, VT>> {
  constructor(...kv: [KT, VT][]) {
    super(...kv);
  }
}

export function akv<T = any>(...items: kv.KeyValue<T, T>[]): kv.KeyValueArray<T, T>;
export function akv<K = any, V = any>(...items: kv.KeyValue<K, V>[]): kv.KeyValueArray<K, V>;
export function akv<K, V>(...items: kv.KeyValue<K, V>[]): kv.KeyValueArray<K, V> {
  return new Akv(...items);
}
