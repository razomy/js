import _ from "lodash";

function keys_in_dict<T>(object: T): (keyof T)[] {
  return _.keys(object) as (keyof T)[];
}

export default keys_in_dict;
