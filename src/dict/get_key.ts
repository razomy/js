import {Dict} from "razomy.js/dict/dict";
import {ArgumentException} from "razomy.js/exceptions/argument_exception";

export function getFirstKey<T>(obj: Dict<T>): string {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return key;
    }
  }
  throw new ArgumentException('no keys in object', obj);
}
