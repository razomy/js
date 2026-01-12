import { forOwn, isPlainObject } from "lodash";

type Join<K, P> = K extends string
  ? P extends string
    ? `${K}${"" extends P ? "" : "."}${P}` // If P is empty, don't add dot
    : never
  : never;

type PathsValue<T, PrevK extends string | number | symbol> = T extends object
  ? {
      // Iterate over object keys
      [K in keyof T]-?: PathsValue<T[K], Join<PrevK, K>>; // Recurse for nested objects, otherwise create a leaf path-value object // -? makes keys non-optional for the iteration
    }[keyof T] // This produces a union of all path-value objects
  : { [K in PrevK]: T }; // Leaf node: T is not an object

export type FlattenedAndConverted<T extends object> = {
  [K in keyof T]-?: PathsValue<T[K], K>;
}[keyof T];

function flatten_dict<T extends object = object>(
  obj: T,
  parentKey = "",
  result = {} as any,
): FlattenedAndConverted<T> {
  forOwn(obj, (value, key) => {
    const new_key = parentKey && key ? `${parentKey}.${key}` : parentKey || key;

    if (isPlainObject(value)) {
      flatten_dict(value as any, new_key, result);
    } else {
      result[new_key] = value;
    }
  });
  return result as FlattenedAndConverted<T>;
}

export default flatten_dict;
