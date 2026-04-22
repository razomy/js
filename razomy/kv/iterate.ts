import * as kv from '@razomy/kv';
import * as functions from '@razomy/functions';
// import * as undefined from '@razomy/undefined';
import * as abstracts from '@razomy/abstracts';
import * as primitives from "@razomy/primitives";

/**
 * true - continue
 * false - break
 */
export function iterate<K, V>(
  value: abstracts.structures.KeyValue<K, V> | abstracts.structures.KeyValueArray<K, V>,
  nodeCb: functions.Function<[abstracts.structures.KeyValue<K, V>], boolean | undefined>,
): boolean {
  if (kv.isKv(value)) {
    const res = primitives.booleanUndefined(nodeCb(value));
    // break
    if (!res) {
      return false;
    }
    return iterate(value[1] as abstracts.structures.KeyValueArray<K, V>, nodeCb);
  } else if (kv.isAkv(value)) {
    for (const child of value) {
      const res = iterate(child, nodeCb);
      // break
      if (!res) {
        return false;
      }
    }
    return true;
  } else {
    // skip value
    return true;
  }
}
