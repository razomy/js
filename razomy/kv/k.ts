import * as kv from '@razomy/kv';
import * as abstracts from '@razomy/abstracts';

// export function k<T>(key: T, value: T): KeyValue<T, T>;
export function k<T>(key: T, value: T): [T, T];
// export function k<KT, VT>(key: KT, value: VT): KeyValue<KT, VT>;
export function k<KT, VT>(key: KT, value: VT): [KT, VT];
export function k<KT, VT>(key: abstracts.structures.Key<KT>, value: abstracts.structures.KvaOrValue<KT, VT>): abstracts.structures.KeyValue<KT, VT> {
  return new kv.Kv(key, value) as abstracts.structures.KeyValue<KT, VT>;
}
