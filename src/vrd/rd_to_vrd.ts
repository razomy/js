import {Vrd, VrdOrValue} from "razomy.vrd/vrd";
import {RecursiveDict} from "razomy.dict/recursive/recursive";

export function rd_to_vrd(dict: RecursiveDict, is_value: (t: RecursiveDict) => boolean): VrdOrValue<string> {
  if (is_value(dict)) {
    return dict;
  }
  const v = new Vrd<string>();
  for (const dict_key in (dict as object)) {
    v[dict_key] = rd_to_vrd(dict[dict_key], is_value);
  }
  return v;
}

export default rd_to_vrd;
