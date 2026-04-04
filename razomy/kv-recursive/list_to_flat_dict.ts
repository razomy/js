import {valueOrListToFlatDict} from './value_or_list_to_flat_dict';
import * as dict from '@razomy/dict';
import type {RecursiveList} from "./get_key";

export function listToFlatDict(dict: {}, input: RecursiveList, separator: string): dict.Dict<string> {
  for (const inputKey of input) {
    valueOrListToFlatDict(dict, inputKey[1], inputKey[0], separator);
  }
  return dict;
}
