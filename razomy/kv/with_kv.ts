import type {Valuable} from '@razomy/kv';

export interface WithKv<K, V> {
  kv: Valuable<K, V>;
}
