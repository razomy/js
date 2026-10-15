import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

// export function k<T>(key: T, value: T): KeyValue<T, T>;
export function k<T>(key: T, value: T): [T, T];
// export function k<KT, VT>(key: KT, value: VT): KeyValue<KT, VT>;
export function k<KT, VT>(key: KT, value: VT): [KT, VT];
export function k<KT, VT>(key: abstractions.structures.Key<KT>, value: abstractions.structures.KvaOrValue<KT, VT>): abstractions.structures.KeyValue<KT, VT> {
  return new kv.Kv(key, value) as abstractions.structures.KeyValue<KT, VT>;
}
