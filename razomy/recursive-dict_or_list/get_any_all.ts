import type {Dict} from '@razomy/dict';
import {isKeysInDict} from '@razomy/dict';
import {isObject} from '@razomy/object';

export function getAnyAll(obj: Dict<any>, keys: string[]) {
  let res: string[] = [];
  if (isKeysInDict(obj, keys)) {
    res.push('');
  }

  if (isObject(obj)) {
    let result: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const children = getAnyAll(value, keys);
        const withKey = children.map(ckey => `${key}:` + ckey);
        result = result.concat(withKey);
      }
    }
    res = res.concat(result);

  }

  if (Array.isArray(obj)) {
    let result: string[] = [];
    (obj as object[]).forEach((value, index) => {
      const children = getAnyAll(value as any, keys);
      const withKey = children.map(ckey => `${index}` + ckey);
      result = result.concat(withKey);
    });
    res = res.concat(result);
  }

  return res;
}
