import * as kv_ from '@razomy/kv';
import * as functions from '@razomy/functions';
import * as abstracts from "@razomy/abstracts";

/**
 * true - success
 * false - break
 */
export function valueIterate<K, V>(
  value: abstracts.structures.KeyValue<K, V>,
  valueCb: functions.Function<[abstracts.structures.KeyValue<K, V>], boolean | undefined>,
): boolean {
  return kv_.iterate(value, (kv) => {
    if (!kv_.isKv(kv[0]) && !kv_.isAkv(kv[0])) {
      return valueCb(kv);
    }
    return false;
  });
}
