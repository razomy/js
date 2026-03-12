import type { Json } from './json';
import * as array from "@razomy/array";
import * as object_ from "@razomy/object";

export function sort<T extends Json>(object: T): T {
  if (object === undefined || object === null) {
    return object;
  }
  if (array.isArray(object)) {
    return [...object.map((i) => sort(i))] as T;
  }

  if (object_.isObject(object)) {
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
