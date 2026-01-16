import {ValueRecursiveList} from 'razomy.list/value_recursive/get_value';
import {Dict} from 'razomy.dict/dict';
import {value_or_list_to_flat_dict} from './value_or_list_to_flat_dict';

export function list_to_flat_dict(
  dict: {},
  input: ValueRecursiveList<string>,
  separator: string
): Dict<string> {
  for (let input_key of input) {
    value_or_list_to_flat_dict(dict, input_key[1], input_key[0], separator);
  }
  return dict;
}


