import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

export function isAkv<K, V>(obj: abstractions.structures.KeyValueArray<K, V> | unknown): obj is abstractions.structures.KeyValueArray<K, V> {
  return obj instanceof kv.Akv;
}
