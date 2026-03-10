import type { Json } from './json';
import { isArray } from '@razomy/array';
import { isObject } from '@razomy/object';

export function sort<T extends Json>(object: T): T {
  if (object === undefined || object === null) {
    return object;
  }
  if (isArray(object)) {
    return [...object.map((i) => sort(i))] as T;
  }

  if (isObject(object)) {
    var keys = Object.keys(object);
    keys.sort();
    var newObject = {};
    for (var i = 0; i < keys.length; i++) {
      newObject[keys[i]] = sort(object[keys[i]]);
    }
    return newObject as T;
  }

  return object;
}
