import {is_kv, KeyValuable, Valuable} from "razomy.js/kv/kv";
import {Function} from "razomy.js/function/function";
import {is_akv} from "razomy.js/kv/akv";
import {iterate} from "razomy.js/kv/iterate";


/**
 * true - success
 * false - break
 */
export function value_iterate<K, V>(
  value: Valuable<K, V>,
  value_cb: Function<[KeyValuable<K, V>], boolean | undefined>
): boolean {
  return iterate(value, (kv) => {
    if (!is_kv(kv[0]) && !is_akv(kv[0])) {
      return value_cb(kv);
    }
  });
}

