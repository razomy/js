import * as kv from '@razomy/kv';

/** Array key recursive value */
export class Akv<KT, VT> extends Array<kv.KeyValuable<KT, VT>> {
  constructor(...kv: [KT, VT][]) {
    super(...kv);
  }
}

export function akv<T = any>(...items: kv.KeyValuable<T, T>[]): kv.ArrayKeyValuable<T, T>;
export function akv<K = any, V = any>(...items: kv.KeyValuable<K, V>[]): kv.ArrayKeyValuable<K, V>;
export function akv<K, V>(...items: kv.KeyValuable<K, V>[]): kv.ArrayKeyValuable<K, V> {
  return new Akv(...items);
}
