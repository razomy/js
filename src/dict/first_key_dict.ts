import {Dict} from 'razomy.dict/dict';
import {ArgumentException} from 'razomy.exceptions/argument_exception';
export default function first_key_dict<T>(obj: Dict<T>): string {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return key;
    }
  }
  throw new ArgumentException('no keys in object', obj as {});
}


