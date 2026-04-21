import * as kv from '@razomy/kv';
import * as fns from '../functions';

export function map<IV, OV>(input: kv.Value<IV>, mapCb: fns.Function<[kv.Value<IV>], kv.Value<OV>>): kv.Value<OV>;
export function map<K, IV, OV>(
  input: kv.KeyValue<K, IV>,
  mapCb: fns.Function<[kv.KeyValue<K, IV>], kv.KeyValue<K, OV>>,
): kv.KeyValue<K, OV>;
export function map<K, IV, OV>(
  input: kv.KeyValueArray<K, IV>,
  mapCb: fns.Function<[kv.KeyValueArray<K, IV>], kv.KeyValueArray<K, OV>>,
): kv.KeyValueArray<K, OV>;
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
  } else if (kv.isAkv(value)) {
    const mapped = mapCb(value);
    if (kv.isAkv(mapped)) {
      const mappedTwice = mapped.map((child) => map(child as any, mapCb) as kv.KeyValue<K, OV>);
      return kv.akv(...mappedTwice);
    }
    return mapped;
  } else {
    return mapCb(value);
  }
}
