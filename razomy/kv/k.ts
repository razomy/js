import {Key, KeyValuable, Kv, Valuable} from './kv';

// export function k<T>(key: T, value: T): KeyValuable<T, T>;
export function k<T>(key: T, value: T): [T, T];
// export function k<KT, VT>(key: KT, value: VT): KeyValuable<KT, VT>;
export function k<KT, VT>(key: KT, value: VT): [KT, VT];
export function k<KT, VT>(key: Key<KT>, value: Valuable<KT, VT>): KeyValuable<KT, VT> {
  return new Kv(key, value) as KeyValuable<KT, VT>;
}
