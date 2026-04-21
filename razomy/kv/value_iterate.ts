import * as kv_ from '@razomy/kv';
import * as fns from '../functions';

/**
 * true - success
 * false - break
 */
export function valueIterate<K, V>(
  value: kv_.Valuable<K, V>,
  valueCb: fns.Function<[kv_.KeyValue<K, V>], boolean | undefined>,
): boolean {
  return kv_.iterate(value, (kv) => {
    if (!kv_.isKv(kv[0]) && !kv_.isAkv(kv[0])) {
      return valueCb(kv);
    }
    return false;
  });
}
