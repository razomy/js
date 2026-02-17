import {ArgumentException} from '@razomy/exceptions';
import {WithChildrenDict} from '@razomy/tree-dict';
import {get} from './get';

export function getValue<T extends WithChildrenDict<T>>(value: T, path: string[], offset: number) {
  for (let key in value.children) {
    if (key !== path[offset]) {
      continue;
    }

    return get(value.children[key], path, offset + 1)
  }

  throw new ArgumentException('Node not found path.invalid arguments', {value, path, offset})
}
