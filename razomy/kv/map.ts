import * as kv from '@razomy/kv';
import * as functions from '@razomy/functions';
import * as abstracts from '@razomy/abstracts';

export function map<IV, OV>(input: abstracts.structures.Value<IV>, mapCb: functions.Function<[abstracts.structures.Value<IV>], abstracts.structures.Value<OV>>): abstracts.structures.Value<OV>;
export function map<K, IV, OV>(
  input: abstracts.structures.KeyValue<K, IV>,
  mapCb: functions.Function<[abstracts.structures.KeyValue<K, IV>], abstracts.structures.KeyValue<K, OV>>,
): abstracts.structures.KeyValue<K, OV>;
export function map<K, IV, OV>(
  input: abstracts.structures.KeyValueArray<K, IV>,
  mapCb: functions.Function<[abstracts.structures.KeyValueArray<K, IV>], abstracts.structures.KeyValueArray<K, OV>>,
): abstracts.structures.KeyValueArray<K, OV>;
export function map<K, IV, OV>(
  value: abstracts.structures.KvaOrValue<K, IV>,
  mapCb: functions.Function<[abstracts.structures.KvaOrValue<K, IV>], abstracts.structures.KvaOrValue<K, OV>>,
): abstracts.structures.KvaOrValue<K, OV>;
export function map<K, IV, OV>(
  value: abstracts.structures.KvaOrValue<K, IV>,
  mapCb: functions.Function<[abstracts.structures.KvaOrValue<K, IV>], abstracts.structures.KvaOrValue<K, OV>>,
): abstracts.structures.KvaOrValue<K, OV> {
  if (kv.isKv(value)) {
    const mapped = mapCb(value);
    mapped[1] = map(mapped[1], mapCb);
    return mapped;
  } else if (kv.isAkv(value)) {
    const mapped = mapCb(value);
    if (kv.isAkv(mapped)) {
      const mappedTwice = mapped.map((child) => map(child as any, mapCb) as abstracts.structures.KeyValue<K, OV>);
      return kv.akv(...mappedTwice);
    }
    return mapped;
  } else {
    return mapCb(value);
  }
}
