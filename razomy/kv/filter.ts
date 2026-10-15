import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

export function filter<V>(input: abstractions.structures.Value<V>, isKeep: abstractions.functions.Function<[abstractions.structures.Value<V>], boolean>): abstractions.structures.Value<V>;
export function filter<K, V>(
  input: abstractions.structures.KeyValueArray<K, V>,
  isKeep: abstractions.functions.Function<[abstractions.structures.KeyValueArray<K, V>], boolean>,
): abstractions.structures.KeyValueArray<K, V>;
export function filter<K, V>(
  value: abstractions.structures.KeyValueArray<K, V> | abstractions.structures.KeyValue<K, V>,
  isKeep: abstractions.functions.Function<[abstractions.structures.KeyValueArray<K, V> | abstractions.structures.KeyValue<K, V>], boolean>,
): abstractions.structures.KeyValueArray<K, V> | abstractions.structures.KeyValue<K, V> {
  if (kv.isKv(value)) {
    const val = value[1] as abstractions.structures.KeyValueArray<K, V>;
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
