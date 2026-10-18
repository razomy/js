import * as vrd from '@razomy/vrd';

export function mergeDict<T>(a: vrd.Vrd<T>, b: vrd.Vrd<T>, empty: T): vrd.Vrd<T> {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  const allKeys = new Set([...aKeys, ...bKeys]);
  for (const key of allKeys) {
    a[key] = vrd.mergeVrd(a[key], b[key], empty);
  }
  return a;
}
