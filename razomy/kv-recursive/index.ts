// Imports
import { get } from './get';
import { getItemByPath } from './get_item_by_path';
import { getItemByPathFromValue } from './get_item_by_path_from_value';
import { getKey } from './get_key';
import type { ListItem, ListKey, RecursiveList } from './get_key';
import { getValue } from './get_value';
import { listToFlatDict } from './list_to_flat_dict';
import { renameToSnakeCaseRecursive } from './rename_to_snake_case_recursive';
import { valueOrListToFlatDict } from './value_or_list_to_flat_dict';

// Named exports
export {
  get,
  getItemByPath,
  getItemByPathFromValue,
  getKey,
  getValue,
  listToFlatDict,
  renameToSnakeCaseRecursive,
  valueOrListToFlatDict
};
export type {
  ListItem,
  ListKey,
  RecursiveList
};

// Default export
const kvRecursive = {
  get,
  getItemByPath,
  getItemByPathFromValue,
  getKey,
  getValue,
  listToFlatDict,
  renameToSnakeCaseRecursive,
  valueOrListToFlatDict,
};


export default kvRecursive;
