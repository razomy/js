import * as array from '@razomy/array';
import * as object_ from '@razomy/object';
import * as json from "@razomy/json";

export function sort<T extends json.Json>(object__: T): T {
  if (object__ === undefined || object__ === null) {
    return object__;
  }
  if (array.isArray(object__)) {
    return [...object__.map((i) => sort(i))] as T;
  }

  if (object_.isObject(object__)) {
    const keys = Object.keys(object__);
    keys.sort();
    const newObject = {};
    for (let i = 0; i < keys.length; i++) {
      newObject[keys[i]] = sort(object__[keys[i]]);
    }
    return newObject as T;
  }

  return object__;
}
