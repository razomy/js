import {reserved_names_js} from '../../languages/programming/fs';
import {to_snake_case} from 'razomy.string';

export function to_safe_name(name: string) {
  let new_name = to_snake_case(name);
  if (reserved_names_js[new_name] || new_name == '') {
    new_name = new_name + '_';
  }
  return new_name;
}