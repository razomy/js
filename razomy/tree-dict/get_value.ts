import { get } from './get';
import * as exceptions from '@razomy/exceptions';
import * as treeDict from '@razomy/tree-dict';

export function getValue<T extends treeDict.WithChildrenDict<T>>(value: T, path: string[], offset: number) {
  for (let key in value.children) {
    if (key !== path[offset]) {
      continue;
    }

    return get(value.children[key], path, offset + 1);
  }

  throw new exceptions.ArgumentException('Node not found path.invalid arguments', { value, path, offset });
}
