import * as abstracts from "@razomy/abstracts";

export interface WithKv<K, V> {
  kv: abstracts.structures.KvaOrValue<K, V>;
}
