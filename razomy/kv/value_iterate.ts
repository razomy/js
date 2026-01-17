import {isKv, KeyValuable, Valuable} from 'razomy.kv/kv';
import {Function} from 'razomy.function';
import {isAkv} from 'razomy.kv/is_akv';
import {iterate} from 'razomy.kv/iterate';

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


