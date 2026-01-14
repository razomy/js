import {for_own} from './for_own';

export function is_plain_object(value) {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check internal [[Class]] tag
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  // If the object has no prototype (e.g., Object.create(null)), it is plain.
  let proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }

  // Iterate up the prototype chain to find the top-most prototype.
  // In a plain object, the prototype must be Object.prototype.
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}

export type Join<K, P> = K extends string
  ? P extends string
    ? `${K}${"" extends P ? "" : "."}${P}` // If P is empty, don't add dot
    : never
  : never;

export type PathsValue<T, PrevK extends string | number | symbol> = T extends object
  ? {
      // Iterate over object keys
      [K in keyof T]-?: PathsValue<T[K], Join<PrevK, K>>; // Recurse for nested objects, otherwise create a leaf path-value object // -? makes keys non-optional for the iteration
    }[keyof T] // This produces a union of all path-value objects
  : { [K in PrevK]: T }; // Leaf node: T is not an object

export type FlattenedAndConverted<T extends object> = {
  [K in keyof T]-?: PathsValue<T[K], K>;
}[keyof T];

export function flatten_dict<T extends object = object>(
  obj: T,
  parentKey = "",
  result = {} as any,
): FlattenedAndConverted<T> {
  for_own(obj, (value, key) => {
    const new_key = parentKey && key ? `${parentKey}.${key}` : parentKey || key;

    if (is_plain_object(value)) {
      flatten_dict(value as any, new_key, result);
    } else {
      result[new_key] = value;
    }
  });
  return result as FlattenedAndConverted<T>;
}

export default flatten_dict;
