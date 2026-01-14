import {ArrayKeyValuable, is_kv, KeyValuable, Valuable, Value} from "razomy.kv/kv";
import {Function} from "razomy.function/function";
import {ak, is_akv} from "razomy.kv/akv";

function map<IV, OV>(
  input: Value<IV>,
  map_cb: Function<[Value<IV>], Value<OV>>
): Value<OV>;
function map<K, IV, OV>(
  input: KeyValuable<K, IV>,
  map_cb: Function<[KeyValuable<K, IV>], KeyValuable<K, OV>>
): KeyValuable<K, OV>;
function map<K, IV, OV>(
  input: ArrayKeyValuable<K, IV>,
  map_cb: Function<[ArrayKeyValuable<K, IV>], ArrayKeyValuable<K, OV>>
): ArrayKeyValuable<K, OV>;
function map<K, IV, OV>(
  value: Valuable<K, IV>,
  map_cb: Function<[Valuable<K, IV>], Valuable<K, OV>>
): Valuable<K, OV>;
function map<K, IV, OV>(
  value: Valuable<K, IV>,
  map_cb: Function<[Valuable<K, IV>], Valuable<K, OV>>
): Valuable<K, OV> {
  if (is_kv(value)) {
    const mapped = map_cb(value);
    mapped[1] = map(mapped[1], map_cb);
    return mapped;
  } else if (is_akv(value)) {
    const mapped = map_cb(value);
    if (is_akv(mapped)) {
      const mapped_twice = mapped.map((child) => map(child as any, map_cb) as KeyValuable<K, OV>);
      return ak(...mapped_twice);
    }
    return mapped;
  } else {
    return map_cb(value);
  }
}

export default map;
