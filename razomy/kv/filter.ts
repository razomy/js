import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

export function filter<V>(input: abstractions.structure.Value<V>, isKeep: abstractions.function_.Function<[abstractions.structure.Value<V>], boolean>): abstractions.structure.Value<V>;
export function filter<K, V>(
  input: abstractions.structure.KeyValueArray<K, V>,
  isKeep: abstractions.function_.Function<[abstractions.structure.KeyValueArray<K, V>], boolean>,
): abstractions.structure.KeyValueArray<K, V>;
export function filter<K, V>(
  value: abstractions.structure.KeyValueArray<K, V> | abstractions.structure.KeyValue<K, V>,
  isKeep: abstractions.function_.Function<[abstractions.structure.KeyValueArray<K, V> | abstractions.structure.KeyValue<K, V>], boolean>,
): abstractions.structure.KeyValueArray<K, V> | abstractions.structure.KeyValue<K, V> {
  if (kv.isKv(value)) {
    const val = value[1] as abstractions.structure.KeyValueArray<K, V>;
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
