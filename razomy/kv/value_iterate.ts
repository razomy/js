import {isKv, KeyValuable, Valuable} from 'razomy.kv';
import {Function} from 'razomy.function';
import {isAkv} from 'razomy.kv';
import {iterate} from 'razomy.kv';

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
  });
}


