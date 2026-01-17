import {Dict} from 'razomy.dict/dict';

export function mapDictToArray<I, O>(obj: Dict<I>, cb: (k: string, t: I) => O): O[] {
  const entities = Object.entries(obj);
  const newEntities = entities.map(([k, v]) => cb(k, v));
  return newEntities;
}


