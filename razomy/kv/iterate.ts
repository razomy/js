import {isKv, KeyValuable, Valuable} from 'razomy.kv/kv';
import {Function} from 'razomy.function';
import {isAkv} from 'razomy.kv/is_akv';
import {booleanUndefined} from 'razomy.undefined/boolean_undefined';

/**
 * true - continue
 * false - break
 */
export function iterate<K, V>(
  value: Valuable<K, V>,
  nodeCb: Function<[KeyValuable<K, V>], boolean | undefined>
): boolean {
  if (isKv(value)) {
    const res = booleanUndefined(nodeCb(value));
    // break
    if (!res) {
      return false;
    }
    return iterate(value[1], nodeCb);
  } else if (isAkv(value)) {
    for (let child of value) {
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


