import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

export function isAkv<K, V>(obj: abstractions.structure.KeyValueArray<K, V> | unknown): obj is abstractions.structure.KeyValueArray<K, V> {
  return obj instanceof kv.Akv;
}
