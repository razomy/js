import * as kv from '@razomy/kv';
import * as abstracts from '@razomy/abstracts';

export function isAkv<K, V>(obj: abstracts.structures.KeyValueArray<K, V> | unknown): obj is abstracts.structures.KeyValueArray<K, V> {
  return obj instanceof kv.Akv;
}
