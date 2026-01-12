import {ArrayKeyValuable, is_kv, KeyValuable, Valuable, Value} from "razomy/kv/kv";
import {Function} from "razomy/function/function";
import {ak, is_akv} from "razomy/kv/akv";

function filter<V>(
  input: Value<V>,
  is_keep: Function<[Value<V>], boolean>
): Value<V>;
export function filter<K, V>(
  input: KeyValuable<K, V>,
  is_keep: Function<[KeyValuable<K, V>], boolean>
): KeyValuable<K, V>;
export function filter<K, V>(
  input: ArrayKeyValuable<K, V>,
  is_keep: Function<[ArrayKeyValuable<K, V>], boolean>
): ArrayKeyValuable<K, V>;
export function filter<K, V>(
  value: Valuable<K, V>,
  is_keep: Function<[Valuable<K, V>], boolean>
): Valuable<K, V>;
export function filter<K, V>(
  value: Valuable<K, V>,
  is_keep: Function<[Valuable<K, V>], boolean>
): Valuable<K, V> {
  if (is_kv(value)) {
    value[1] = filter(value[1], is_keep);
    return value;
  } else if (is_akv<K, V>(value)) {
    const children = ak<K, V>();
    for (let child of value) {
      if (is_keep(child)) {
        children.push(filter(child, is_keep));
      }
    }
    return children;
  } else {
    return value;
  }
}

export default filter;
