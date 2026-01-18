import {ArrayKeyValuable, isKv, KeyValuable, Valuable, Value} from 'razomy.kv';
import {Function} from 'razomy.function';
import {akv} from './akv';
import {isAkv} from './index';

export function filter<V>(
  input: Value<V>,
  isKeep: Function<[Value<V>], boolean>
): Value<V>;
export function filter<K, V>(
  input: KeyValuable<K, V>,
  isKeep: Function<[KeyValuable<K, V>], boolean>
): KeyValuable<K, V>;
export function filter<K, V>(
  input: ArrayKeyValuable<K, V>,
  isKeep: Function<[ArrayKeyValuable<K, V>], boolean>
): ArrayKeyValuable<K, V>;
export function filter<K, V>(
  value: Valuable<K, V>,
  isKeep: Function<[Valuable<K, V>], boolean>
): Valuable<K, V>;
export function filter<K, V>(
  value: Valuable<K, V>,
  isKeep: Function<[Valuable<K, V>], boolean>
): Valuable<K, V> {
  if (isKv(value)) {
    value[1] = filter(value[1], isKeep);
    return value;
  } else if (isAkv<K, V>(value)) {
    const children = akv<K, V>();
    for (let child of value) {
      if (isKeep(child)) {
        children.push(filter(child, isKeep));
      }
    }
    return children;
  } else {
    return value;
  }
}


