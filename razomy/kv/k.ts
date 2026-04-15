import * as kv from "@razomy/kv";

// export function k<T>(key: T, value: T): KeyValuable<T, T>;
export function k<T>(key: T, value: T): [T, T];
// export function k<KT, VT>(key: KT, value: VT): KeyValuable<KT, VT>;
export function k<KT, VT>(key: KT, value: VT): [KT, VT];
export function k<KT, VT>(key: kv.Key<KT>, value: kv.Valuable<KT, VT>): kv.KeyValuable<KT, VT> {
  return new kv.Kv(key, value) as kv.KeyValuable<KT, VT>;
}
