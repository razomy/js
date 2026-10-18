import * as kv_ from '@razomy/kv';
import * as abstractions from "@razomy/abstractions";

/**
 * true - success
 * false - break
 */
export function valueIterate<K, V>(
  value: abstractions.structure.KeyValue<K, V>,
  valueCb: abstractions.function_.Function<[abstractions.structure.KeyValue<K, V>], boolean | undefined>,
): boolean {
  return kv_.iterate(value, (kv) => {
    if (!kv_.isKv(kv[0]) && !kv_.isAkv(kv[0])) {
      return valueCb(kv);
    }
    return false;
  });
}
