// Imports
import { differencesDict } from './differences_dict';
import { differencesVrd } from './differences_vrd';
import type { P, ReplaceDifference } from './differences_vrd';
import { filterVrd } from './filter_vrd';
import { flatten } from './flatten';
import { getByPath } from './get_by_path';
import { getMatchesKey } from './get_matches_key';
import { getParents } from './get_parents';
import { getVrd } from './get_vrd';
import { isVrd } from './is_vrd';
import { iterateBreak } from './iterate_break';
import { iterateSkip } from './iterate_skip';
import { IterateBreaks, iterateVrd } from './iterate_vrd';
import type { Iterate } from './iterate_vrd';
import { kvToVrd } from './kv_to_vrd';
import { mapVrd } from './map_vrd';
import { mergeDict } from './merge_dict';
import { mergeVrd } from './merge_vrd';
import { merges } from './merges';
import { orderVrd } from './order_vrd';
import { pathToVrd } from './path_to_vrd';
import { pvaToVrd } from './pva_to_vrd';
import { rdToVrd } from './rd_to_vrd';
import { setVrd } from './set_vrd';
import { test } from './test';
import { unflatten } from './unflatten';
import { Vrd, create } from './vrd';
import type { VrdOrValue } from './vrd';
import { vrdToAbsolutePath } from './vrd_to_absolute_path';
import { vrdToPath } from './vrd_to_path';
import { vrdToPva } from './vrd_to_pva';
import { vrlToVrd } from './vrl_to_vrd';

// Named exports
export {
  IterateBreaks,
  Vrd,
  create,
  differencesDict,
  differencesVrd,
  filterVrd,
  flatten,
  getByPath,
  getMatchesKey,
  getParents,
  getVrd,
  isVrd,
  iterateBreak,
  iterateSkip,
  iterateVrd,
  kvToVrd,
  mapVrd,
  mergeDict,
  mergeVrd,
  merges,
  orderVrd,
  pathToVrd,
  pvaToVrd,
  rdToVrd,
  setVrd,
  test,
  unflatten,
  vrdToAbsolutePath,
  vrdToPath,
  vrdToPva,
  vrlToVrd
};
export type {
  Iterate,
  P,
  ReplaceDifference,
  VrdOrValue
};

// Default export
const vrd = {
  differencesDict,
  differencesVrd,
  filterVrd,
  flatten,
  getByPath,
  getMatchesKey,
  getParents,
  getVrd,
  isVrd,
  iterateBreak,
  iterateSkip,
  IterateBreaks,
  iterateVrd,
  kvToVrd,
  mapVrd,
  mergeDict,
  mergeVrd,
  merges,
  orderVrd,
  pathToVrd,
  pvaToVrd,
  rdToVrd,
  setVrd,
  test,
  unflatten,
  Vrd,
  create,
  vrdToAbsolutePath,
  vrdToPath,
  vrdToPva,
  vrlToVrd,
};


export default vrd;
