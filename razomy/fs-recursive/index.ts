// Imports
import { cliCopy } from './cli_copy';
import { copy } from './copy';
import { delete_ } from './delete_';
import { get } from './get';
import { getAllFlat } from './get_all_flat';
import { SHARED_NODE, iterate } from './iterate';
import type { IterateNode } from './iterate';
import { move } from './move';
import { toDict } from './to_dict';

// Named exports
export {
  SHARED_NODE,
  cliCopy,
  copy,
  delete_,
  get,
  getAllFlat,
  iterate,
  move,
  toDict
};
export type {
  IterateNode
};

// Default export
const fsRecursive = {
  cliCopy,
  copy,
  delete_,
  get,
  getAllFlat,
  SHARED_NODE,
  iterate,
  move,
  toDict,
};


export default fsRecursive;
