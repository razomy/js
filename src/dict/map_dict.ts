import {Dict} from 'razomy.dict/dict';

export default function map_dict<I, O>(obj: Dict<I>, cb: (t: I) => O): Dict<O> {
  const entities = Object.entries(obj);
  const new_entities = entities.map(([k, v]) => [k, cb(v)]);
  return Object.fromEntries(new_entities);
}


