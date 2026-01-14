import {Valuable} from "razomy.kv/kv";

export interface WithKv<K, V> {
  kv: Valuable<K, V>;
}
