import {ArgumentException} from "razomy.js/exceptions/argument_exception";

export type Value<T> = T

export interface WithValue<T> {
  value: Value<T>
}

export function is_with_value<T extends WithValue<T>>(node: T): node is T {
  if ('value' in node) {
    return true;
  }
  throw new ArgumentException("data must have file name", node);
}
