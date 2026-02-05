import {Dict} from '@razomy/dict';

export function mapDict<I, O>(obj: Dict<I>, cb: (t: I) => O): Dict<O> {
  const entities = Object.entries(obj);
  const newEntities = entities.map(([k, v]) => [k, cb(v)]);
  return Object.fromEntries(newEntities);
}


