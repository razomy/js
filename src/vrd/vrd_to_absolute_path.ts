import {VrdOrValue} from 'razomy.vrd/vrd';
import is_vrd from './is_vrd';
export default function vrd_to_absolute_path<T>(
  input: VrdOrValue<T>,
  absolute_path: string,
  separator: string): VrdOrValue<T> {
  if (is_vrd(input)) {
    for (let input_key in input) {
      const value = input[input_key];
      delete input[input_key];
      const new_prefix = absolute_path
        ? absolute_path + separator + input_key 
        : input_key;
      input[new_prefix] = vrd_to_absolute_path(value, new_prefix, separator)
    }
    return input;
  } else {
    return input;
  }
}


