import type { Dict } from '@razomy/dict';

export function map<I, O>(obj: Dict<I>, cb: (t: I, k: string) => O): Dict<O> {
  const entities = Object.entries(obj);
  const newEntities = entities.map(([k, v]) => [k, cb(v, k)]);
  return Object.fromEntries(newEntities);
}
