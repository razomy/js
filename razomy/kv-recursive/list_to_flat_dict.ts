import * as dict from '@razomy/dict';
import * as kvRecursive from "@razomy/kv-recursive";

export function listToFlatDict(dict: {}, input: kvRecursive.RecursiveList, separator: string): dict.Dict<string> {
  for (const inputKey of input) {
    kvRecursive.valueOrListToFlatDict(dict, inputKey[1], inputKey[0], separator);
  }
  return dict;
}
