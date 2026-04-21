import * as kv from '@razomy/kv';
import * as fns from '../functions';

export function filter<V>(input: kv.Value<V>, isKeep: fns.Function<[kv.Value<V>], boolean>): kv.Value<V>;
export function filter<K, V>(
  input: kv.KeyValue<K, V>,
  isKeep: fns.Function<[kv.KeyValue<K, V>], boolean>,
): kv.KeyValue<K, V>;
export function filter<K, V>(
  input: kv.KeyValueArray<K, V>,
  isKeep: fns.Function<[kv.KeyValueArray<K, V>], boolean>,
): kv.KeyValueArray<K, V>;
export function filter<K, V>(
  value: kv.Valuable<K, V>,
  isKeep: fns.Function<[kv.Valuable<K, V>], boolean>,
): kv.Valuable<K, V>;
export function filter<K, V>(
  value: kv.Valuable<K, V>,
  isKeep: fns.Function<[kv.Valuable<K, V>], boolean>,
): kv.Valuable<K, V> {
  if (kv.isKv(value)) {
    value[1] = filter(value[1], isKeep);
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
