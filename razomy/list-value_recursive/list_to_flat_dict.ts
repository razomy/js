import type {ValueRecursiveList} from '@razomy/list-value_recursive';
import type {Dict} from '@razomy/dict';
import {valueOrListToFlatDict} from './value_or_list_to_flat_dict';

export function listToFlatDict(
  dict: {},
  input: ValueRecursiveList<string>,
  separator: string
): Dict<string> {
  for (let inputKey of input) {
    valueOrListToFlatDict(dict, inputKey[1], inputKey[0], separator);
  }
  return dict;
}


