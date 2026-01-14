import {ValueListItemValue} from './value';
import {Dict} from 'razomy.dict';
import { assign } from 'razomy.key';
import {is_string} from 'razomy.string';

export default function value_or_list_to_flat_dict(
  dict: {},
  input: ValueListItemValue<string>,
  parent: string,
  separator: string
): Dict<string> {
  if (is_string(input)) {
    dict[parent] = input;
  } else {
    for (let input_key of input) {
      value_or_list_to_flat_dict(dict, input_key[1], parent + assign + input_key[0], separator);
    }
  }
  return dict;
}