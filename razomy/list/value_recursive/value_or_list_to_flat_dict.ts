import {ValueListItemValue} from './get_value';
import {Dict} from 'razomy.dict';
import {assign} from 'razomy.key';
import {isString} from 'razomy.string';

export function valueOrListToFlatDict(
  dict: {},
  input: ValueListItemValue<string>,
  parent: string,
  separator: string
): Dict<string> {
  if (isString(input)) {
    dict[parent] = input;
  } else {
    for (let inputKey of input) {
      valueOrListToFlatDict(dict, inputKey[1], parent + assign + inputKey[0], separator);
    }
  }
  return dict;
}