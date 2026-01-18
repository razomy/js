import {Vrd} from './vrd';
import {mergeVrd} from './merge_vrd';

export function mergeDict<T>(a: Vrd<T>, b: Vrd<T>, empty: T): Vrd<T> {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  const allKeys = new Set([...aKeys, ...bKeys]);
  for (let key of allKeys) {
    a[key] = mergeVrd(a[key], b[key], empty);
  }
  return a;
}