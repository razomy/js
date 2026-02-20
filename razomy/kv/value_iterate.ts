import {isAkv, isKv, iterate, type KeyValuable, type Valuable} from '@razomy/kv';
import type {Function} from '@razomy/function';

/**
 * true - success
 * false - break
 */
export function valueIterate<K, V>(
  value: Valuable<K, V>,
  valueCb: Function<[KeyValuable<K, V>], boolean | undefined>
): boolean {
  return iterate(value, (kv) => {
    if (!isKv(kv[0]) && !isAkv(kv[0])) {
      return valueCb(kv);
    }
    return false;
  });
}


