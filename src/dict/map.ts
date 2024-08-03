import {Dict} from "razomy.js/dict/dict";

export function map<I, O>(obj: Dict<I>, cb: (t: I) => O): Dict<O> {
  const entities = Object.entries(obj);
  const new_entities = entities.map(([k, v]) => [k, cb(v)]);
  return Object.fromEntries(new_entities);
}

export function map_to_array<I, O>(obj: Dict<I>, cb: (k: string, t: I) => O): O[] {
  const entities = Object.entries(obj);
  const new_entities = entities.map(([k, v]) => cb(k, v));
  return new_entities;
}
