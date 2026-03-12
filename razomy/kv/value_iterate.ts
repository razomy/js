import * as kv_ from "@razomy/kv";
import * as function_ from "@razomy/function";

/**
 * true - success
 * false - break
 */
export function valueIterate<K, V>(
  value: kv_.Valuable<K, V>,
  valueCb: function_.Function<[kv_.KeyValuable<K, V>], boolean | undefined>,
): boolean {
  return kv_.iterate(value, (kv) => {
    if (!kv_.isKv(kv[0]) && !kv_.isAkv(kv[0])) {
      return valueCb(kv);
    }
    return false;
  });
}
