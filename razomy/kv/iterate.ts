import  { is_kv, KeyValuable, Valuable} from 'razomy.kv/kv';
import {Function} from 'razomy.function';
import {is_akv} from 'razomy.kv/is_akv';
import {boolean_undefined} from 'razomy.undefined/boolean_undefined';

/**
 * true - continue
 * false - break
 */
export function iterate<K, V>(
  value: Valuable<K, V>,
  node_cb: Function<[KeyValuable<K, V>], boolean | undefined>
): boolean {
  if (is_kv(value)) {
    const res = boolean_undefined(node_cb(value));
    // break
    if (!res) {
      return false;
    }
    return iterate(value[1], node_cb);
  } else if (is_akv(value)) {
    for (let child of value) {
      const res = iterate(child, node_cb);
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


