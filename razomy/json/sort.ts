import type { Json } from './json';
import * as array from '@razomy/array';
import * as object_ from '@razomy/object';

export function sort<T extends Json>(object__: T): T {
  if (object__ === undefined || object__ === null) {
    return object__;
  }
  if (array.isArray(object__)) {
    return [...object__.map((i) => sort(i))] as T;
  }

  if (object_.isObject(object__)) {
    var keys = Object.keys(object__);
    keys.sort();
    var newObject = {};
    for (var i = 0; i < keys.length; i++) {
      newObject[keys[i]] = sort(object__[keys[i]]);
    }
    return newObject as T;
  }

  return object__;
}
