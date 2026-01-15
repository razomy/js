export function keys_in_dict<T>(object: T): (keyof T)[] {
  return Object.keys(object as any) as any as (keyof T)[];
}


