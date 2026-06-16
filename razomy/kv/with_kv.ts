import * as abstracts from "@razomy/abstracts";

export interface HasKv<K, V> {
  kv: abstracts.structures.KvaOrValue<K, V>;
}
