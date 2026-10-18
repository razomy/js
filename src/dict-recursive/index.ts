// Imports
import { deleteByPathMut } from './delete_by_path_mut';
import { flat } from './flat';
import type { FlattenedAndConverted, Join, PathsValue } from './flat';
import { getAny } from './get_any';
import { getAnyAll } from './get_any_all';
import { getByPath } from './get_by_path';
import { mergeMut } from './merge_mut';
import { moveByPathMut } from './move_by_path_mut';
import { setByPathMut } from './set_by_path_mut';

// Named exports
export {
  deleteByPathMut,
  flat,
  getAny,
  getAnyAll,
  getByPath,
  mergeMut,
  moveByPathMut,
  setByPathMut
};
export type {
  FlattenedAndConverted,
  Join,
  PathsValue
};

// Default export
const dictRecursive = {
  deleteByPathMut,
  flat,
  getAny,
  getAnyAll,
  getByPath,
  mergeMut,
  moveByPathMut,
  setByPathMut,
};


export default dictRecursive;
