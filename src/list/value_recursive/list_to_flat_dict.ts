import {ValueListItemValue, ValueRecursiveList} from "razomy.js/list/value_recursive/value";
import {Dict} from "razomy.js/dict/dict";
import {isString} from "razomy.js/string/string";

export function value_or_list_to_flat_dict(
  dict: {},
  input: ValueListItemValue<string>,
  parent: string,
  separator: string
): Dict<string> {
  if (isString(input)) {
    dict[parent] = input;
  } else {
    for (let inputKey of input) {
      value_or_list_to_flat_dict(dict, inputKey[1], parent + ':' + inputKey[0], separator);
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