import { Akv } from './akv';
import * as kv from "@razomy/kv";

export function isAkv<K, V>(obj: kv.ArrayKeyValuable<K, V> | unknown): obj is kv.ArrayKeyValuable<K, V> {
  return obj instanceof Akv;
}
