import type {Dict} from '@razomy/dict';
import {ArgumentException} from '@razomy/exceptions';

export function firstKeyDict<T>(obj: Dict<T>): string {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return key;
    }
  }
  throw new ArgumentException('no keys in object', obj as {});
}


