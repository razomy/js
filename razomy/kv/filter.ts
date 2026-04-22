import * as kv from '@razomy/kv';
import * as functions from '@razomy/functions';
import * as abstracts from '@razomy/abstracts';

export function filter<V>(input: abstracts.structures.Value<V>, isKeep: functions.Function<[abstracts.structures.Value<V>], boolean>): abstracts.structures.Value<V>;
export function filter<K, V>(
  input: abstracts.structures.KeyValueArray<K, V>,
  isKeep: functions.Function<[abstracts.structures.KeyValueArray<K, V>], boolean>,
): abstracts.structures.KeyValueArray<K, V>;
export function filter<K, V>(
  value: abstracts.structures.KeyValueArray<K, V> | abstracts.structures.KeyValue<K, V>,
  isKeep: functions.Function<[abstracts.structures.KeyValueArray<K, V> | abstracts.structures.KeyValue<K, V>], boolean>,
): abstracts.structures.KeyValueArray<K, V> | abstracts.structures.KeyValue<K, V> {
  if (kv.isKv(value)) {
    const val = value[1] as abstracts.structures.KeyValueArray<K, V>;
    value[1] = filter(val, isKeep);
    return value;
  } else if (kv.isAkv<K, V>(value)) {
    const children = kv.akv<K, V>();
    for (const child of value) {
      if (isKeep(child)) {
        children.push(filter(child, isKeep));
      }
    }
    return children;
  } else {
    return value;
  }
}
