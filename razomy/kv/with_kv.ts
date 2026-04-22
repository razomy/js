import * as abstractsStructures from "@razomy/abstracts/structures";

export interface WithKv<K, V> {
  kv: abstractsStructures.KvaOrValue<K, V>;
}
