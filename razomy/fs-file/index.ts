// Imports
import { appendSync } from './append_sync';
import { delete_ } from './delete_';
import { deleteSync } from './delete_sync';
import { FileGate } from './file_gate';
import { get } from './get';
import { getJson } from './get_json';
import { getSync } from './get_sync';
import { isEmpty } from './is_empty';
import { isExist } from './is_exist';
import { set } from './set';
import { setJson } from './set_json';
import { setSync } from './set_sync';
import { tryGetJson } from './try_get_json';
import { tryGetSync } from './try_get_sync';
import { trySet } from './try_set';

// Named exports
export {
  FileGate,
  appendSync,
  deleteSync,
  delete_,
  get,
  getJson,
  getSync,
  isEmpty,
  isExist,
  set,
  setJson,
  setSync,
  tryGetJson,
  tryGetSync,
  trySet
};

// Default export
const fsFile = {
  appendSync,
  delete_,
  deleteSync,
  FileGate,
  get,
  getJson,
  getSync,
  isEmpty,
  isExist,
  set,
  setJson,
  setSync,
  tryGetJson,
  tryGetSync,
  trySet,
};

export default fsFile;
