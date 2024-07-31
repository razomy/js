import {DictRecursive, DictRecursiveValue} from 'razomy.js/dict/recursive/recursive';
import {ArgumentException} from 'razomy.js/exceptions/argument_exception';

export function getFirstKey(obj: Record<string, any>): string | undefined {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return key;
    }
  }
  return undefined;
}

export function getByPath<T>(value: DictRecursiveValue<T>, path: string[], offset: number = 0): DictRecursiveValue<T> {
  if (offset >= path.length) {
    return value;
  }

  for (let key in value!) {
    if (key !== path[offset]) {
      continue;
    }
    offset += 1;

    return getByPath(value[key], path, offset)
  }

  throw new ArgumentException('invalid arguments', {value, path, offset})
}

export function getItemByStringPath<T>(value: DictRecursive<T>, path: string) {
  if (path === '') {
    return value;
  }
  return getByPath(value, path.split(':'), 0);
}
