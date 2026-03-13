import { valueOrListToFlatDict } from './value_or_list_to_flat_dict';
import * as dict from '@razomy/dict';

export function listToFlatDict(dict: {}, input: [string, any], separator: string): dict.Dict<string> {
  for (const inputKey of input) {
    valueOrListToFlatDict(dict, inputKey[1], inputKey[0], separator);
  }
  return dict;
}
