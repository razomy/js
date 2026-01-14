import {Key, KeyValuable, Kv, Valuable} from './kv';

// export default function k<T>(key: T, value: T): KeyValuable<T, T>;
export default function k<T>(key: T, value: T): [T, T];
// export default function k<KT, VT>(key: KT, value: VT): KeyValuable<KT, VT>;
export default function k<KT, VT>(key: KT, value: VT): [KT, VT];
export default function k<KT, VT>(key: Key<KT>, value: Valuable<KT, VT>): KeyValuable<KT, VT> {
    return new Kv(key, value) as KeyValuable<KT, VT>;
}
