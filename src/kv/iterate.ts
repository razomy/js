import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';
import * as primitives from "@razomy/primitives";

/**
 * true - continue
 * false - break
 */
export function iterate<K, V>(
  value: abstractions.structure.KeyValue<K, V> | abstractions.structure.KeyValueArray<K, V>,
  nodeCb: abstractions.function_.Function<[abstractions.structure.KeyValue<K, V>], boolean | undefined>,
): boolean {
  if (kv.isKv(value)) {
    const res = primitives.booleanUndefined(nodeCb(value));
    // break
    if (!res) {
      return false;
    }
    return iterate(value[1] as abstractions.structure.KeyValueArray<K, V>, nodeCb);
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
