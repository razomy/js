import {ArrayKeyValuable, isKv, KeyValuable, Valuable, Value} from 'razomy.kv/kv';
import {Function} from 'razomy.function';
import {isAkv} from './is_akv';
import {akv} from './akv';

export function map<IV, OV>(
  input: Value<IV>,
  mapCb: Function<[Value<IV>], Value<OV>>
): Value<OV>;
export function map<K, IV, OV>(
  input: KeyValuable<K, IV>,
  mapCb: Function<[KeyValuable<K, IV>], KeyValuable<K, OV>>
): KeyValuable<K, OV>;
export function map<K, IV, OV>(
  input: ArrayKeyValuable<K, IV>,
  mapCb: Function<[ArrayKeyValuable<K, IV>], ArrayKeyValuable<K, OV>>
): ArrayKeyValuable<K, OV>;
export function map<K, IV, OV>(
  value: Valuable<K, IV>,
  mapCb: Function<[Valuable<K, IV>], Valuable<K, OV>>
): Valuable<K, OV>;
export function map<K, IV, OV>(
  value: Valuable<K, IV>,
  mapCb: Function<[Valuable<K, IV>], Valuable<K, OV>>
): Valuable<K, OV> {
  if (isKv(value)) {
    const mapped = mapCb(value);
    mapped[1] = map(mapped[1], mapCb);
    return mapped;
  } else if (isAkv(value)) {
    const mapped = mapCb(value);
    if (isAkv(mapped)) {
      const mappedTwice = mapped.map((child) => map(child as any, mapCb) as KeyValuable<K, OV>);
      return akv(...mappedTwice);
    }
    return mapped;
  } else {
    return mapCb(value);
  }
}


