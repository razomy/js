import * as abstractions from '@razomy/abstractions';

export interface HasKv<K, V> {
  kv: abstractions.structures.KvaOrValue<K, V>;
}

