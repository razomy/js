import {ArrayKeyValuable} from 'razomy.kv/kv';
import {Akv} from './akv';

export function isAkv<K, V>(obj: ArrayKeyValuable<K, V> | unknown): obj is ArrayKeyValuable<K, V> {
  return obj instanceof Akv;
}
