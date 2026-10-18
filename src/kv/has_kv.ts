import * as abstractions from '@razomy/abstractions';

export interface HasKv<K, V> {
  kv: abstractions.structure.KvaOrValue<K, V>;
}

