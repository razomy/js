import {isKeys} from "razomy.js/dict/is_keys";
import {Dict} from "razomy.js/dict/dict";
import {isObject} from "razomy.js/object/object";

export function get_any(obj: Dict<any>, keys: string[]) {
  if (isKeys(obj, keys)) {
    return [''];
  }

  if (isObject(obj)) {
    let result: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const children = get_any(value, keys);
        const withKey = children.map(ckey => `${key}:` + ckey);
        result = result.concat(withKey);
      }
    }
    return result;
  }

  if (Array.isArray(obj)) {
    let result: string[] = [];
    (obj as object[]).forEach((value, index) => {
      const children = get_any(value as any, keys);
      const withKey = children.map(ckey => `${index}` + ckey);
      result = result.concat(withKey);
    });
    return result;
  }

  return [];
}

export function get_any_all(obj: Dict<any>, keys: string[]) {
  let res: string[] = [];
  if (isKeys(obj, keys)) {
    res.push('');
  }

  if (isObject(obj)) {
    let result: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const children = get_any_all(value, keys);
        const withKey = children.map(ckey => `${key}:` + ckey);
        result = result.concat(withKey);
      }
    }
    res = res.concat(result);

  }

  if (Array.isArray(obj)) {
    let result: string[] = [];
    (obj as object[]).forEach((value, index) => {
      const children = get_any_all(value as any, keys);
      const withKey = children.map(ckey => `${index}` + ckey);
      result = result.concat(withKey);
    });
    res = res.concat(result);
  }

  return res;
}
