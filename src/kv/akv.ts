import {ArrayKeyValuable, KeyValuable} from "razomy.kv/kv";

/** Array key recursive value */
export class Akv<KT, VT> extends Array<KeyValuable<KT, VT>> {
  constructor(...kv: [KT, VT][]) {
    super(...kv);
  }
}

export function ak<T = any>(...items: KeyValuable<T, T>[]): ArrayKeyValuable<T, T>;
export function ak<K = any, V = any>(...items: KeyValuable<K, V>[]): ArrayKeyValuable<K, V>;
export function ak<K, V>(...items: KeyValuable<K, V>[]): ArrayKeyValuable<K, V> {
  return new Akv(...items);
}

export function is_akv<K, V>(obj: ArrayKeyValuable<K, V> | unknown): obj is ArrayKeyValuable<K, V> {
  return obj instanceof Akv;
}
