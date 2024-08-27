import {Valuable} from "razomy.js/kv/kv";

export interface WithKv<K, V> {
  kv: Valuable<K, V>;
}
