import is_keys_in_dict from "razomy.dict/is_keys_in_dict";
import { Dict } from "razomy.dict/dict";
import { is_object } from "razomy.object/object";

export function get_any_all(obj: Dict<any>, keys: string[]) {
    let res: string[] = [];
    if (is_keys_in_dict(obj, keys)) {
    res.push('');
    }

    if (is_object(obj)) {
    let result: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const children = get_any_all(value, keys);
        const with_key = children.map(ckey => `${key}:` + ckey);
        result = result.concat(with_key);
      }
    }
    res = res.concat(result);

    }

    if (Array.isArray(obj)) {
    let result: string[] = [];
    (obj as object[]).forEach((value, index) => {
      const children = get_any_all(value as any, keys);
      const with_key = children.map(ckey => `${index}` + ckey);
      result = result.concat(with_key);
    });
    res = res.concat(result);
    }

    return res;
}
