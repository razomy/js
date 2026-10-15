import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

export function map<IV, OV>(input: abstractions.structures.Value<IV>, mapCb: abstractions.functions.Function<[abstractions.structures.Value<IV>], abstractions.structures.Value<OV>>): abstractions.structures.Value<OV>;
export function map<K, IV, OV>(
  input: abstractions.structures.KeyValue<K, IV>,
  mapCb: abstractions.functions.Function<[abstractions.structures.KeyValue<K, IV>], abstractions.structures.KeyValue<K, OV>>,
): abstractions.structures.KeyValue<K, OV>;
export function map<K, IV, OV>(
  input: abstractions.structures.KeyValueArray<K, IV>,
  mapCb: abstractions.functions.Function<[abstractions.structures.KeyValueArray<K, IV>], abstractions.structures.KeyValueArray<K, OV>>,
): abstractions.structures.KeyValueArray<K, OV>;
export function map<K, IV, OV>(
  value: abstractions.structures.KvaOrValue<K, IV>,
  mapCb: abstractions.functions.Function<[abstractions.structures.KvaOrValue<K, IV>], abstractions.structures.KvaOrValue<K, OV>>,
): abstractions.structures.KvaOrValue<K, OV>;
export function map<K, IV, OV>(
  value: abstractions.structures.KvaOrValue<K, IV>,
  mapCb: abstractions.functions.Function<[abstractions.structures.KvaOrValue<K, IV>], abstractions.structures.KvaOrValue<K, OV>>,
): abstractions.structures.KvaOrValue<K, OV> {
  if (kv.isKv(value)) {
    const mapped = mapCb(value);
    mapped[1] = map(mapped[1], mapCb);
    return mapped;
  } else if (kv.isAkv(value)) {
    const mapped = mapCb(value);
    if (kv.isAkv(mapped)) {
      const mappedTwice = mapped.map((child) => map(child as any, mapCb) as abstractions.structures.KeyValue<K, OV>);
      return kv.akv(...mappedTwice);
    }
    return mapped;
  } else {
    return mapCb(value);
  }
}
