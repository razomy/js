import {Vrd, VrdOrValue} from "razomy/vrd/vrd";
import {RecursiveDict} from "razomy/recursive_dict/recursive";

export function rd_to_vrd(dict: RecursiveDict, is_value: (t: RecursiveDict) => boolean): VrdOrValue<string> {
  if (is_value(dict)) {
    return dict;
  }
  const v = new Vrd<string>();
  for (const dictKey in (dict as object)) {
    v[dictKey] = rd_to_vrd(dict[dictKey], is_value);
  }
  return v;
}
