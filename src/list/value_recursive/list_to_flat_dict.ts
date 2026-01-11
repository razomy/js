import {ValueListItemValue, ValueRecursiveList} from "razomy/list/value_recursive/value";
import {Dict} from "razomy/dict/dict";
import {is_string} from "razomy/string/is_string";
import {assign} from "razomy/key/assign";

export function value_or_list_to_flat_dict(
  dict: {},
  input: ValueListItemValue<string>,
  parent: string,
  separator: string
): Dict<string> {
  if (is_string(input)) {
    dict[parent] = input;
  } else {
    for (let inputKey of input) {
      value_or_list_to_flat_dict(dict, inputKey[1], parent + assign + inputKey[0], separator);
    }
  }
  return dict;
}

export function list_to_flat_dict(
  dict: {},
  input: ValueRecursiveList<string>,
  separator: string
): Dict<string> {
  for (let inputKey of input) {
    value_or_list_to_flat_dict(dict, inputKey[1], inputKey[0], separator);
  }
  return dict;
}