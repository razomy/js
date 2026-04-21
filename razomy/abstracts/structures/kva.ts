export type Value<T> = T;
export type Key<T> = T;

export type KeyValuable<KT, VT> = [Key<KT>, Valuable<KT, VT>];
export type ArrayKeyValuable<KT, VT> = KeyValuable<KT, VT>[];

export type ArrayOrKeyValuable<KT, VT> = KeyValuable<KT, VT> | ArrayKeyValuable<KT, VT>;

export type Valuable<KT, VT> = Value<VT> | ArrayOrKeyValuable<KT, VT>;
