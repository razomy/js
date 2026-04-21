import * as kv from '@razomy/kv';

// export function k<T>(key: T, value: T): KeyValue<T, T>;
export function k<T>(key: T, value: T): [T, T];
// export function k<KT, VT>(key: KT, value: VT): KeyValue<KT, VT>;
export function k<KT, VT>(key: KT, value: VT): [KT, VT];
export function k<KT, VT>(key: kv.Key<KT>, value: kv.Valuable<KT, VT>): kv.KeyValue<KT, VT> {
  return new kv.Kv(key, value) as kv.KeyValue<KT, VT>;
}
