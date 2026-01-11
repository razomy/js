import {is_vrd, VrdOrValue} from "razomy/vrd/vrd";

export function vrd_to_absolute_path<T>(
  input: VrdOrValue<T>,
  absolute_path: string,
  separator: string): VrdOrValue<T> {
  if (is_vrd(input)) {
    for (let inputKey in input) {
      const value = input[inputKey];
      delete input[inputKey];
      const newPrefix = absolute_path
        ? absolute_path + separator + inputKey 
        : inputKey;
      input[newPrefix] = vrd_to_absolute_path(value, newPrefix, separator)
    }
    return input;
  } else {
    return input;
  }
}
