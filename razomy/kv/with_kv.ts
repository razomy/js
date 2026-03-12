import * as kv from "@razomy/kv";

export interface WithKv<K, V> {
  kv: kv.Valuable<K, V>;
}
