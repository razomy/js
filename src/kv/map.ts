import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

export function map<IV, OV>(input: abstractions.structure.Value<IV>, mapCb: abstractions.function_.Function<[abstractions.structure.Value<IV>], abstractions.structure.Value<OV>>): abstractions.structure.Value<OV>;
export function map<K, IV, OV>(
  input: abstractions.structure.KeyValue<K, IV>,
  mapCb: abstractions.function_.Function<[abstractions.structure.KeyValue<K, IV>], abstractions.structure.KeyValue<K, OV>>,
): abstractions.structure.KeyValue<K, OV>;
export function map<K, IV, OV>(
  input: abstractions.structure.KeyValueArray<K, IV>,
  mapCb: abstractions.function_.Function<[abstractions.structure.KeyValueArray<K, IV>], abstractions.structure.KeyValueArray<K, OV>>,
): abstractions.structure.KeyValueArray<K, OV>;
export function map<K, IV, OV>(
  value: abstractions.structure.KvaOrValue<K, IV>,
  mapCb: abstractions.function_.Function<[abstractions.structure.KvaOrValue<K, IV>], abstractions.structure.KvaOrValue<K, OV>>,
): abstractions.structure.KvaOrValue<K, OV>;
export function map<K, IV, OV>(
  value: abstractions.structure.KvaOrValue<K, IV>,
  mapCb: abstractions.function_.Function<[abstractions.structure.KvaOrValue<K, IV>], abstractions.structure.KvaOrValue<K, OV>>,
): abstractions.structure.KvaOrValue<K, OV> {
  if (kv.isKv(value)) {
    const mapped = mapCb(value);
    mapped[1] = map(mapped[1], mapCb);
    return mapped;
  } else if (kv.isAkv(value)) {
    const mapped = mapCb(value);
    if (kv.isAkv(mapped)) {
      const mappedTwice = mapped.map((child) => map(child as any, mapCb) as abstractions.structure.KeyValue<K, OV>);
      return kv.akv(...mappedTwice);
    }
    return mapped;
  } else {
    return mapCb(value);
  }
}
