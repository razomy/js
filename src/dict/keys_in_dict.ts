import _ from "lodash";

export function keys_in_dict<T>(object: T): (keyof T)[] {
  return _.keys(object) as (keyof T)[];
}
