import { akv } from './akv';
import { isAkv } from './index';
import * as kv from '@razomy/kv';
import * as function_ from '@razomy/function';

export function filter<V>(input: kv.Value<V>, isKeep: function_.Function<[kv.Value<V>], boolean>): kv.Value<V>;
export function filter<K, V>(
  input: kv.KeyValuable<K, V>,
  isKeep: function_.Function<[kv.KeyValuable<K, V>], boolean>,
): kv.KeyValuable<K, V>;
export function filter<K, V>(
  input: kv.ArrayKeyValuable<K, V>,
  isKeep: function_.Function<[kv.ArrayKeyValuable<K, V>], boolean>,
): kv.ArrayKeyValuable<K, V>;
export function filter<K, V>(
  value: kv.Valuable<K, V>,
  isKeep: function_.Function<[kv.Valuable<K, V>], boolean>,
): kv.Valuable<K, V>;
export function filter<K, V>(
  value: kv.Valuable<K, V>,
  isKeep: function_.Function<[kv.Valuable<K, V>], boolean>,
): kv.Valuable<K, V> {
  if (kv.isKv(value)) {
    value[1] = filter(value[1], isKeep);
    return value;
  } else if (isAkv<K, V>(value)) {
    const children = akv<K, V>();
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
