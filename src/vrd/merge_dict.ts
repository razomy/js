import {Vrd} from 'razomy/vrd/vrd';
import merge_vrd from 'razomy/vrd/merge_vrd';

export default function merge_dict<T>(a: Vrd<T>, b: Vrd<T>, empty: T): Vrd<T> {
  const a_keys = Object.keys(a);
  const b_keys = Object.keys(b);
  const all_keys = new Set([...a_keys, ...b_keys]);
  for (let key of all_keys) {
    a[key] = merge_vrd(a[key], b[key], empty);
  }
  return a;
}