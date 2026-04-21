import * as kv from '@razomy/kv';

export function isAkv<K, V>(obj: kv.KeyValueArray<K, V> | unknown): obj is kv.KeyValueArray<K, V> {
  return obj instanceof kv.Akv;
}
