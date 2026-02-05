import {isKeysInDict} from '@razomy/dict';
import {Dict} from '@razomy/dict';
import {isObject} from '@razomy/object';

export function getAny(obj: Dict<any>, keys: string[]) {
  if (isKeysInDict(obj, keys)) {
    return [''];
  }

  if (isObject(obj)) {
    let result: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const children = getAny(value, keys);
        const withKey = children.map(ckey => `${key}:` + ckey);
        result = result.concat(withKey);
      }
    }
    return result;
  }

  if (Array.isArray(obj)) {
    let result: string[] = [];
    (obj as object[]).forEach((value, index) => {
      const children = getAny(value as any, keys);
      const withKey = children.map(ckey => `${index}` + ckey);
      result = result.concat(withKey);
    });
    return result;
  }

  return [];
}
