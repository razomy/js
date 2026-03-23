import { isAkv } from './is_akv';
import { akv } from './akv';
import * as kv from '@razomy/kv';
import * as fns from '@razomy/fns';

export function map<IV, OV>(input: kv.Value<IV>, mapCb: fns.Function<[kv.Value<IV>], kv.Value<OV>>): kv.Value<OV>;
export function map<K, IV, OV>(
  input: kv.KeyValuable<K, IV>,
  mapCb: fns.Function<[kv.KeyValuable<K, IV>], kv.KeyValuable<K, OV>>,
): kv.KeyValuable<K, OV>;
export function map<K, IV, OV>(
  input: kv.ArrayKeyValuable<K, IV>,
  mapCb: fns.Function<[kv.ArrayKeyValuable<K, IV>], kv.ArrayKeyValuable<K, OV>>,
): kv.ArrayKeyValuable<K, OV>;
export function map<K, IV, OV>(
  value: kv.Valuable<K, IV>,
  mapCb: fns.Function<[kv.Valuable<K, IV>], kv.Valuable<K, OV>>,
): kv.Valuable<K, OV>;
export function map<K, IV, OV>(
  value: kv.Valuable<K, IV>,
  mapCb: fns.Function<[kv.Valuable<K, IV>], kv.Valuable<K, OV>>,
): kv.Valuable<K, OV> {
  if (kv.isKv(value)) {
    const mapped = mapCb(value);
    mapped[1] = map(mapped[1], mapCb);
    return mapped;
  } else if (isAkv(value)) {
    const mapped = mapCb(value);
    if (isAkv(mapped)) {
      const mappedTwice = mapped.map((child) => map(child as any, mapCb) as kv.KeyValuable<K, OV>);
      return akv(...mappedTwice);
    }
    return mapped;
  } else {
    return mapCb(value);
  }
}
