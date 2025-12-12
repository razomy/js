import _ from "lodash";

export function keys<T>(object: T): (keyof T)[] {
  return _.keys(object) as (keyof T)[];
}
