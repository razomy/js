import { Vrd, type VrdOrValue } from './vrd';
import * as string from '@razomy/string';
import * as kv from '@razomy/kv';
import * as kvRecursive from "@razomy/kv-recursive";

export function vrlToVrd(dict: kvRecursive.RecursiveList | string): VrdOrValue<string> {
  if (string.isString(dict)) {
    return dict;
  }

  const res = new Vrd<string>();
  for (const [key, v] of dict as kv.Kv<string, string>) {
    res[key] = vrlToVrd(v);
  }
  return res;
}
