import {Dict} from 'razomy.dict/dict';

function map_dict_to_array<I, O>(obj: Dict<I>, cb: (k: string, t: I) => O): O[] {
  const entities = Object.entries(obj);
  const new_entities = entities.map(([k, v]) => cb(k, v));
  return new_entities;
}

export default map_dict_to_array;
