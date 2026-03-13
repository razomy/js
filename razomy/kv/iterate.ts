import * as kv from '@razomy/kv';
import * as function_ from '@razomy/function';
import * as undefined from '@razomy/undefined';

/**
 * true - continue
 * false - break
 */
export function iterate<K, V>(
  value: kv.Valuable<K, V>,
  nodeCb: function_.Function<[kv.KeyValuable<K, V>], boolean | undefined>,
): boolean {
  if (kv.isKv(value)) {
    const res = undefined.booleanUndefined(nodeCb(value));
    // break
    if (!res) {
      return false;
    }
    return iterate(value[1], nodeCb);
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
