import {is_value_recursion, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";

export function value_recursive_to_absolute_path<T>(
  input: ValueRecursiveDictOrValue<T>,
  absolute_path: string,
  separator: string): ValueRecursiveDictOrValue<T> {
  if (is_value_recursion(input)) {
    for (let inputKey in input) {
      const value = input[inputKey];
      delete input[inputKey];
      const newPrefix = absolute_path
        ? absolute_path + separator + inputKey 
        : inputKey;
      input[newPrefix] = value_recursive_to_absolute_path(value, newPrefix, separator)
    }
    return input;
  } else {
    return input;
  }
}
