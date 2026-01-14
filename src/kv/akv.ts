import {ArrayKeyValuable, KeyValuable} from 'razomy.kv/kv';
/** Array key recursive value */
export class Akv<KT, VT> extends Array<KeyValuable<KT, VT>> {
  constructor(...kv: [KT, VT][]) {
    super(...kv);
  }
}

export default function akv<T = any>(...items: KeyValuable<T, T>[]): ArrayKeyValuable<T, T>;
export default function akv<K = any, V = any>(...items: KeyValuable<K, V>[]): ArrayKeyValuable<K, V>;
export default function akv<K, V>(...items: KeyValuable<K, V>[]): ArrayKeyValuable<K, V> {
  return new Akv(...items);
}
