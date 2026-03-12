import { Vrd, type VrdOrValue } from './vrd';
import * as string from '@razomy/string';
import * as kv from '@razomy/kv';

export function vrlToVrd(dict: kv.Kv<string, string> | string): VrdOrValue<string> {
  if (string.isString(dict)) {
    return dict;
  }

  const res = new Vrd<string>();
  for (const [key, v] of dict as kv.Kv<string, string>) {
    res[key] = vrlToVrd(v);
  }
  return res;
}
