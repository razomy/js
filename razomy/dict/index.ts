// Imports
import { ASSIGN, BREAK, SEPERATE } from './assign';
import { create } from './create';
import { filter } from './filter';
import { firstKey } from './first_key';
import { get } from './get';
import { getKeys } from './get_keys';
import { isEqual } from './is_equal';
import { isKeys } from './is_keys';
import { isPlainObject } from './is_plain_object';
import { iterate } from './iterate';
import { map } from './map';
import { mapToArray } from './map_to_array';
import { merge } from './merge';
import type { Prettify, UnionToIntersection } from './merge';
import { take } from './take';
import type { SomeOf } from './take';
import { toString_ } from './to_string';

// Named exports
export {
  ASSIGN,
  BREAK,
  SEPERATE,
  create,
  filter,
  firstKey,
  get,
  getKeys,
  isEqual,
  isKeys,
  isPlainObject,
  iterate,
  map,
  mapToArray,
  merge,
  take,
  toString_
};
export type {
  Prettify,
  SomeOf,
  UnionToIntersection
};

// Default export
const dict = {
  ASSIGN,
  BREAK,
  SEPERATE,
  create,
  filter,
  firstKey,
  get,
  getKeys,
  isEqual,
  isKeys,
  isPlainObject,
  iterate,
  map,
  mapToArray,
  merge,
  take,
  toString_,
};


export default dict;
