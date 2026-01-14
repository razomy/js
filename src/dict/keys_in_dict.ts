function keys_in_dict<T>(object: T): (keyof T)[] {
  return Object.keys(object as any) as any as (keyof T)[];
}

export default keys_in_dict;
